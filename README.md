# Stock Market Dashboard

## Link to use the Dashboard: https://catalog-stock-dashboard.netlify.app/

![Screenshot (54)](https://github.com/user-attachments/assets/a5b18f29-e64f-465e-bce7-b6f3fdd0779c)

Welcome to the Stock Market Dashboard! This guide will help you understand how to use and navigate the dashboard effectively. Whether you're a beginner or an experienced investor, this tool provides valuable insights into the stock market.

## Overview
The Stock Market Dashboard is a comprehensive tool built using React and Joy UI, designed to offer real-time financial data and analysis. It leverages powerful APIs to bring you up-to-date information on stock prices, market trends, and financial statistics.

## Key Features
Real-Time Stock Prices: Get live updates on stock prices with visual indicators showing price increases (green) and decreases (red).
Summary: A quick overview of the selected stock.
Chart: Interactive area chart with duration controls, full-screen mode, and tooltips.
Statistics: Key financial statistics like 10-day average trading volume, 52-week high and low, beta, etc.
Analysis: Latest news related to the selected stock.
Settings: Easily switch between 6 top NASDAQ listed companies.

## Technologies Used
### Frontend:
React with Joy UI
### APIs:
Finnhub Stock API for summary, analysis, and statistics.
Alpha Vantage for chart data.
### Charting Library:
Chart.js for flexible and interactive stock charts.

## Usage

### Real-Time Price
The dashboard displays the current stock price of the selected company. The price change is visually indicated with green (positive) or red (negative) colors.

### Tabs
#### Summary

![image](https://github.com/user-attachments/assets/4cb66d14-0215-41e3-a123-53f5ed7fbb49)


Provides a brief overview of the selected stock.
Data fetched from Finnhub Stock API.

#### Chart

![Screenshot (56)](https://github.com/user-attachments/assets/635ec36f-13dc-4aa2-9bf7-011c018c2b78)


Interactive area chart with buttons to control the duration (e.g., '1d', '3d', '1w', '1m', '6m', '1y', 'max').
Full-screen mode available for detailed viewing.
Tooltips show the price at the hovered point and the current price.
Options to remove volume chart, price chart, or both.

#### Statistics

![image](https://github.com/user-attachments/assets/5e36e159-5987-454d-8d28-ff28d284387c)

Displays key statistics such as:
10-Day Average Trading Volume
52-Week High and Low
52-Week Low Date
52-Week Price Return Daily
Beta
Data fetched from Finnhub Stock API.

#### Analysis

![image](https://github.com/user-attachments/assets/1085e68c-a26a-41b1-b558-1e816078e13c)

Shows the top 3 latest news articles related to the selected stock.
Data fetched from Finnhub Stock API.

#### Settings

![Screenshot (55)](https://github.com/user-attachments/assets/8df1e352-0b91-4705-aa8b-e0a61ffea12e)

Select the stock from a list of 6 top NASDAQ listed companies:
Apple (AAPL)
Microsoft (MSFT)
NVIDIA (NVDA)
Alphabet (GOOG)
Amazon (AMZN)
Meta (META)
