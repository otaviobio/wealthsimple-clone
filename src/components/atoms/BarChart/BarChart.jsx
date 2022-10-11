import { Chart, registerables } from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import './BarChart.scss'

export function BarChart() {
  Chart.register(...registerables);

  const [chart, setChart] = useState([])

  const baseUrl = "https://api.coinranking.com/v2/coins?limit=7&orderDirection=desc&tags[]=defi";
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiKey = "coinranking44cbeff766cb8fbf1778df7bdebc29504522322fa0af81e1";

  useEffect(() => {
    const fetchCoins = async () => {
      await fetch(`${proxyUrl}${baseUrl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${apiKey}`,
          'Access-Control-Allow-Origin': '*'
        }
      }).then((response) => {
        response.json().then((json) => {
          console.log(json)
          setChart(json.data)
        })
      }).catch((error) => {
        console.log(error)
      })
    }
    fetchCoins()
  }, [baseUrl, proxyUrl, apiKey])

  const labels = chart?.coins?.map(coin => coin.name);
  const prices = chart?.coins?.map(coin => coin.price);

  const data = () => {
    return {
      labels,
      datasets: [
        {
          data: prices,
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
        text: 'Your Cripto Portfolio',
      },
      legend: false,
    },
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

  return(
    <div className="chart">
      <Bar
        options={options}
        data={data()}
      />
    </div>
  );
}