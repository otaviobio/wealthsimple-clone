import { Chart, registerables } from 'chart.js';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

import './DoughnutChart.scss'

export function DoughnutChart() {
  Chart.register(...registerables);

  const labels = [
    "Cash",
    "Cryptocurrency",
    "Stocks",
    "Bonds"
  ];

  const percentages = [40, 25, 30, 5];

  const data = () => {
    return {
      labels,
      datasets: [
        {
          label: "Portfolio",
          data: percentages,
          backgroundColor: [
            'rgba(116,39,116,0.85)',
            'rgba(58,123,213,0.85)',
            'rgb(255, 205, 86, 0.85)',
            'rgba(0,210,255,0.85)'
          ],
          borderColor: [
            'rgba(116,39,116,1)',
            'rgba(58,123,213,1)',
            'rgba(255, 205, 86, 1)',
            'rgba(0,210,255,1)'
          ],
          borderWidth: 2,
        }
      ]
    };
  };

  let delayed;
  
  const options = {
    responsive: true,
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === 'data' && context.mode === 'default' && !delayed) {
          delay = context.dataIndex * 300 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Assets Percentage',
      },
    },
  }

  return(
    <div className="doughnutChart">
      <Doughnut
        options={options}
        data={data()}
      />
    </div>
  );
}