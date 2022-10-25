import React, { useState, useEffect } from "react";
import AlphaChart from "./components/AlphaChart";
import { CircularProgress } from "@mui/material";
import useFetch from "./customHook/useFetch";
function App() {
  const { isLoading, apiData, apiError } = useFetch(
    "GET",
    "https://run.mocky.io/v3/e2ffac92-48e0-4826-a59f-bf76fc727383",
    {}
  );

  const [chartData, setChartData] = useState(apiData);
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <AlphaChart chartData={chartData}/>
    </div>
  );
}

export default App;
