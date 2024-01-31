import React, { useState, useEffect, useMemo } from "react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-balham.css";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

export default function PeaksTableComponent() {
  // we need to get time range and calculated areas from the LinePlot
  const [rowData, setRowData] = useState();
  const columnDefs = useMemo(
    () => [
      { field: "Name", width: 90 },
      { field: "Channel", width: 74 },
      { field: "TimeRange", headerName: "Time Range", width: 111 },
      { field: "CalculatedArea", headerName: "Area", width: 80 },
    ],
    []
  );
  //   useEffect(() => {
  //     if (regionData.length > 0) {
  //       setRowData(regionData);
  //     } else {
  //       setRowData(null);
  //     }
  //   }, [regionData]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(
    () => ({
      resizable: true,
    }),
    []
  );
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "200px",
        width: "400px",
      }}
    >
      <div
        className="ag-theme-balham"
        style={{ height: "100%", width: "100%" }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
        ></AgGridReact>
      </div>
    </div>
  );
}
