import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Price from "../components/PriceComponent/Price.jsx";
import StockChart from "./TabContent/ChartComponent/StockChart";
import SettingsComponent from "./TabContent/SettingsComponent/Settings";
import Summary from "./TabContent/SummaryComponent/Summary";
import "./StockDashboard.css";
import CustomTabs from "./CustomTabLayerComponent/CustomTabs";
import LoadingSpinner from "./LoadingSpinner";
import Statistics from "./TabContent/StatisticsComponent/Statistics.jsx";
import Analysis from "./TabContent/AnalysisComponent/Analysis.jsx";

const StockDashboard = () => {
  const [data, setData] = useState([]);
  const [priceData, setPriceData] = useState([]);
  const [duration, setDuration] = useState("6m"); // Default duration
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(1); // Default to the Chart tab
  const [selectedSymbol, setSelectedSymbol] = useState("AAPL"); // Default symbol

  const apiKey = process.env.REACT_APP_API_KEY;

  const apiDetails = useMemo(
    () => ({
      "1d": { function: "TIME_SERIES_INTRADAY", interval: "5min" },
      "3d": { function: "TIME_SERIES_INTRADAY", interval: "15min" },
      "1w": { function: "TIME_SERIES_INTRADAY", interval: "30min" },
      "1m": { function: "TIME_SERIES_INTRADAY", interval: "60min" },
      "6m": { function: "TIME_SERIES_DAILY", interval: null },
      "1y": { function: "TIME_SERIES_WEEKLY", interval: null },
      max: { function: "TIME_SERIES_MONTHLY", interval: null },
    }),
    []
  );

  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true);
      const { function: func, interval } = apiDetails[duration];
      const url = `https://www.alphavantage.co/query?function=${func}&symbol=${selectedSymbol}&apikey=${apiKey}${
        interval ? `&interval=${interval}` : ""
      }`;

      try {
        const response = await axios.get(url);
        let stockData;

        if (func === "TIME_SERIES_INTRADAY") {
          stockData = response.data["Time Series (" + interval + ")"];
        } else if (func === "TIME_SERIES_DAILY") {
          stockData = response.data["Time Series (Daily)"];
        } else if (func === "TIME_SERIES_WEEKLY") {
          stockData = response.data["Weekly Time Series"];
        } else if (func === "TIME_SERIES_MONTHLY") {
          stockData = response.data["Monthly Time Series"];
        }

        if (stockData) {
          const chartData = Object.keys(stockData).map((date) => ({
            date: new Date(date).toLocaleDateString(), // Convert to local date string
            price: parseFloat(stockData[date]["4. close"]), // Use closing price
            volume: parseInt(stockData[date]["5. volume"], 10),
          }));
          console.log(chartData);
          if (chartData.length >= 2) {
            setPriceData(chartData?.slice(0, 2)); // Get the latest two records
          }
          setData(chartData.reverse()); // Reverse to display in chronological order

          // Update price data for the Price component
        } else {
          console.error("Invalid data structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching stock data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [duration, selectedSymbol, apiDetails, apiKey]); // Trigger fetching data when duration or symbol changes

  const handleDurationChange = (newDuration) => {
    setDuration(newDuration);
  };

  const handleTabChange = (index) => {
    setSelectedTab(index);
  };

  const handleSelectSymbol = (symbol) => {
    setSelectedSymbol(symbol);
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return <Summary selectedSymbol={selectedSymbol} />;
      case 1:
        return (
          <StockChart
            data={data}
            duration={duration}
            onDurationChange={handleDurationChange}
          />
        );
      case 2:
        return <Statistics selectedSymbol={selectedSymbol} />;
      case 3:
        return <Analysis selectedSymbol={selectedSymbol} />;
      case 4:
        return (
          <SettingsComponent
            selectedSymbol={selectedSymbol}
            onSelectSymbol={handleSelectSymbol}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="stock-dashboard">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="price-container">
            <Price data={priceData} />
          </div>
          <div className="chart-container-parent">
            <CustomTabs tabIndex={selectedTab} onTabChange={handleTabChange} />
            <div className="content-container">{renderTabContent()}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default StockDashboard;
