import { useState, useEffect, useCallback } from "react";
import createPlotlyComponent from "react-plotly.js/factory";
import usePlotsContext from "../../../hooks/usePlotsContext";
import {
  getShape,
  getPlotConfiguration,
  getDefaultBaseline,
} from "../../../utils/helpers/heatmapHelpers";
import { findMinMaxValues } from "../../../utils/helpers/appHelpers";
import PropTypes from "prop-types";
import axios from "axios";

function HeatmapComponent({
  configValue,
  zMin,
  zMax,
  setZMin,
  setZMax,
  setMinLimit,
  setMaxLimit,
}) {
  const {
    horizontalLinePosition,
    setHorizontalLinePosition,
    setYdata,
    setXdata,
    setSliceSelected,
    setBaseline,
    setYdataUpdated,
    setBaselineUpdated,
  } = usePlotsContext();

  // Declare Plot as a state variable
  const [Plot, setPlot] = useState(null);

  // Use an effect hook to import the module dynamically
  useEffect(() => {
    import("plotly.js-cartesian-dist-min").then((Plotly) => {
      const PlotComponent = createPlotlyComponent(Plotly.default || Plotly);
      setPlot(() => PlotComponent);
    });
  }, []);

  const [arrayX, setArrayX] = useState([]);
  const [arrayY, setArrayY] = useState([]);
  const [arrayZ, setArrayZ] = useState([]);
  const [hoverActive, setHoverActive] = useState(true);

  const getBaseline = useCallback(
    (xData, yData) => {
      getDefaultBaseline(
        xData,
        yData,
        setBaseline,
        setYdataUpdated,
        setBaselineUpdated
      );
    },
    [setBaseline, setYdataUpdated, setBaselineUpdated]
  );

  const calculateMinMaxValues = useCallback(
    (zData) => {
      // Calculate zmin and zmax from arrayZ data
      const { min, max } = findMinMaxValues(zData);
      setZMin(min);
      setZMax(max);
      setMinLimit(min);
      setMaxLimit(max);
    },
    [setZMin, setZMax, setMinLimit, setMaxLimit]
  );

  // Hook to get data from flask server
  useEffect(() => {
    const fetchWellData = async () => {
      const response = await axios.get("/api/well");
      const wellData = response.data.wellData;
      // update the states used for rendering
      setArrayX(wellData.columns);
      setArrayY(wellData.index);
      setArrayZ(wellData.values);
      setHorizontalLinePosition(wellData.index[0]);
      setYdata(wellData.values[0]);
      setXdata(wellData.columns);
      // calculate min and max values
      calculateMinMaxValues(wellData.values);
    };
    fetchWellData();
  }, []);

  const handleHover = (data) => {
    if (hoverActive) {
      // Get the y-axis value where the user clicked
      const clickedPointIndex = data.points[0].pointIndex[0];
      const yValue = arrayY[clickedPointIndex];
      setHorizontalLinePosition(yValue);
      setYdata(arrayZ[clickedPointIndex]);
    }
  };

  const handleClick = (data) => {
    if (hoverActive) {
      const clickedPointIndex = data.points[0].pointIndex[0];
      const yValue = arrayY[clickedPointIndex];
      setHorizontalLinePosition(yValue);
      setYdata(arrayZ[clickedPointIndex]);
      // perform deafault baseline correction
      getBaseline(arrayX, arrayZ[clickedPointIndex]);
      // Disable hover after click
      setHoverActive(false);
      // indicate that slice was slected
      setSliceSelected(true);
    }
  };

  const handleDoubleClick = () => {
    setHoverActive(true);
    setSliceSelected(false);
  };

  const handleClickZ = (data) => {
    const clickedPointZ = data.points[0].z;
    if (configValue === "Update zMin") {
      setZMin(clickedPointZ);
    } else if (configValue === "Update zMax") {
      setZMax(clickedPointZ);
    }
  };

  // Extract plot's line shape
  const lineSegments = getShape(horizontalLinePosition);

  // Extract plot's configuration
  const {
    scrollZoom,
    dragMode,
    doubleClickHandler,
    onHoverHandler,
    onClickHandler,
  } = getPlotConfiguration(
    configValue,
    handleDoubleClick,
    handleHover,
    handleClick,
    handleClickZ
  );

  return (
    <>
      {Plot && (
        <Plot
          data={[
            {
              z: arrayZ,
              x: arrayX,
              y: arrayY,
              zmax: zMax,
              zmin: zMin,
              zauto: false,
              type: "heatmap",
              colorscale: "Viridis",
              colorbar: {
                len: 0.6,
                thickness: 20,
                exponentformat: "power",
              },
              hovertemplate: `t: %{x}
              <br>m/z: %{y}
              <br>intensity: %{z}<extra></extra>`,
            },
          ]}
          layout={{
            width: 950,
            height: 470,
            title: "Total Ion Chromatogram",
            xaxis: {
              title: {
                text: "Retention Time (Minutes)",
              },
              dtick: 0.5,
            },
            yaxis: {
              autorange: "reversed",
              title: {
                text: "(m/z)",
              },
            },
            coloraxis: {
              colorbar: {
                title: {
                  text: "Intensity",
                },
              },
            },
            shapes: lineSegments,
            dragmode: dragMode,
          }}
          onHover={onHoverHandler}
          onClick={onClickHandler}
          onDoubleClick={doubleClickHandler}
          config={{ scrollZoom: scrollZoom, displayModeBar: false }}
        />
      )}
    </>
  );
}

HeatmapComponent.propTypes = {
  configValue: PropTypes.string.isRequired,
  zMin: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
  zMax: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
  setZMin: PropTypes.func.isRequired,
  setZMax: PropTypes.func.isRequired,
  setMinLimit: PropTypes.func.isRequired,
  setMaxLimit: PropTypes.func.isRequired,
};

export default HeatmapComponent;
