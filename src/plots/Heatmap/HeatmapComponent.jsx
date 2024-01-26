import React, { useState, useEffect, useCallback, memo } from "react";
import Plot from "react-plotly.js";
import { usePlotsContext } from "../../hooks/usePlotsContext";
import {
  findMinMaxValues,
  getShape,
  getPlotConfiguration,
} from "./heatmapHelpers";
import data from "../../test-data.json";

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
  } = usePlotsContext();

  const [arrayX, setArrayX] = useState([]);
  const [arrayY, setArrayY] = useState([]);
  const [arrayZ, setArrayZ] = useState([]);
  const [hoverActive, setHoverActive] = useState(true);

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

  // Hook to get data from json file
  useEffect(() => {
    const xData = data.columns;
    const yData = data.index;
    const zData = data.values;

    // update the states used for rendering
    setArrayX(xData);
    setArrayY(yData);
    setArrayZ(zData);
    setHorizontalLinePosition(yData[0]);
    setYdata(zData[0]);
    setXdata(xData);

    // calculate min and max values
    calculateMinMaxValues(zData);
  }, [calculateMinMaxValues]);

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
    </>
  );
}

export default memo(HeatmapComponent);