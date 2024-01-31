import GenericConfig from "../../ui/GenericConfig";
import PropTypes from "prop-types";

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

Heatmapconfig.propTypes = {
  configValue: PropTypes.string.isRequired,
  updateConfigValue: PropTypes.func.isRequired,
};

export default Heatmapconfig;
