import React from "react";
import ReactECharts from "echarts-for-react";
import { Grid } from "@mui/material";
function PieChart({ sales2021, sales2022, labels }) {
  const pieData = [];
  const pieData2 =[];
  for (let i = 0; i < sales2021.length; i++) {
    pieData.push({
      name: labels[i],
      value: sales2021[i],
    });
    pieData2.push({
      name: labels[i],
      value: sales2022[i],
      });
  }

  const options = {
    title:{
      text: "Sales in year 2021",
      left: 'center'
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "left",
      orient:"vertical"
    },
    series: [
      {
        name: "Sales-2021",
        type: "pie",
        radius: ["40%", "70%"],
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "40",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: pieData,
      },
    ],
  };
  const options1 = {
    title:{
      text: "Sales in year 2022",
      left: 'center'
        },
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: "Sales-2022",
        type: "pie",
        radius: ["40%", "70%"],
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "40",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: pieData2,
      },
    ],
  };
  return (
    <Grid container direction="row" justifyContent="center">
      <Grid item md={6} xs={12}>
        <ReactECharts option={options} style={{ height: 500 }} />
      </Grid>
      <Grid item md={6} xs={12}>
        <ReactECharts option={options1} style={{ height: 500 }} />
      </Grid>
    </Grid>
  );
}

export default PieChart;
