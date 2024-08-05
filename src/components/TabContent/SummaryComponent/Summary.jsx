import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/joy";
import axios from "axios";
import LoadingSpinner from "../../LoadingSpinner";
import "./Summary.css";

const Summary = ({ selectedSymbol }) => {
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);

//   const apiKey = process.env.REACT_APP_FINNHUB_API_KEY;

  useEffect(() => {
    const fetchCompanyData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://finnhub.io/api/v1/stock/profile2",
          {
            params: {
              symbol: selectedSymbol,
              token: process.env.REACT_APP_FINHUB_API_KEY,
            },
          }
        );
        setCompanyData(response.data);
      } catch (error) {
        console.error("Error fetching company data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, [selectedSymbol]);

  if (loading) return <LoadingSpinner />;

  if (!companyData) return <div>No data available</div>;

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 500,
        margin: "0 auto",
        padding: 2,
        backgroundColor: "#fafafa",
        border: "2px solid #4b40ee",
        boxShadow: "none",
        fontFamily: "MyCustomFont, sans-serif",
      }}
    >
      <CardContent>
        <div className="card-header">
          <img
            src={companyData.logo}
            alt={`${companyData.name} logo`}
            className="company-logo"
          />
          <Typography
            variant="h6"
            component="div"
            className="company-name"
            sx={{ fontFamily: "MyCustomFont, sans-serif" }}
          >
            {companyData.name}
          </Typography>
        </div>
        <Typography
          variant="body1"
          sx={{ fontFamily: "MyCustomFont, sans-serif" }}
        >
          <strong>Ticker:</strong> {companyData.ticker}
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontFamily: "MyCustomFont, sans-serif" }}
        >
          <strong>Exchange:</strong> {companyData.exchange}
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontFamily: "MyCustomFont, sans-serif" }}
        >
          <strong>Industry:</strong> {companyData.finnhubIndustry}
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontFamily: "MyCustomFont, sans-serif" }}
        >
          <strong>Website:</strong>{" "}
          <a href={companyData.weburl}>{companyData.weburl}</a>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Summary;
