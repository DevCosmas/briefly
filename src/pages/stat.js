// function Stats({ data }) {
//   let totalClicks = data
//     .map((obj) => obj.visitationCount)
//     .reduce((acc, count) => acc + count, 0);
//   let avgClicks = totalClicks / data.length;
//   let avgClicksDec = avgClicks.toFixed(2);
//   let { visitationCount, newUrl } = data.reduce((prev, current) => {
//     return prev.visitationCount > current.visitationCount ? prev : current;
//   });
//   let leastVisited = data.reduce((prev, current) => {
//     return prev.visitationCount < current.visitationCount ? prev : current;
//   });

//   return (
//     <div className="stats-container">
//       <h2 className="stats-h2">Statistics</h2>
//       <ul className="click-list">
//         <span className="click-wrapper">
//           <span className="click-child">
//             <div className="cont-wrap">
//               <p>Total click</p>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke-width="1.5"
//                 stroke="currentColor"
//                 class="click-icon">
//                 <path
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5"
//                 />
//               </svg>
//             </div>
//           </span>
//           <li>{totalClicks}</li>
//         </span>
//         <span className="click-wrapper">
//           <span className="click-child">
//             <div className="cont-wrap">
//               <p>Avarage click</p>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke-width="1.5"
//                 stroke="currentColor"
//                 class="click-icon">
//                 <path
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5"
//                 />
//               </svg>
//             </div>
//           </span>

//           <li>{avgClicksDec}</li>
//         </span>
//       </ul>
//       <h3 className="mostVisited-h3">most visited Link</h3>
//       <span className="most-visited-child">
//         <p className="visited-link">{newUrl}</p>
//         <p>
//           {visitationCount} {visitationCount <= 1 ? 'click' : 'clicks'}
//         </p>
//       </span>
//       <h3 className="mostVisited-h3 leastVisited-h3">Least visited Link</h3>
//       <span className="most-visited-child">
//         <p className="visited-link">{leastVisited.newUrl}</p>
//         <p>
//           {leastVisited.visitationCount}{' '}
//           {leastVisited.visitationCount <= 1 ? 'click' : 'clicks'}{' '}
//         </p>
//       </span>
//     </div>
//   );
// }
// export default Stats;

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Stats({ data }) {
  console.log(data);
  let totalClicks = data
    .map((obj) => obj.visitationCount)
    .reduce((acc, count) => acc + count, 0);
  let avgClicks = totalClicks / data.length;
  let avgClicksDec = avgClicks.toFixed(2);
  let { visitationCount, newUrl } = data.reduce((prev, current) => {
    return prev.visitationCount > current.visitationCount ? prev : current;
  });
  let leastVisited = data.reduce((prev, current) => {
    return prev.visitationCount < current.visitationCount ? prev : current;
  });

  // Prepare data for bar chart
  const chartData = {
    labels: data.map((item) => item.newUrl),
    datasets: [
      {
        label: 'Clicks',
        data: data.map((item) => item.visitationCount),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="stats-container p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Statistics Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="stat-box bg-blue-50 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Total Clicks</h3>
          <p className="text-4xl font-bold text-blue-600">{totalClicks}</p>
        </div>

        <div className="stat-box bg-green-50 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Average Clicks</h3>
          <p className="text-4xl font-bold text-green-600">{avgClicksDec}</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-center mb-4">
          Clicks per URL
        </h3>
        <div className="chart-container">
          <Bar
            data={chartData}
            options={chartOptions}
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="most-visited bg-yellow-50 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Most Visited Link</h3>
          <p className="text-blue-600 font-semibold">{newUrl}</p>
          <p>
            {visitationCount} {visitationCount <= 1 ? 'click' : 'clicks'}
          </p>
        </div>

        <div className="least-visited bg-red-50 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Least Visited Link</h3>
          <p className="text-red-600 font-semibold">{leastVisited.newUrl}</p>
          <p>
            {leastVisited.visitationCount}{' '}
            {leastVisited.visitationCount <= 1 ? 'click' : 'clicks'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Stats;
