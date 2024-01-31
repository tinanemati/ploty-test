import GenericConfig from "../../ui/GenericConfig";

function Heatmapconfig({ configValue, updateConfigValue }) {
  const options = [
    "Select (m/z) slices",
    "Zoom",
    "Update zMin",
    "Update zMax",
    "Reset z Values",
  ];

  return (
    <GenericConfig
      configValue={configValue}
      updateConfigValue={updateConfigValue}
      options={options}
      backgroundColor="#FFFFFF"
      textColor="#32383E"
      selectedBackgroundColor="#0099FF24"
      selectedTextColor="#32383E"
    />
  );
}

export default Heatmapconfig;
