import React, { useState, useEffect } from "react";
import AlphaChart from "./components/AlphaChart";
import { CircularProgress } from "@mui/material";
import useFetch from "./customHook/useFetch";
function App() {
  // const { isLoading, apiData, apiError } = useFetch(
  //   "GET",
  //   "https://run.mocky.io/v3/e2ffac92-48e0-4826-a59f-bf76fc727383",
  //   {}
  // );

  const [chartData, setChartData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [sales2021, setSales2021] = useState([]);
  const [sales2022, setSales2022] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getchartData = async () => {
        setLoading(true);
        await fetch(
          "https://run.mocky.io/v3/e2ffac92-48e0-4826-a59f-bf76fc727383"
        ).then((response) => response.json()).then((data)=>{
          // setChartData(data.data);
          console.log(data.data);
          setChartData(data.data);
          setLabels(data.data.map((item) => item.subcategory));
          setSales2021(data.data.map((item) => item.d__2021sale));
          setSales2022(data.data.map((item) => item.d__2022sale));
          console.log(sales2021);
          console.log(sales2022);
          console.log(labels);
        });
        // chartData.map((item) => {
        //   console.log(item);
        //   setLabels((labels) => [...labels, item.subcategory]);
        //   setSales2021((sales2021) => [...sales2021, item.d__2021sale]);
        //   setSales2022((sales2022) => [...sales2022, item.d__2022sale]);
        // });
        setLoading(false);
    };
    getchartData();
  }, []);

  return (
    <div>
      {loading && <CircularProgress />}
      {!loading && (
        <AlphaChart
          chartData={chartData}
          labels={labels}
          sales2021={sales2021}
          sales2022={sales2022}
        />
      )}
    </div>
  );
}

export default App;
