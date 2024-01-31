import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import HeatmapComponent from "./HeatmapComponent";
import Heatmapconfig from "./HeatmapConfig";

export default function Heatmap() {
  const [configValue, setConfigValue] = useState("Select (m/z) slices");
  const [zMin, setZMin] = useState(null);
  const [zMax, setZMax] = useState(null);
  const [minLimit, setMinLimit] = useState(null);
  const [maxLimit, setMaxLimit] = useState(null);

  const handleWheel = (event) => {
    if (configValue !== "Zoom" && configValue !== "Reset z Values") {
      if (event.deltaY < 0) {
        // zoom-in - increment zMin only on zoom-in events
        setZMin((prevZMin) => Math.min(maxLimit, prevZMin + 10000));
        //zoom-in - decremeant zMax only on zoom-out events
        setZMax((prevZMax) => Math.max(minLimit, prevZMax - 10000));
      } else {
        //zoom-out - decremeant zMin only on zoom-out events
        setZMin((prevZMin) => Math.max(minLimit, prevZMin - 10000));
        // zoom-out - increment zMax only on zoom-in events
        setZMax((prevZMax) => Math.min(maxLimit, prevZMax + 10000));
      }
    }
  };

  useEffect(() => {
    if (configValue === "Reset z Values") {
      setZMax(maxLimit);
      setZMin(minLimit);
    } else if (configValue !== "Zoom" && configValue !== "Reset z Values") {
      const cancelWheel = (event) => event.preventDefault();

      window.addEventListener("wheel", cancelWheel, { passive: false });

      return () => {
        window.removeEventListener("wheel", cancelWheel);
      };
    }
  }, [configValue, minLimit, maxLimit]);

  const renderHeatmap = () => {
    return (
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
        onWheel={handleWheel}
      >
        <Heatmapconfig
          configValue={configValue}
          updateConfigValue={setConfigValue}
        />
        <HeatmapComponent
          configValue={configValue}
          zMin={zMin}
          zMax={zMax}
          setZMin={setZMin}
          setZMax={setZMax}
          setMinLimit={setMinLimit}
          setMaxLimit={setMaxLimit}
        />
      </Box>
    );
  };
  return renderHeatmap();
}
