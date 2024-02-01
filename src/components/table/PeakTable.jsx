import Box from "@mui/material/Box";
import PeaksTableComponent from "./PeaksTableComponent";

export default function PeakTable({ regionData }) {
  return (
    <Box sx={{ padding: "5px", marginTop: "10px" }}>
      <PeaksTableComponent regionData={regionData} />
    </Box>
  );
}
