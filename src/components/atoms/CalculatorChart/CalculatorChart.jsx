import { Chart, registerables } from 'chart.js';
import { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

import './CalculatorChart.scss'

export function CalculatorChart({base, projection, labels}) {
  Chart.register(...registerables);
  
  // this is a function needed for adding gradient below the line in a dataset
  const gradientChart = (context) => {
    const ctx = context.chart.ctx;
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "#ea8000");
    gradient.addColorStop(0.1, "#ffb65e");
    gradient.addColorStop(0.25, "#ffcb8c");
    gradient.addColorStop(0.5, "#ffead1");
    gradient.addColorStop(1, "#fff5e8");
    return gradient;
  }
  
  const data = () => {
    return {
      labels,
      datasets: [
        {
          data: base,
          fill: false,
          borderColor: "#000",
          pointBackgroundColor: "#ececec",
          borderDash: [8, 4],
          borderWidth: 0.7,
          // segment: {
          //   borderDash: ctx => dash(ctx, [8, 4]) || [6, 0],
          // },
        },
        {
          // label: "Bitcoin sales",
          data: projection,
          fill: "start",
          backgroundColor: gradientChart,
          borderColor: "transparent",
          pointBackgroundColor: "#ececec",
          beginFrom: 0,
        },
      ]
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
          if (context.type === 'data' && context.mode === 'default' && !delayed) {
            delay = context.dataIndex * 10 + context.datasetIndex * 80;
          }
          return delay;
        },
      },
      plugins: {
        title: {
          // display: true,
          text: 'B!O Chart',
        },
        legend: false,
        tooltip: false,
        chartAreaBorder: false,
      },
      scales: {
        y: {
          ticks: {
            display: false
          },
          grid: {
            display: false
          },
        },
        x: {
          ticks: {
            // display: false
          },
          grid: {
            display: false
          }
        },
      },
    }
    const chartRef = useRef(null)
    
    return(
      <div className="line-chart">
      <Line
        ref={chartRef}
        options={options}
        data={data()}
        />
    </div>
  );
}

/*

    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return "$" + value + "k";
          },
        },
      },
    },
  }

  */