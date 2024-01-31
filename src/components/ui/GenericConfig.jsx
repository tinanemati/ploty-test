import { memo } from "react";
import FormControl from "@mui/material/FormControl";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

function GenericConfig({
  configValue,
  updateConfigValue,
  options,
  backgroundColor,
  textColor,
  selectedBackgroundColor,
  selectedTextColor,
}) {
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
          backgroundColor: backgroundColor,
        }}
      >
        {options.map((option, index) => (
          <ToggleButton
            key={index}
            value={option}
            sx={{
              color: textColor,
              fontWeight: "400",
              "&.Mui-selected": {
                backgroundColor: selectedBackgroundColor,
                color: selectedTextColor,
              },
              "&.Mui-selected:hover": {
                backgroundColor: selectedBackgroundColor,
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

export default memo(GenericConfig);
