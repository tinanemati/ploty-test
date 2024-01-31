import { useContext } from "react";
import PlotsContext from "../services/providers/PlotsProvider";

const usePlotsContext = () => {
  return useContext(PlotsContext);
};

export default usePlotsContext;