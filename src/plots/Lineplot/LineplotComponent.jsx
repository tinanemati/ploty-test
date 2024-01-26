import React, { memo } from "react";
import Plot from "react-plotly.js";
import { usePlotsContext } from "../../hooks/usePlotsContext";

function LinePlotComponent({ configValue }) {
  const { yData, xData, horizontalLinePosition } = usePlotsContext();

  const renderLinePlot = () => {
    // Extract plot's title, label and configuration
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
            title: `Ion Count (m/z=${horizontalLinePosition})`,
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

export default memo(LinePlotComponent);