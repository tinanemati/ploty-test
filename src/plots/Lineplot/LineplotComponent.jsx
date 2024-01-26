import React from "react";
import Plot from "react-plotly.js";
import { usePlotsContext } from "../../hooks/usePlotsContext";

// const { sliceSelected, setSliceSelected, xData, yData } = usePlotsContext();
export default function LinePlotComponent({ configValue }) {
  const { yData, xData, horizontalLinePosition, sliceSelected } =
    usePlotsContext();

  const renderLinePlot = () => {
    // Extract plot's title, label and configuration
    const yaxisTitle = sliceSelected
      ? `Ion Count (m/z=${horizontalLinePosition})`
      : "Ion Count";
    const scrollZoom = configValue === "Zoom" ? true : false;
    const dragMode = configValue === "Zoom" ? "zoom" : false;

    // Extract plot's render data
    //let baselineShape;

    return (
      <Plot
        data={[
          {
            x: xData,
            y: yData,
            type: "scatter",
            mode: "lines+markers",
            marker: {
              size: 1,
              color: "#000",
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
            title: yaxisTitle,
            zeroline: false,
          },
          dragmode: dragMode,
          showlegend: false,
        }}
        config={{ scrollZoom: scrollZoom, displayModeBar: false }}
      />
    );
  };
  return renderLinePlot();
}
