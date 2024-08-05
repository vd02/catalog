import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Divider } from "@mui/joy";
import LoadingSpinner from "../../LoadingSpinner";
import "./Statistics.css"; // Make sure this path is correct

const Statistics = ({ selectedSymbol }) => {
  const [financialData, setFinancialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFinancialData = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          "https://finnhub.io/api/v1/stock/metric",
          {
            params: {
              symbol: selectedSymbol,
              metric: "all",
              token: process.env.REACT_APP_FINHUB_API_KEY,
            },
          }
        );
        setFinancialData(response.data);
      } catch (error) {
        console.error("Error fetching financial data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFinancialData();
  }, [selectedSymbol]);

  if (loading) return <LoadingSpinner />;

  if (!financialData) return <div>No financial data available</div>;

  const metrics = financialData.metric || {};

  // Define only the specific entries you want to display
  const filteredMetrics = {
    "10DayAverageTradingVolume": metrics["10DayAverageTradingVolume"],
    "52WeekHigh": metrics["52WeekHigh"],
    "52WeekLow": metrics["52WeekLow"],
    "52WeekLowDate": metrics["52WeekLowDate"],
    "52WeekPriceReturnDaily": metrics["52WeekPriceReturnDaily"],
    beta: metrics["beta"],
  };

  return (
    <div className="analysis-container">
      <Card
        sx={{
          width: "100%",
          maxWidth: 600,
          margin: "0 auto",
          marginBottom: 2,
          backgroundColor: "#fafafa",
          border: "2px solid #4b40ee",
          boxShadow: "none",
          padding: 2,
          fontFamily: "MyCustomFont, sans-serif", // Apply custom font
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            color="#4b40ee"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              fontFamily: "MyCustomFont, sans-serif",
            }} // Apply custom font
          >
            Financial Metrics
          </Typography>
          <Divider sx={{ my: 1 }} />
          {Object.entries(filteredMetrics).map(([key, value]) => (
            <div key={key} className="metric-item">
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "bold",
                  color: "#4b40ee",
                  fontFamily: "MyCustomFont, sans-serif",
                }} // Apply custom font
              >
                {key.replace(/([A-Z])/g, " $1").toUpperCase()}:
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontFamily: "MyCustomFont, sans-serif" }}
              >
                {" "}
                {/* Apply custom font */}
                {typeof value === "number" ? value.toFixed(2) : value}
              </Typography>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Statistics;
