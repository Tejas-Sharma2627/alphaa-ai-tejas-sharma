import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import {
  Grid,
  Box,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useEffect } from "react";

function WaterfallChart({ labels, sales2021, sales2022, chartData }) {
  const [salesDiff, setSalesDiff] = useState([]);
  const [total, setTotal] = useState(0);
  const [profit, setProfit] = useState(0);
  const [loss, setLoss] = useState(0);
  const [holderData, setHolderData] = useState([0]);
  const [display2021, setDisplay2021] = useState(0);
  const [display2022, setDisplay2022] = useState(0);
  const [displayDiff, setDisplayDiff] = useState(0);
  // const [profitArray, setProfitArray] = useState([]);
  // const [lossArray, setLossArray] = useState([]);
  let length = sales2021.length;

  const compare = (a, b) => {
    if (a.value < b.value) {
      return 1;
    }
    if (a.value > b.value) {
      return -1;
    }
    return 0;
  };
  // let diffArray;
  let profitArray = [];
  let lossArray = [];
  let labelsArray = [];
  let cumulativeArray = [0];
  useEffect(() => {
    chartData.map((item) => {
      let diff = item.d__2022sale - item.d__2021sale;
      setTotal((prev) => prev + diff);
      setSalesDiff((salesDiff) => [
        ...salesDiff,
        { label: item.subcategory, value: diff },
      ]);
      if (diff > 0) {
        setProfit((profit) => profit + diff);
        // setProfitArray((profitArray) => [...profitArray, diff]);
        // setLossArray((lossArray) => [...lossArray, "-"]);
      } else {
        setLoss((loss) => loss + diff);
        // setLossArray((lossArray) => [...lossArray, diff]);
        // setProfitArray((profitArray) => [...profitArray, "-"]);
      }
    });
    profitArray = [];
    lossArray = [];
    labelsArray = [];
    cumulativeArray = [0];
  }, []);
  let cumulative = 0;
  let diffArray =
    profit > loss ? salesDiff.sort(compare) : salesDiff.sort(compare).reverse();
  let found = false;
  diffArray.map((item, index) => {
    if (profit > loss) {
      if (item.value > 0) {
        profitArray.push(Math.floor(item.value));
        lossArray.push("-");
        labelsArray.push(item.label);
      } else {
        found = true;
        console.log("here");
        profitArray.push("-");
        lossArray.push(-1 * Math.floor(item.value));
        labelsArray.push(item.label);
      }
    } else {
      if (item.value > 0) {
        profitArray.push("-");
        lossArray.push(-1 * Math.floor(item.value));
        labelsArray.push(item.label);
      } else {
        profitArray.push(Math.floor(item.value));
        lossArray.push("-");
        labelsArray.push(item.label);
      }
    }
  });
  profitArray.map((item, index)=>{
    if(item!="-"){
      cumulative+=item;
      cumulativeArray.push(cumulative);
    }
    else{
      cumulative+=lossArray[index];
      cumulativeArray.push(cumulative);
    }
  })
  labelsArray.push("Total");
  const option = {
    title: {
      text: "Accumulated Waterfall Chart",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["Profit", "Loss"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: labelsArray,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Placeholder",
        type: "bar",
        stack: "Total",
        itemStyle: {
          borderColor: "transparent",
          color: "transparent",
        },
        emphasis: {
          itemStyle: {
            borderColor: "transparent",
            color: "transparent",
          },
        },
        data: cumulativeArray,
      },
      {
        name: "Profit",
        type: "bar",
        stack: "Total",
        label: {
          show: true,
          position: "top",
        },
        data: profitArray,
      },
      {
        name: "Loss",
        type: "bar",
        stack: "Total",
        label: {
          show: true,
          position: "bottom",
        },
        data: lossArray,
      },
    ],
  };
  const onChartClick = (params) => {
    console.log('Chart clicked', params);
    const {name}=params;
    chartData.map((item)=>{
      if(item.subcategory===name){
        setDisplay2021(Math.floor(item.d__2021sale));
        setDisplay2022(Math.floor(item.d__2022sale));
        setDisplayDiff(Math.floor(item.d__2022sale-item.d__2021sale));
      }
    })
  };

  const onEvents = {
    click: onChartClick,
  };
  return (
    <>
      <Grid container direction="row" justifyContent="space-between">
        <Grid item md={8} xs={12}>

          <ReactECharts option={option} style={{ height: 500 }} onEvents={onEvents}/>
        </Grid>
        <Grid item md={4} xs={8}>
          <Card sx={{ minWidth: 275, backgroundColor: "#D3D3D3" }}>
            <CardHeader
              title="Chart Summary"
              subheader="Hover over the Data Points"
            />
            <CardContent>
              <Typography variant="h6" color="black">
                Sales in Year 2021: {display2021}
              </Typography>
              <Typography variant="h6" color="black">
                Sales in Year 2022: {display2022}
              </Typography>
              <Typography variant="h6" color="black" style={{padding:5,borderRadius:10,backgroundColor:displayDiff<0?"red":"green"}}>
                Net Change: {displayDiff}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default WaterfallChart;
