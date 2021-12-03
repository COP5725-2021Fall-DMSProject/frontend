import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import settings from '../settings';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

// data format example
export const testData = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',
      ],
      borderWidth: 1,
    },
  ],
};

function PolarAreaChart(title, subTitle, inputData) {
  return (
    <div>
        <div className='header'>
            <h1 className='title' style={{fontFamily: settings.Font.secondary}}>{title}</h1>
            <div className='links' style={{fontFamily: settings.Font.major, fontSize: 20}}>
                {subTitle}
            </div>
        </div>
        <PolarArea data={inputData}/>
    </div>
   
  )
}


export default PolarAreaChart