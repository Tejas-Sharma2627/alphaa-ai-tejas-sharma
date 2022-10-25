import React, { useState } from "react";
import { Tabs, Tab, Box, Grid } from "@mui/material";
import IAlphaChart from "./IAlphaChart";
const charTypes = [
  {
    key: 1,
    value: "waterfall",
    label: "Waterfall Chart",
  },
  {
    key: 2,
    value: "line",
    label: "Line Chart",
  },
  {
    key: 3,
    value: "bar",
    label: "Bar Chart",
  },
  {
    key: 4,
    value: "pie",
    label: "Pie Chart",
  },
];
function AlphaChart({ chartData, labels, sales2021, sales2022 }) {
  const [chartType, setChartType] = useState("waterfall");
  const handleChange = (event, newValue) => {
    setChartType(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%", height: "500" }}>
        <Tabs
          value={chartType}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="chart-selector"
        >
          {charTypes.map((chartType) => {
            return (
              <Tab
                label={chartType.label}
                value={chartType.value}
                key={charTypes.key}
              />
            );
          })}
        </Tabs>
      </Box>
      <IAlphaChart
        chartType={chartType}
        chartData={chartData}
        labels={labels}
        sales2021={sales2021}
        sales2022={sales2022}
      />
    </>
  );
}

export default AlphaChart;
