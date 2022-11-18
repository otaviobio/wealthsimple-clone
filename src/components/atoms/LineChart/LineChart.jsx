import { Chart, registerables } from 'chart.js';
import { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

import './LineChart.scss'

export function LineChart({coinId, lineColor}) {
  Chart.register(...registerables);
  
  // this is a function needed for adding gradient below the line in a dataset
  const gradientChart = (context) => {
    const ctx = context.chart.ctx;
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "rgba(58,123,213,1)");
    gradient.addColorStop(1, "rgba(0,210,255,0.3)");
    return gradient;
  }

  const [chart, setChart] = useState([])
  const baseUrl = `https://api.coinranking.com/v2/coin/${coinId}/history?timePeriod=24h`;
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiKey = "coinranking44cbeff766cb8fbf1778df7bdebc29504522322fa0af81e1";
  const test1 = document.getElementById('line')

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

  const labels = chart?.history?.map(coin => {
    let date = new Date(coin.timestamp * 1000);
    return date.toLocaleDateString("en-CA", {day: '2-digit', month: 'short'})
  });

  const prices = chart?.history?.map(coin => coin.price);

  
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
        }
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
            display: false
          },
          grid: {
            display: false
          }
        },
      },
      showXLabels: 10,
    }
    const chartRef = useRef(null)
    // let test = Chart.getChart("line");
    // if(test != undefined) {
    //   test.destroy()
    // }
    
    return(
      <div className="line-chart">
      <Line
        id={coinId}
        ref={chartRef}
        options={options}
        data={data()}
        />
    </div>
  );
}

/*

const data = () => {
  return {
    labels,
    datasets: [
      {
        label: "Bitcoin sales",
        data: prices,
        // data: [60, 75, 73, 60, 49, 56, 57, 49, 37, 25, 29, 37],
        fill: "start",
        backgroundColor: gradientChart,
        borderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#ececec",
        // gives it more rounded points
        // tension: 0.3,
        beginFrom: 0,
      }
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
    hitRadius: 20,
    hoverRadius: 8,
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
      <div className="line-chart">
      <Line
        options={options}
        data={data()}
        />
    </div>

  */