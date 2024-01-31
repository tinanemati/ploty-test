import GenericConfig from "../../ui/GenericConfig";

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

export default Lineplotconfig;
