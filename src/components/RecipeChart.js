// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Bar } from 'react-chartjs-2';
// import { API_BASE_URL } from '../config';

// function RecipeChart() {
//   const [chartData, setChartData] = useState({});

//   useEffect(() => {
//     axios
//       .get(`${API_BASE_URL}/recipe-stats`)
//       .then(response => {
//         const data = response.data;

//         // Process the data and set it to chartData
//         const labels = data.map(item => item._id);
//         const counts = data.map(item => item.count);

//         setChartData({
//           labels: labels,
//           datasets: [
//             {
//               label: 'Recipe Counts',
//               data: counts,
//               backgroundColor: 'rgba(75, 192, 192, 0.2)',
//               borderColor: 'rgba(75, 192, 192, 1)',
//               borderWidth: 1,
//             },
//           ],
//         });
//       })
//       .catch(error => {
//         console.error('Error fetching recipe statistics:', error);
//       });
//   }, []); // Empty dependency array, so the effect runs only once

//   return (
//     <div>
//       <h2>Recipe Statistics</h2>
//       <Bar data={chartData} options={{ responsive: true }} />
//     </div>
//   );
// }

// export default RecipeChart;

