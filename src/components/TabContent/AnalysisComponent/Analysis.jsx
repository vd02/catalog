import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Divider } from "@mui/joy";
import LoadingSpinner from "../../LoadingSpinner";
import "./Analysis.css"; // Make sure this path is correct

const Analysis = ({ selectedSymbol }) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsData = async () => {
      setLoading(true);

      // Calculate the date range
      const endDate = new Date().toISOString().split("T")[0]; // Current date
      const startDate = new Date();
      startDate.setFullYear(startDate.getFullYear() - 1);
      const startDateFormatted = startDate.toISOString().split("T")[0]; // 1 year ago

      try {
        const response = await axios.get(
          "https://finnhub.io/api/v1/company-news",
          {
            params: {
              symbol: selectedSymbol,
              from: startDateFormatted,
              to: endDate,
              token: process.env.REACT_APP_FINHUB_API_KEY,
            },
          }
        );
        setNewsData(response.data.slice(0, 3)); // Get the top 3 news articles
      } catch (error) {
        console.error("Error fetching news data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
  }, [selectedSymbol]);

  if (loading) return <LoadingSpinner />;

  if (newsData.length === 0) return <div>No news available</div>;

  return (
    <div className="news-container">
      {newsData.map((news, index) => (
        <Card
          key={index}
          sx={{
            width: "100%",
            maxWidth: 600,
            margin: "0 auto",
            marginBottom: 2,
            backgroundColor: "#fafafa",
            border: "2px solid #4b40ee",
            boxShadow: "none",
            fontFamily: "MyCustomFont, sans-serif", // Apply custom font
          }}
        >
          <CardContent>
            <Typography variant="h6" component="div" className="news-title">
              {news.headline}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {new Date(news.datetime * 1000).toLocaleDateString()}{" "}
              {/* Convert Unix timestamp */}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2" className="news-summary">
              {news.summary}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Analysis;
