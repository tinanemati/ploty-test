import Box from "@mui/material/Box";
import { PlotsProvider } from "../services/providers/PlotsProvider";
import Heatmap from "../components/plots/Heatmap/Heatmap";
import LinePlot from "../components/plots/Lineplot/Lineplot";

function ScientificPlots() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
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

export default ScientificPlots;
