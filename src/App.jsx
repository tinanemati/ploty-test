import Box from "@mui/material/Box";
import Heatmap from "./components/plots/Heatmap/Heatmap"
import LinePlot from "./components/plots/Lineplot/Lineplot";
import { PlotsProvider } from "./hooks/usePlotsContext";

function App() {
  return (
    <>
      <h1>
        Scientific Plots
      </h1>
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

export default App;
