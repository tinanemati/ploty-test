import axios from "axios";

// Function that will calculate baseline corection
const performBaselineCorrection = async (dataToSend) => {
  // POST request to backend with yData to calculate simple basline
  try {
    const response = await axios.post(
      "/api/baselineCorrection",
      dataToSend
    );
    if (!response.data.error) {
      return {
        success: true,
        baseline: response.data.baseline,
        yValues: response.data.values,
        timeValues: response.data.times,
      };
    } else {
      return { success: false, message: response.data.error };
    }
  } catch (error) {
    return {
      success: false,
      message: "Failed to calculate baseline. Please try again.",
    };
  }
};

const areaCalculation = async (dataToSend) => {
  // POST request to the backend with the range and values to calculate areas
  try {
    const response = await axios.post("/api/area",dataToSend);
    if(!response.data.error) {
      return {
        success: true,
        area: response.data.area
      }
    }
  } catch (error) {
    return {
      success: false,
      message: "Failed to calculate area. Please try again"
    }
  }
}
export { performBaselineCorrection, areaCalculation };
