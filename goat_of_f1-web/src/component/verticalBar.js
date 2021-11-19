import React from 'react';
import { Bar } from 'react-chartjs-2';

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
            <h1 className='title'>{title}</h1>
            <div className='links'>
                {subTitle}
            </div>
            </div>
            <Bar data={data} options={options ? options : defaultOptions} />
        </div>
    )
}

export default VerticalBar;