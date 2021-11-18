import React, { useState, useEffect } from "react";
import Header from '../component/header'
import settings from "../settings";
import axios from "axios";
import { Line } from 'react-chartjs-2';

function C3Page() {
    const [lapWisePosition, setLapWisePosition] = useState([{ lap: 0, positionA: 0, positionB: 0}])
    // const [constructorList, setConstructorList] = useState([{constructorId: '', name:''}])

    useEffect(() => {
        getLapWisePosition();
        // getContructorList();
    }, [])
    
    const getLapWisePosition = async () => {
        // const response = await axios.get(lapWisePositionUrl)
        const fakeResponse = [
            { lap: 0, positionA: 2, positionB: 4 },
            { lap: 5, positionA: 5, positionB: 6 },
            { lap: 10, positionA: 3, positionB: 5 },
            { lap: 15, positionA: 4, positionB: 3 },
            { lap: 20, positionA: 6, positionB: 4 },
          ];
        // setLapWisePosition(response.data)
        setLapWisePosition(fakeResponse)
    }
    const data = {
        labels: lapWisePosition.map((element) => element.lap
        ),
        datasets: [
          {
            label: 'DriverA',
            data: lapWisePosition.map((element) => element.positionA),
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
            beginAtZero: true,
          },
          {
            label: 'DriverB',
            data: lapWisePosition.map((element) => element.positionB),
            fill: false,
            backgroundColor: 'rgb(54, 162, 235)',
            borderColor: 'rgba(54, 162, 235, 0.2)',
            beginAtZero: true,
          },
        ],
      };
      
      const options = {
        scales: {
            y: {
                beginAtZero: true
              }
            }
      };
      
      return(
        <>
        <Header/>
          <div className='header'>
            <h1 className='title'>Line Chart</h1>
            <div className='links'>
              <a
                className='btn btn-gh'
                href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Line.js'
              >
              </a>
            </div>
          </div>
          <Line data={data} options={options} />
        </>
      );
}
      
export default C3Page;