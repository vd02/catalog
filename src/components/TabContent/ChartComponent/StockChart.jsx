import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Chart, registerables } from 'chart.js';
import fullscreenIcon from '../../assets/svg/fullscreen.svg';
import compareIcon from '../../assets/svg/compare.svg';
import './StockChart.css';

Chart.register(...registerables);

const StockChart = ({ data, duration, onDurationChange }) => {
  const [fullscreen, setFullscreen] = useState(false);
  const [activeDuration, setActiveDuration] = useState(duration); // Set initial duration based on prop
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [hoverPrice, setHoverPrice] = useState(null);
  const [hoverY, setHoverY] = useState(null);
  const latestPrice = data.length ? data[data.length - 1].price : null;
  const containerRef = useRef(null);

  useEffect(() => {
    setActiveDuration(duration); // Update active duration if the prop changes
  }, [duration]);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    const volumeScale = 0.0000004; // Set volume scaling factor to make bars smaller

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(75, 64, 238, 0.35)');
    gradient.addColorStop(1, 'rgba(75, 64, 238, 0)');

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map((item) => item.date),
        datasets: [
          {
            type: 'line',
            label: 'Price',
            data: data.map((item) => item.price),
            borderColor: '#4b40ee',
            backgroundColor: gradient,
            borderWidth: 2,
            fill: true,
            pointRadius: 0, // Remove points on the area chart
            yAxisID: 'y',
          },
          {
            type: 'bar',
            label: 'Volume',
            data: data.map((item) => item.volume * volumeScale), // Scale volume data
            backgroundColor: '#E6E8EB',
            barThickness: 'flex',
            yAxisID: 'y',
          },
        ],
      },
      options: {
        scales: {
          x: {
            display: false, // Hide X-axis markings
          },
          y: {
            type: 'linear',
            display: false, // Hide Y-axis markings for price
            position: 'left',
            beginAtZero: true,
            grid: {
              drawOnChartArea: false, // Prevent grid lines from showing
            },
          },
        },
        plugins: {
          tooltip: {
            enabled: false,
            external: function (context) {
              const tooltipModel = context.tooltip;
              if (tooltipModel.opacity === 0) {
                setHoverPrice(null);
                return;
              }

              const index = tooltipModel.dataPoints[0].dataIndex;
              const price = context.chart.data.datasets[0].data[index].toFixed(2);
              const y = context.chart.scales.y.getPixelForValue(price);

              setHoverPrice(price);
              setHoverY(y);
            },
            mode: 'index', // Ensure tooltip shows on hover over both area chart and volume bars
            intersect: false,
          },
        },
        interaction: {
          mode: 'index',
          intersect: false,
        },
      },
    });

    // Ensure persistent tooltip is shown as soon as the chart loads
    if (latestPrice !== null && chartInstance.current) {
      const y = chartInstance.current.scales.y.getPixelForValue(latestPrice.toFixed(2));
      setHoverPrice(latestPrice.toFixed(2));
      setHoverY(y);
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, latestPrice]);

  const toggleFullscreen = () => {
    if (!fullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.mozRequestFullScreen) { /* Firefox */
        containerRef.current.mozRequestFullScreen();
      } else if (containerRef.current.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        containerRef.current.webkitRequestFullscreen();
      } else if (containerRef.current.msRequestFullscreen) { /* IE/Edge */
        containerRef.current.msRequestFullscreen();
      }
    } else {
      if (document?.exitFullscreen) {
        document?.exitFullscreen();
      } else if (document?.mozCancelFullScreen) { /* Firefox */
        document?.mozCancelFullScreen();
      } else if (document?.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document?.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE/Edge */
        document?.msExitFullscreen();
      }
    }
    setFullscreen(!fullscreen);
  };

  const handleDurationChange = useCallback(
    (newDuration) => {
      setActiveDuration(newDuration);
      onDurationChange(newDuration);
    },
    [onDurationChange]
  );

  return (
    <div ref={containerRef} className={`stock-chart ${fullscreen ? 'fullscreen' : ''}`}>
      <div className="chart-controls">
        <div className="left-controls">
          <button onClick={toggleFullscreen}>
            <img src={fullscreenIcon} alt="Fullscreen" />
            {fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
          <button onClick={() => alert('Compare functionality coming soon!')}>
            <img src={compareIcon} alt="Compare" />
            Compare
          </button>
        </div>
        <div className="right-controls duration-controls">
          {['1d', '3d', '1w', '1m', '6m', '1y', 'max'].map((d) => (
            <button
              key={d}
              className={`duration-button ${activeDuration === d ? 'active' : ''}`}
              onClick={() => handleDurationChange(d)}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="chart-container">
        <canvas ref={chartRef} />
        {latestPrice !== null && chartInstance.current && (
          <div
            className="persistent-tooltip"
            style={{ top: `${chartInstance.current.scales.y.getPixelForValue(latestPrice.toFixed(2))}px` }}
          >
            <p>{`${latestPrice.toFixed(2)}`}</p>
          </div>
        )}
        {hoverPrice !== null && (
          <div className="custom-tooltip" style={{ top: `${hoverY}px` }}>
            <p>{`${hoverPrice}`}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockChart;
