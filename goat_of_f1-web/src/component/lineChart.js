import React from 'react';
import { Line } from 'react-chartjs-2';
import settings from '../settings';

const defaultOptions = {
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

function LineChart(title, subTitle, data, options){
    return (
        <div>
            <div className='header'>
                <h1 className='title' style={{fontFamily: settings.Font.secondary}}>{title}</h1>
                <div className='links' style={{fontFamily: settings.Font.major, fontSize: 20}}>
                    {subTitle}
                </div>
            </div>
            <Line data={data} options={options? options : defaultOptions} />
        </div>
    );
}

export default LineChart;