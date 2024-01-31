import { createContext, useState } from "react";
import PropTypes from "prop-types";

const PlotsContext = createContext();

export const PlotsProvider = ({ children }) => {
  const [xData, setXdata] = useState([]);
  const [yData, setYdata] = useState([]);
  const [horizontalLinePosition, setHorizontalLinePosition] = useState(null);
  const [sliceSelected, setSliceSelected] = useState(false);
  const [yDataUpdated, setYdataUpdated] = useState([]);
  const [baseline, setBaseline] = useState([]);
  const [baselineUpdated, setBaselineUpdated] = useState(false);

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
        yDataUpdated,
        setYdataUpdated,
        baseline,
        setBaseline,
        baselineUpdated,
        setBaselineUpdated
      }}
    >
      {children}
    </PlotsContext.Provider>
  );
};

PlotsProvider.propTypes = {
  children: PropTypes.element,
};

export default PlotsContext; 