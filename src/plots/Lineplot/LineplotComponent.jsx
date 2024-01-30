import React, { memo, useCallback, useEffect, useState } from "react";
import createPlotlyComponent from "react-plotly.js/factory";
import Plotly from"plotly.js-cartesian-dist-min";
import { usePlotsContext } from "../../hooks/usePlotsContext";
import {
  getPlotConfiguration,
  getYvalues,
  performBaselineCorrectionHelper,
  getBaselineShape,
} from "./lineplotHelper";

Plotly.setPlotConfig({ logging: 0 })
const Plot = createPlotlyComponent(Plotly);

function LinePlotComponent({
  configValue,
  pointClicked,
  setPointClicked,
  updateBaselineTimeRange,
  setBaselineTimeRange,
  baselineTimeRange,
  xDataUpdated,
  setXdataUpdated,
}) {
  const {
    yData,
    xData,
    horizontalLinePosition,
    yDataUpdated,
    baseline,
    setBaseline,
    setBaselineUpdated,
    baselineUpdated,
    setYdataUpdated,
    sliceSelected,
  } = usePlotsContext();

  const [range, setRange] = useState([]);
  // Function to update the range at a specific index
  const updateRange = (newLeft, newRight) => {
    const updatedRanges = [...range];
    updatedRanges.push({ leftside: newLeft, rightside: newRight });
    setRange(updatedRanges);
  };
  console.log("this is range:", range)
  const handleClickBaseline = (data) => {
    const clickedPointIndex = data.points[0].pointIndex;

    setPointClicked((prevPoints) => {
      const updatedPoints = new Set(prevPoints);
      updatedPoints.has(clickedPointIndex)
        ? updatedPoints.delete(clickedPointIndex)
        : updatedPoints.add(clickedPointIndex);

      const sortedUpdatedPoints = [...updatedPoints].sort((a, b) => a - b);
      return sortedUpdatedPoints;
    });

    const xValue = xData[clickedPointIndex];
    updateBaselineTimeRange(xValue);
    setBaselineUpdated(false);
  };

  const handleDoubleClickBaseline = () => {
    setBaselineTimeRange([]);
    setPointClicked([]);
    setBaselineUpdated(false);
  };

  const handleSelected = (event) => {
    if (event.points.length) {
      console.log("I was called", event)
      const xValue0 = event.points[0].pointIndex;
      const length = event.points.length - 1
      const xValue1 = event.points[length].pointIndex;
      updateRange(xValue0, xValue1)
    }
    
   
  }
  const getBaselineCorrection = useCallback(
    (start, end) => {
      performBaselineCorrectionHelper(
        start,
        end,
        xData,
        yData,
        setBaseline,
        setXdataUpdated,
        setYdataUpdated,
        setBaselineUpdated
      );
    },
    [
      xData,
      yData,
      setBaseline,
      setYdataUpdated,
      setBaselineUpdated,
      setXdataUpdated,
    ]
  );

  //Hook that will perform baseline correction
  useEffect(() => {
    if (sliceSelected && !baselineUpdated) {
      // check if user has selected some baseline point
      if (baselineTimeRange.length >= 2) {
        const [start, end] = [
          Math.min(...baselineTimeRange),
          Math.max(...baselineTimeRange),
        ];
        getBaselineCorrection(start, end);
      } else if (baselineTimeRange.length === 0) {
        getBaselineCorrection(null, null);
      }
    }
  }, [
    baselineTimeRange.length,
    baselineUpdated,
    getBaselineCorrection,
    sliceSelected,
  ]);

  const renderLinePlot = () => {
    // Extract plot's title, label and configuration
    const {
      scrollZoom,
      hoverMode,
      clickMode,
      dragMode,
      yFixed,
      direction,
      color,
      size,
      doubleClickHandler,
      clickHandler,
    } = getPlotConfiguration(
      configValue,
      handleDoubleClickBaseline,
      handleClickBaseline,
      xData,
      pointClicked
    );

    let yDataChannel = getYvalues(configValue, yData, yDataUpdated);
    let baselineShape;

    yDataChannel = sliceSelected ? yDataChannel : yData;

    if (configValue !== "Integration" && configValue !== "Zoom") {
      if (baselineTimeRange.length === 0 && sliceSelected) {
        baselineShape = getBaselineShape(xData, baseline, pointClicked);
      } else if (
        baselineTimeRange.length >= 2 &&
        sliceSelected &&
        xDataUpdated.length > 0
      ) {
        baselineShape = getBaselineShape(xData, baseline, pointClicked);
      }
    }

    return (
      <Plot
        data={[
          {
            x: xData,
            y: yDataChannel,
            type: "scatter",
            mode: "lines+markers",
            marker: {
              size: size,
              color: color,
            },
            line: {
              color: "#000",
              width: 1,
            },
          },
        ]}
        layout={{
          width: 950,
          height: 470,
          title: "Extracted Ion Chromatogram",
          xaxis: {
            title: "Retention Time (Minutes)",
            dtick: 0.5,
          },
          yaxis: {
            title: `Ion Count (m/z=${horizontalLinePosition})`,
            zeroline: false,
            fixedrange: yFixed,
          },
          dragmode: dragMode,
          selectdirection: direction,
          clickmode: clickMode,
          hovermode: hoverMode,
          showlegend: false,
          shapes: baselineShape,
        }}
        config={{ scrollZoom: scrollZoom, displayModeBar: false }}
        onClick={clickHandler}
        onDoubleClick={doubleClickHandler}
        onSelected={handleSelected}
      />
    );
  };
  return renderLinePlot();
}

export default memo(LinePlotComponent);
