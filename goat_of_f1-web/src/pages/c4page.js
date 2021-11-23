import React, { useState, useEffect } from "react";
import Header from '../component/header'
import VerticalBar from '../component/verticalBar'
import settings from "../settings";
import axios from "axios";
import { Radar } from "react-chartjs-2";

function C4Page() {
    const crashingDriversUrl = settings.apiHostURL + '/c4/crashing-driver-lists'
    const riskyDriverUrl = settings.apiHostURL + '/c4/funcA/3'

    const [riskyDriversStats, setRiskyDriversStats] = useState({})
    const [driverStats, setdriverStats] = useState({})

    useEffect(() => {
        getRiskyDrivers();
        getDriverStats();
    }, [])

    const getRiskyDrivers = async() => {
        const response = await axios.get(crashingDriversUrl)
        const fakeResponse = 
            {
                "aggressive": {"crashes": [2, 4], "driver_id": [888, 777], "name": ["Jim", "Ryan"], "points": [20, 20], "ratio": [10, 5]}, 
                "risky": {"crashes": [1, 2], "driver_id": [888, 777], "name": ["YM", "Anmol"], "points": [100, 100], "ratio": [0.01, 0.02]}, 
                "useless": {"crashes": [20, 20], "driver_id": [888, 777], "name": ["Jim", "Ryan"], "points": [5, 5], "ratio": [0, 0]},
            };
        
        setRiskyDriversStats(response.data.result.data)
        // setRiskyDriversStats(fakeResponse)
    }

    const getDriverStats = async() => {
      // console.log(driverStats)
      const response = await axios.get(riskyDriverUrl)
      const fakeResponse = {
        "name": "Nick Heidfeld",
        "driver_id" : 2,                     
        "year":[2015,2016,2017],
        "points":[30,40,45],
        "crash":[3,1,2]
      }
      setdriverStats(response.data.result.data)
      // setdriverStats(fakeResponse)
    }

    function driverStatistics() {
      const lables = driverStats.year
      const data = {
        labels: lables,
        datasets: [
        {
          label: driverStats.name,
          data: driverStats.points,
          borderColor: ['rgba(255, 99, 132, 1)',],
          backgroundColor: ['rgba(255, 99, 132, 0.2)',],
        },
      ]
      };
      const config = {
        type: 'radar',
        data: data,
        options: {
          responsive: true,
          scales: {
            yAxes: [{
              ticks: {
                min: 0,
              }
            }],
            xAxes: [{
              ticks: {
                min: 0,
              }
            }]
        },
          plugins: {
            title: {
              display: true,
              text: 'Chart.js Radar Chart'
            }
          },
        },
      };
      return(
        <div className="c2-function-components">
          <div className='header'>
            <h4 className='title page-title' align='center'>Points Comparison</h4>
            <div className='links'>
              <a
                className='btn btn-gh'
                href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Line.js'
              >
              </a>
            </div>
          </div>
          <Radar data={data} config={config} />
          </div>
      );
    };

    function driverCrashStatistics() {
      const lables = driverStats.year
      const data = {
        labels: lables,
        datasets: [
        {
          label: driverStats.name,
          data: driverStats.crash,
          borderColor: ['rgba(54, 162, 235, 1)',],
          backgroundColor: ['rgba(54, 162, 235, 0.2)',],
        },
      ]
      };
      const config = {
        type: 'radar',
        data: data,
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Chart.js Radar Chart'
            }
          }
        },
      };
      return(
        <div className="c2-function-components">
          <div className='header'>
            <h4 className='title page-title' align='center'>Crash Comparison</h4>
            <div className='links'>
              <a
                className='btn btn-gh'
                href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Line.js'
              >
              </a>
            </div>
          </div>
          <Radar data={data} config={config} />
          </div>
      );
    };

    function riskyDriverStatistics() {
        console.log(riskyDriversStats)
        const aggressiveData = {
            labels: riskyDriversStats.aggressive.name,
            datasets: [
              {
                label: 'Aggressive performers',
                data: riskyDriversStats.aggressive.points,
                fill: false,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    ],
                borderWidth: 1,
                beginAtZero: true,
              }
            ],
          };
        
          const riskyData = {
            labels: riskyDriversStats.risky.name,
            datasets: [
              {
                label: 'Risky performers',
                data: riskyDriversStats.risky.points,
                fill: false,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    ],
                borderWidth: 1,
                beginAtZero: true,
              }
            ],
          };

          const uselessData = {
            labels: riskyDriversStats.useless.name,
            datasets: [
              {
                label: 'Bad performers',
                data: riskyDriversStats.useless.points,
                fill: false,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    ],
                borderWidth: 1,
                beginAtZero: true,
              }
            ],
          };
          return(
            <div className="c2-function-components">
                {VerticalBar(`Aggressive Driver Stats`, `Aggressive Drivers`, aggressiveData, null)}
                <div style={{height: 50}}/>
                {VerticalBar(`Risky Driver Stats`, `Risky Drivers`, riskyData, null)}
                <div style={{height: 50}}/>
                {VerticalBar(`Crazy Driver Stats`, `Crazy Drivers`, uselessData, null)}
            </div>
        )

          };
    
            return(
              <div>
              <Header/>
              <div className="main-block">
              <div>
              {Object.keys(driverStats).length > 0 ? driverStatistics() : null}
              </div>
              <div>
              {Object.keys(driverStats).length > 0 ? driverCrashStatistics() : null}
              </div>
              <div style={{height: 50}}/>
                {Object.keys(riskyDriversStats).length > 0 ? riskyDriverStatistics() : null}
              </div>
              </div>
          );
    }

export default C4Page