import React, { useState, useEffect } from "react";
import Header from '../component/header'
import VerticalBar from '../component/verticalBar'

function C4Page() {
    const [riskyDriversStats, setRiskyDriversStats] = useState({})

    useEffect(() => {
        getRiskyDrivers();
    }, [])

    const getRiskyDrivers = async() => {
        // const response = await axios.get(lapWisePositionUrl)
        const fakeResponse = 
            {
                "aggressive": {"crashes": [2, 4], "driver_id": [888, 777], "name": ["Jim", "Ryan"], "points": [20, 20], "ratio": [10, 5]}, 
                "risky": {"crashes": [1, 2], "driver_id": [888, 777], "name": ["YM", "Anmol"], "points": [100, 100], "ratio": [0.01, 0.02]}, 
                "useless": {"crashes": [20, 20], "driver_id": [888, 777], "name": ["Jim", "Ryan"], "points": [0, 0], "ratio": [0, 0]},
            };
        
        // setLapWisePosition(response.data)
        setRiskyDriversStats(fakeResponse)
    }

    function riskyDriverStatistics() {
        console.log(riskyDriversStats)
        const aggressiveData = {
            labels: riskyDriversStats.aggressive.name,
            datasets: [
              {
                label: riskyDriversStats.aggressive.name,
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
                label: riskyDriversStats.risky.name,
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
                label: riskyDriversStats.useless.name,
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
                <div style={{height: 50}}>
                {riskyDriversStats ? riskyDriverStatistics() : null}
                </div>
          );
    }

export default C4Page