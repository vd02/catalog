import React from "react";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import "./Settings.css"; // Import the CSS file for styling

const Settings = ({ selectedSymbol, onSelectSymbol }) => {
  const stockOptions = [
    { label: "Apple", symbol: "AAPL" },
    { label: "Microsoft", symbol: "MSFT" },
    { label: "NVIDIA", symbol: "NVDA" },
    { label: "Alphabet", symbol: "GOOG" },
    { label: "Amazon", symbol: "AMZN" },
    { label: "Meta", symbol: "META" },
  ];

  return (
    <div className="settings-container">
      <h3 className="settings-title">Select a stock:</h3>
      <Select
        placeholder="Choose one…"
        size="lg"
        variant="plain"
        value={selectedSymbol}
        onChange={(event, newValue) => onSelectSymbol(newValue)}
        sx={{
          fontFamily: "MyCustomFont", // Applying the custom font
        }}
      >
        {stockOptions.map((stock) => (
          <Option key={stock.symbol} value={stock.symbol}>
            {stock.label}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default Settings;
