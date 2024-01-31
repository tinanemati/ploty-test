import { memo } from "react";
import FormControl from "@mui/material/FormControl";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

function Heatmapconfig({ configValue, updateConfigValue }) {
  const options = [
    "Select (m/z) slices",
    "Zoom",
    "Update zMin",
    "Update zMax",
    "Reset z Values",
  ];

  const handleChange = (event, newValue) => {
    updateConfigValue(newValue);
  };

  return (
    <FormControl sx={{ display: "flex" }}>
      <ToggleButtonGroup
        orientation="vertical"
        value={configValue}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        sx={{
          backgroundColor: "#FFFFFF",
        }}
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

export default memo(Heatmapconfig);
