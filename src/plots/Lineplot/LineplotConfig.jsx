import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import FormControl from "@mui/material/FormControl";

function Lineplotconfig({ configValue, updateConfigValue }) {
  const options = ["Zoom", "Integration", "Baseline", "Reset"];

  const handleChange = (event, newValue) => {
    updateConfigValue(newValue);
  };

  return (
    <FormControl sx={{ display: "flex" }}>
      <ToggleButtonGroup
        orientation="vertical"
        color="primary"
        value={configValue}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        sx={{ backgroundColor: "white" }}
      >
        {options.map((option, index) => (
          <ToggleButton
            key={index}
            value={option}
            sx={{
              color: "#32383E",
              fontWeight: "400",
              "&.Mui-selected": {
                backgroundColor: "#0099FF24",
                color: "#32383E",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "#0099FF24",
              },
            }}
          >
            {option}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </FormControl>
  );
}

export default Lineplotconfig;