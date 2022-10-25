import React, { useState } from "react";
import { Tabs, Tab, Box, Grid } from "@mui/material";
import IAlphaChart from "./IAlphaChart";
const charTypes = [
  {
    value: "waterfall",
    label: "Waterfall Chart",
  },
  {
    value: "LineChart",
    label: "Line Chart",
  },
  {
    value: "BarChart",
    label: "Bar Chart",
  },
  {
    value: "PieChart",
    label: "Pie Chart",
  },
];
function AlphaChart({ chartData }) {
  const [chartType, setChartType] = useState("waterfall");
  const handleChange = (event, newValue) => {
    setChartType(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid container>
          <Tabs
            value={chartType}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="chart-selector"
          >
            {charTypes.map((chartType) => {
              return <Tab label={chartType.label} value={chartType.value} />;
            })}
          </Tabs>
        </Grid>
        <Grid>
          <IAlphaChart chartType={chartType} chartData={chartData} />
        </Grid>
      </Box>
    </>
  );
}

export default AlphaChart;
