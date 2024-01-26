import axios from "axios";

// Function that will calculate baseline corection
const performBaselineCorrection = async (dataToSend) => {
  // POST request to backend with yData to calculate simple basline
  try {
    const response = await axios.post(
      "http://127.0.0.1:7000/baselineCorrection",
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

export { performBaselineCorrection };
