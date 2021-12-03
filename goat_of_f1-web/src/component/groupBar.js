import { SubTitle } from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

// const testdata = {
//   labels: ['1', '2', '3', '4', '5', '6'],
//   datasets: [
//     {
//       label: '# of Blue Votes',
//       data: [2, 3, 20, 5, 1, 4],
//       backgroundColor: 'rgb(54, 162, 235)',
//       stack: 'Stack 0',
//     },
//     {
//       label: '# of Green Votes',
//       data: [3, 10, 13, 15, 22, 30],
//       backgroundColor: 'rgb(75, 192, 192)',
//       stack: 'Stack 1',
//     },
//     {
//         label: 'Errors',
//         data: [12, 19, 3, 5, 2, 3],
//         backgroundColor: 'rgb(255, 99, 132)',
//         stack: 'Stack 2',
//     },
//   ],
// };

const defaultOptions = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

function GroupedBar(title, subTitle, data, options){
    return (
        <div>
            <div className='header'>
                <h2 className='title page-title' align='center'>{title}</h2>
                <div className='links'>
                    <a
                    className='btn btn-gh'
                    href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/GroupedBar.js'
                    >
                    {subTitle}
                    </a>
                </div>
            </div>
            <Bar data={data} options={options ? options : defaultOptions} />
        </div>
    )
}

export default GroupedBar