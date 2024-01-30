import { performBaselineCorrection } from "../../api/axios";

const getPlotConfiguration = (
  configValue,
  handleDoubleClickBaseline,
  handleClickBaseline,
  xDataArray,
  pointClickedArray
) => {
  // default values of config
  let size = 1;
  let color = "#000";
  let scrollZoom = false;
  let dragMode = false;
  let doubleClickHandler = () => {};
  let clickHandler = () => {};
  if (configValue === "Zoom" || configValue === "Integration") {
    scrollZoom = true;
    dragMode = true;
  } 
  if (configValue === "Baseline") {
    doubleClickHandler = handleDoubleClickBaseline;
    clickHandler = handleClickBaseline;
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
    doubleClickHandler,
    clickHandler,
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
  setBaselineUpdated
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
};
