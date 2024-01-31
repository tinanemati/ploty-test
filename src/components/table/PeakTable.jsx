import React from "react";
import Box from "@mui/material/Box";
import PeaksTableComponent from "./PeaksTableComponent";
import { auto } from "@popperjs/core";

export default function PeakTable() {
  return (
    <Box sx={{ padding: "5px", marginTop: "10px" }}>
      <PeaksTableComponent />
    </Box>
  );
}
