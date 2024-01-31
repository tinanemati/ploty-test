const findMinMaxValues = (zData) => {
  let min = zData[0][0];
  let max = zData[0][0];

  // Iterate through zData to find the minimum and maximum values
  zData.forEach((row) => {
    row.forEach((value) => {
      if (value < min) {
        min = value; // Update min if a smaller value is found
      }
      if (value > max) {
        max = value; // Update max if a larger value is found
      }
    });
  });

  return { min, max };
};

export { findMinMaxValues };
