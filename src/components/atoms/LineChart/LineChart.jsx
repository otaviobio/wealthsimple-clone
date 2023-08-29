import { Chart, registerables } from "chart.js";
import { useRef } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "./LineChart.scss";

export function LineChart({ coinId, lineColor, labels, prices }) {
  Chart.register(...registerables);

  // this is a function needed for adding gradient below the line in a dataset
  const gradientChart = (context) => {
    const ctx = context.chart.ctx;
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "rgba(58,123,213,1)");
    gradient.addColorStop(1, "rgba(0,210,255,0.3)");
    return gradient;
  };

  const data = () => {
    return {
      labels,
      datasets: [
        {
          label: "Bitcoin sales",
          data: prices,
          fill: false,
          backgroundColor: gradientChart,
          borderColor: lineColor,
          pointBackgroundColor: "#ececec",
          // gives it more rounded points
          // tension: 0.3,
          beginFrom: 0,
        },
      ],
    };
  };

  // this is needed to add a delayed animation for each point on the first time that the dataset is rendered.
  // It is the "animation" option.
  // The options with "radius" on them change the dots on each dataset.
  let delayed;

  const options = {
    responsive: true,
    radius: 0,
    hitRadius: 0,
    hoverRadius: 0,
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === "data" && context.mode === "default" && !delayed) {
          delay = context.dataIndex * 10 + context.datasetIndex * 80;
        }
        return delay;
      },
    },
    plugins: {
      title: {
        // display: true,
        text: "B!O Chart",
      },
      legend: false,
      tooltip: false,
      chartAreaBorder: false,
    },
    scales: {
      y: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      x: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
    showXLabels: 10,
  };
  const chartRef = useRef(null);

  return (
    <div className="line-chart">
      <Line id={coinId} ref={chartRef} options={options} data={data()} />
    </div>
  );
}
