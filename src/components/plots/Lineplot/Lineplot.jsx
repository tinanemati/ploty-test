import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Lineplotconfig from "./LineplotConfig";
import LinePlotComponent from "./LineplotComponent";
import PeakTable from "../../table/PeakTable";
import { usePlotsContext } from "../../../hooks/usePlotsContext";

export default function LinePlot() {
  const [configValue, setConfigValue] = useState("Zoom");
  const [baselineTimeRange, setBaselineTimeRange] = useState([]);
  const [pointClicked, setPointClicked] = useState([]);
  const [xDataUpdated, setXdataUpdated] = useState([]);
  const { setBaselineUpdated, sliceSelected } = usePlotsContext();
  // Function that will update the baseline range
  const updateBaselineTimeRange = (pointX) => {
    // Check if pointX is already in baselineTimeRange
    const isTimeAlreadySelected = baselineTimeRange.includes(pointX);

    // Toggle the presence of pointX in the array
    const updatedTimes = isTimeAlreadySelected
      ? baselineTimeRange.filter((time) => time !== pointX)
      : [...baselineTimeRange, pointX];

    setBaselineTimeRange(updatedTimes);
  };

  // Reset the setting when we selecet a new slice and table data gets updated
  useEffect(() => {
    if (sliceSelected === false) {
      setConfigValue("Zoom");
      setBaselineTimeRange([]);
      setPointClicked([]);
    }
  }, [sliceSelected]);

  // update the setting according to config option
  useEffect(() => {
    if (configValue === "Reset") {
      setBaselineTimeRange([]);
      setPointClicked([]);
      setBaselineUpdated(false);
    }
  }, [configValue]);

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
      <LinePlotComponent
        configValue={configValue}
        baselineTimeRange={baselineTimeRange}
        updateBaselineTimeRange={updateBaselineTimeRange}
        pointClicked={pointClicked}
        xDataUpdated={xDataUpdated}
        setPointClicked={setPointClicked}
        setBaselineTimeRange={setBaselineTimeRange}
        setXdataUpdated={setXdataUpdated}
      />
      <PeakTable />
    </Box>
  );
}
