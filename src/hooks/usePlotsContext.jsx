import React, { createContext, useState, useContext } from "react";

const PlotsContext = createContext();

export const PlotsProvider = ({ children }) => {
  const [xData, setXdata] = useState([]);
  const [yData, setYdata] = useState([]);
  const [horizontalLinePosition, setHorizontalLinePosition] = useState(null);
  const [sliceSelected, setSliceSelected] = useState(false);

  return (
    <PlotsContext.Provider
      value={{
        xData,
        setXdata,
        yData,
        setYdata,
        horizontalLinePosition,
        setHorizontalLinePosition,
        sliceSelected,
        setSliceSelected,
      }}
    >
      {children}
    </PlotsContext.Provider>
  );
};

export const usePlotsContext = () => {
  return useContext(PlotsContext);
};
