import React from 'react';
import { Bar } from 'react-chartjs-2';
import settings from '../settings';

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

function VerticalBar(title, subTitle, data, options){
    return (
        <div>
            <div className='header'>
            <h1 className='title' style={{fontFamily: settings.Font.secondary}}>{title}</h1>
            <div className='links' style={{fontFamily: settings.Font.major, fontSize: 20}}>
                {subTitle}
            </div>
            </div>
            <Bar data={data} options={options ? options : defaultOptions} />
        </div>
    )
}

export default VerticalBar;