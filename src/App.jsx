import React from "react";
import Box from "@mui/material/Box";
import Heatmap from "./components/plots/Heatmap/Heatmap"
import LinePlot from "./components/plots/Lineplot/Lineplot";
import { PlotsProvider } from "./hooks/usePlotsContext";

function App() {
  return (
    <>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Scientific Plots
      </h1>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PlotsProvider>
          <Heatmap />
          <LinePlot />
        </PlotsProvider>
      </Box>
    </>
  );
}

export default App;
