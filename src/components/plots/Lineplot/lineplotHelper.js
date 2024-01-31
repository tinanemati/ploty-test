import { performBaselineCorrection, areaCalculation } from "../../../api/axios";

const getPlotConfiguration = (
  configValue,
  handleDoubleClickBaseline,
  handleDeselct,
  handleClickBaseline,
  handleSelected,
  xDataArray,
  pointClickedArray
) => {
  // default values of config
  let size = 1;
  let color = "#000";
  let scrollZoom = false;
  let dragMode = false;
  let yFixed = false;
  let direction = "any";
  let doubleClickHandler = () => {};
  let selectHandler = () => {};
  let deSelectHandler = () => {};
  let clickHandler = () => {};
  if (configValue === "Zoom") {
    scrollZoom = true;
    dragMode = "zoom";
  } else if (configValue === "Integration") {
    dragMode = "select";
    yFixed = true;
    direction = "h";
  }
  if (configValue === "Baseline") {
    doubleClickHandler = handleDoubleClickBaseline;
    clickHandler = handleClickBaseline;
  } else if (configValue === "Integration") {
    deSelectHandler = handleDeselct;
    selectHandler = handleSelected;
  }

  const markerColors = xDataArray.map((_, index) =>
    pointClickedArray.includes(index) ? "#fe0000" : "#000"
  );
  const markerSizes = xDataArray.map((_, index) =>
    pointClickedArray.includes(index) ? 6 : 1
  );

  if (configValue === "Baseline") {
    size = markerSizes;
    color = markerColors;
  }

  return {
    scrollZoom,
    dragMode,
    yFixed,
    direction,
    doubleClickHandler,
    clickHandler,
    deSelectHandler,
    selectHandler,
    size,
    color,
  };
};

// function that will return yValues
const getYvalues = (configValue, yDataRaw, ydataUpdated) => {
  if (!ydataUpdated) {
    return yDataRaw;
  }
  if (configValue === "Zoom" || configValue === "Integration") {
    return ydataUpdated;
  } else {
    return yDataRaw;
  }
};
// Helper function that will make the call to backend and return data
const performBaselineCorrectionHelper = async (
  start,
  end,
  xData,
  yData,
  updateBaseline,
  setXdataUpdated,
  setYdataUpdated,
  setBaselineUpdated,
  setCalculate,
  range
) => {
  let dataToSend;
  if (start && end) {
    dataToSend = {
      xData: xData,
      yData: yData,
      baselineTimeRange: [
        {
          noise_start: start,
          noise_end: end,
        },
      ],
    };
  } else {
    dataToSend = {
      xData: xData,
      yData: yData,
    };
  }

  const result = await performBaselineCorrection(dataToSend);
  if (result.success) {
    // update baseline and values
    updateBaseline(result.baseline);
    setXdataUpdated(result.timeValues);
    setYdataUpdated(result.yValues);
    //  identify that baseline calculated
    setBaselineUpdated(true);
    // identify if we have to calculate area again
    if (range.length > 0) {
      setCalculate(true);
    }
  } else {
    console.error(result.message);
  }
};

// Helper function that will make the call to backend and return data
const performAreaHelper = async (
  range,
  xData,
  yData,
  updateArea,
  updateCalculate,
) => {
  let dataToSend = {
    range: range,
    xData: xData,
    yData: yData,
  };

  const result = await areaCalculation(dataToSend);
  if (result.success) {
    // update area 
    updateArea(result.area);
    console.log("this is area:", result.area)
    updateCalculate(false);
  } else {
    console.error(result.message);
  }
};
// helper function to get the shape of baseline
function getBaselineShape(xData, baseline, pointClicked) {
  return [
    {
      type: "line",
      xref: "x",
      x0: pointClicked.length ? xData[pointClicked[0]] : xData[0],
      x1: pointClicked.length
        ? xData[pointClicked[pointClicked.length - 1]]
        : xData[xData.length - 1],
      yref: "y",
      y0: pointClicked.length ? baseline[pointClicked[0]] : baseline[0],
      y1: pointClicked.length
        ? baseline[pointClicked[pointClicked.length - 1]]
        : baseline[baseline.length - 1],
      line: {
        dash: "dot",
        color: "#5450e4",
        width: 2,
      },
    },
  ];
}

export {
  getPlotConfiguration,
  getYvalues,
  performBaselineCorrectionHelper,
  getBaselineShape,
  performAreaHelper
};
