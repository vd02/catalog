import React from "react";
import "./Price.css";
import LoadingSpinner from "../LoadingSpinner";

const Price = ({ data }) => {
  // console.log(data);
  if (!data || data.length < 2) return <LoadingSpinner />;
  // console.log(data);

  const latestPrice = data[0];
  const previousPrice = data[1];
  const priceChange = latestPrice.price - previousPrice.price;
  const percentChange = ((priceChange / previousPrice.price) * 100).toFixed(2);

  const priceChangeClass = priceChange >= 0 ? "positive" : "negative";

  return (
    <div className="Price">
      <div className="PriceDetails">
        <div className="PriceAmount">{latestPrice.price.toFixed(2)}</div>
        <div className="Usd">USD</div>
      </div>
      <div className={`PriceChange ${priceChangeClass}`}>
        {priceChange >= 0 ? "+" : ""}
        {priceChange.toFixed(2)} ({percentChange}%)
      </div>
    </div>
  );
};

export default Price;
