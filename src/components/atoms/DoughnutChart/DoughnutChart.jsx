import { Chart, registerables } from 'chart.js';
import { useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';

import './DoughnutChart.scss'
import 'chart.js/auto';

export function DoughnutChart({test, chartValues}) {
  Chart.register(...registerables);

  const labels = [
    "Personal",
    "Crypto",
    "Stocks",
  ]; 

  const data = () => {

    return {
      labels,
      datasets: [
        {
          label: "Portfolio",
          data: chartValues,
          backgroundColor: [
            // 'rgba(116,39,116,0.75)',
            'rgba(58,123,213,0.75)',
            'rgb(255, 205, 86, 0.75)',
            'rgba(0,210,255,0.75)'
          ],
          borderColor: [
            // 'rgba(116,39,116,1)',
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
        display: false,
        text: 'Assets Percentage',
      },
      labels: {
        render: (args) => `$${args.value}`,
        fontSize: 14,
      }
    },
  }
  const chartRef = useRef(null)

  return(
    <div className="doughnut-chart">
      <Doughnut
        id={test}
        ref={chartRef}
        options={options}
        data={data()}
      />
    </div>
  );
}