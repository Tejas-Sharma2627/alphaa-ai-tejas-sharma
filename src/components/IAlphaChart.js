import React from "react";
import WaterfallChart from "./WaterfallChart";
import Graph from "./Graph";
import PieChart from "./PieChart";
function IAlphaChart({ chartData, chartType, labels, sales2021, sales2022 }) {
  console.log(chartType);
  const options = {
    title: {
      text: "Line Chart",
    },
    legend: {},
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: labels,
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "Units Sold (in Value $)",
        nameLocation: "middle",
        nameGap: 50,
      },
    ],
    series: [
      {
        name: "Sales-2021",
        data: sales2021,
        type:
          chartType === "waterfall" || chartType === "pie" ? "line" : chartType,
        smooth: true,
      },
      {
        name: "Sales-2022",
        data: sales2022,
        type:
          chartType === "waterfall" || chartType === "pie" ? "line" : chartType,
        smooth: true,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };
  return (
    <>
      {chartType === "waterfall" && <WaterfallChart chartData={chartData} />}
      {chartType !== "waterfall" && chartType !== "pie" && (
        <Graph options={options} />
      )}
      {chartType === "pie" && (
        <PieChart sales2021={sales2021} sales2022={sales2022} labels={labels} />
      )}
    </>
  );
}

export default IAlphaChart;
