import GenericConfig from "../../ui/GenericConfig";
import PropTypes from "prop-types";

function Lineplotconfig({ configValue, updateConfigValue }) {
  const options = ["Zoom", "Integration", "Baseline", "Reset"];

  return (
    <GenericConfig
      configValue={configValue}
      updateConfigValue={updateConfigValue}
      options={options}
      backgroundColor="white"
      textColor="#32383E"
      selectedBackgroundColor="#0099FF24"
      selectedTextColor="#32383E"
    />
  );
}

Lineplotconfig.propTypes = {
  configValue: PropTypes.string.isRequired,
  updateConfigValue: PropTypes.func.isRequired,
};

export default Lineplotconfig;
