import React, { useState } from "react";
import Box from "@mui/material/Box";
import Lineplotconfig from "./LineplotConfig";
import LinePlotComponent from "./LineplotComponent";

export default function LinePlot() {
  const [configValue, setConfigValue] = useState("Zoom");

  return (
    <Box
      sx={{
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ paddingLeft: "52px" }}>
        <Lineplotconfig
          configValue={configValue}
          updateConfigValue={setConfigValue}
        />
      </div>
      <LinePlotComponent configValue={configValue} />
    </Box>
  );
}
