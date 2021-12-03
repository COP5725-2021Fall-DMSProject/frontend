import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import settings from '../settings';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const defaultOptions = {}

// data format example
// export const testData = {
//   labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'],
//   datasets: [
//     {
//       label: '# of Votes',
//       data: [2, 9, 3, 5, 2, 3],
//       backgroundColor: 'rgba(255, 99, 132, 0.2)',
//       borderColor: 'rgba(255, 99, 132, 1)',
//       borderWidth: 1,
//     },
//     {
//       label: '# of ABC',
//       data: [5, 7, 6, 5, 2, 10],
//       backgroundColor: 'rgba(255, 100, 132, 0.3)',
//       borderColor: 'rgba(255, 99, 132, 1)',
//       borderWidth: 1,
//     },
//   ],
// };

function RadarChart(title, subTitle, inputData, options){
    return (
        <div>
            <div className='header'>
            <h1 className='title' style={{fontFamily: settings.Font.secondary}}>{title}</h1>
            <div className='links' style={{fontFamily: settings.Font.major, fontSize: 20}}>
                {subTitle}
            </div>
            </div>
            <Radar data={inputData} options={options ? options : defaultOptions}/>
        </div>
    )
}

export default RadarChart