import { performBaselineCorrection } from "../../services/api/api";

const getShape = (sliceSelectedIndex) => {
  return [
    {
      type: "line",
      xref: "paper",
      x0: 0,
      x1: 1,
      yref: "y",
      y0: sliceSelectedIndex,
      y1: sliceSelectedIndex,
      line: {
        dash: "dash",
        color: "#e5e9ec",
        width: 2,
      },
    },
  ];
};

const getPlotConfiguration = (
  configValue,
  handleDoubleClick,
  handleHover,
  handleClick,
  handleClickZ
) => {
  // Decide how the plate should react given the config value
  const scrollZoom = configValue === "Zoom" ? true : false;
  const dragMode = configValue === "Zoom" ? true : false;
  const doubleClickHandler =
    configValue === "Select (m/z) slices" ? handleDoubleClick : () => {};
  const onHoverHandler =
    configValue === "Select (m/z) slices" ? handleHover : () => {};
  const onClickHandler =
    configValue === "Select (m/z) slices"
      ? handleClick
      : configValue === "Update zMin" || configValue === "Update zMax"
      ? handleClickZ
      : () => {};

  return {
    scrollZoom,
    dragMode,
    doubleClickHandler,
    onClickHandler,
    onHoverHandler,
  };
};

const getDefaultBaseline = async (xData, yData, setBaseline, setYdataUpdated, setBaselineUpdated) => {
  const dataToSend = {
    xData: xData,
    yData: yData
  }

  const result = await performBaselineCorrection(dataToSend)
  if (result.success) {
    // update baseline, values and columns 
    setBaseline(result.baseline);
    setYdataUpdated(result.yValues);
    setBaselineUpdated(true)
  } else {
    console.error(result.message);
  }
}

export { getShape, getPlotConfiguration, getDefaultBaseline };
