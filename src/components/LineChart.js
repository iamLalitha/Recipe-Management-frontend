import 'chartjs-adapter-moment';
import React from 'react';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJs, TimeScale} from 'chart.js/auto';
ChartJs.register(TimeScale)


function LineChart({ labels, data }) {
  const chartData = {
    type:'line',
    labels: labels,
    datasets: [
      {
        label: 'Recipe Creation History',
        data: data,
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          // displayFormats: {
          //   day: 'MMM D',
          // },
        },
        title: {
          display: true,
          text: 'Creation Dates',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Recipes Created',
        },
      },
    },
  };

  return (
    <div>
      <h4>Your Recipe Creation History</h4>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}

export default LineChart;







