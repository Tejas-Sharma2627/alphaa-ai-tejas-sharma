

import React from "react";
import ReactECharts from "echarts-for-react";
import { Grid } from "@mui/material";
function Graph({options}) {
  
  return (
    <Grid container direction="row" justifyContent="center">
      <Grid item md={8} xs={12}>
        <ReactECharts option={options} style={{ height: 500 }} />
      </Grid>
    </Grid>
  );
}

export default Graph;
