import React, { useState, useEffect } from "react";
import Header from '../component/header'
import VerticalBar from '../component/verticalBar'
import settings from "../settings";
import explainBoard from '../component/explainBoard'
import axios from "axios";
import { Radar } from "react-chartjs-2";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function C4Page() {
    const crashingDriversUrl = settings.apiHostURL + '/c4/crashing-driver-lists'
    const riskyDriverUrl = settings.apiHostURL + '/c4/funcA/3'

    const [riskyDriversList, setRiskyDrivers] = useState([{driverId: '',name:''}]);
    const [aggressiveDriversList, setAggressiveDrivers] = useState([{driverId: '',name:''}]);
    const [riskyDriversStats, setRiskyDriversStats] = useState({})
    const [driverStats, setDriverStats] = useState({})

    useEffect(() => {
        getRiskyDrivers();
    }, [])

    const setUpTheSelectDriver = async function(index, driverArr) {
      if(driverArr.length > 0) {
        getDriverStats(driverArr[index].driverId)
      }
    }

    const createDriversObjList = (inputList) => {
      let driversObjList = []
      for (let i = 0; i < inputList.driver_id.length; i++) {
        driversObjList.push({
          'driverId': inputList.driver_id[i],
          'name': inputList.name[i]
        })
      }
      return driversObjList
    }

    const getRiskyDrivers = async() => {
        const crashingDriversUrl = settings.apiHostURL + '/c4/crashing-driver-lists'
        const response = await axios.get(crashingDriversUrl)
        
        setRiskyDriversStats(response.data.result.data)
        let riskyDriversObjList = createDriversObjList(response.data.result.data.risky)
        setRiskyDrivers(riskyDriversObjList)
        let aggressiveDriverObjList = createDriversObjList(response.data.result.data.aggressive)
        setAggressiveDrivers(aggressiveDriverObjList)
        getDriverStats(aggressiveDriverObjList[0].driverId);
    }

    const getDriverStats = async(driverId) => {
      const riskyDriverUrl = settings.apiHostURL + `/c4/funcA/${driverId}`
      const response = await axios.get(riskyDriverUrl)
      setDriverStats(response.data.result.data)
    }

    const radarOptions = {
      scales: {
        r: {
          beginAtZero: true,
          min:  0,
          max:  10, 
        },
      },
    };
    
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
      
      return(
        <div className="main-function-subcomponents">
          <div className='header'>
            <h2 className='title page-title' align='center'>Year-wise # of Points</h2>
            <div className='links'>
              <a
                className='btn btn-gh'
                href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Line.js'
              >
              </a>
            </div>
          </div>
          <Radar data={data} option={radarOptions} />
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

      return(
        <div className="main-function-subcomponents">
          <div className='header'>
            <h2 className='title page-title' align='center'>Year-wise # of Crash</h2>
            <div className='links'>
              <a
                className='btn btn-gh'
                href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Line.js'
              >
              </a>
            </div>
          </div>
          <Radar data={data} option={radarOptions} />
          </div>
      );
    };

    function riskyDriverStatistics() {
        const aggressiveData = {
            labels: riskyDriversStats.aggressive.name,
            datasets: [
              {
                label: 'Aggressive performers',
                data: riskyDriversStats.aggressive.ratio,
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
                data: riskyDriversStats.risky.ratio,
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

          const uselessRatioArray = riskyDriversStats.useless.ratio
          var maxRisk = Math.max.apply(Math, uselessRatioArray)
          for (var i=0; i< uselessRatioArray.length;i++) {
            uselessRatioArray[i] = maxRisk - uselessRatioArray[i]
          }

          const uselessData = {
            labels: riskyDriversStats.useless.name,
            datasets: [
              {
                label: 'Bad performers',
                data: riskyDriversStats.useless.ratio,
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
          
          const riskyDriverOptions = {
            scales: {
                yAxes: {
                  title: {
                      display: true,
                      text: "Crash / Points",
                      font: {
                        size: 16,
                      },
                  },
                  beginAtZero: true
                }
              }
          };

          const aggressiveDriverOptions = {
            scales: {
                yAxes: {
                  title: {
                      display: true,
                      text: "Points / Crash",
                      font: {
                        size: 16,
                      },
                  },
                  beginAtZero: true
                }
              }
          };

          const crazyDriverOptions = {
            scales: {
                yAxes: {
                  title: {
                      display: true,
                      text: "Points / Crash",
                      font: {
                        size: 16,
                      },
                  },
                  beginAtZero: true
                }
              }
          };
    
          return(
            <div className="main-function-subcomponents">
                {VerticalBar(`Risky Driver Stats`, `Risky Drivers`, riskyData, riskyDriverOptions)}
                <div style={{marginTop: 50}} className="main-function-subcomponents">
                    {explainBoard(
                        "Graph A - Top Risky Driver", 
                        [
                            "[Crash / Points Ratio] in  Descending Order",
                            "1. Driver's with crash record and points record",
                            "2. Points > 10 over his career, or else driver will belong to crazy"
                        ]
                    )}
                </div>
                <div style={{height: 50}}/>
                {VerticalBar(`Aggressive Driver Stats`, `Aggressive Drivers`, aggressiveData, aggressiveDriverOptions)}
                <div style={{marginTop: 50}} className="main-function-subcomponents">
                    {explainBoard(
                        "Graph B - Top Aggressive Driver",
                        [
                          "[Points / Crash Ratio] in Descending Order",
                          "1. Driver's with crash record and points record"
                        ]
                    )}
                </div>
                <div style={{height: 50}}/>
                {VerticalBar(`Crazy Driver Stats`, `Crazy Drivers`, uselessData, crazyDriverOptions)}
            </div>
          )
        }
        
        function generateDriversList(inputRiskyList, inputAggressiveList) {
            const riskyListItem = inputRiskyList.map((element, index) => {
                return(
                    <div 
                        className="list-item-container"
                        onClick={() => {setUpTheSelectDriver(index, inputRiskyList)}}
                    >
                        <ListItem>
                            <ListItemText
                                disableTypography
                                sx={{ fontFamily: settings.Font.secondary + "!important", color: settings.Font.forthColor}}
                                key={index}
                                primary={element.name.toUpperCase()}
                            />
                        </ListItem>
                    </div>
                )
            })

            const aggressiveListItem = inputAggressiveList.map((element, index) => {
              return(
                  <div 
                      className="list-item-container"
                      onClick={() => {setUpTheSelectDriver(index, inputAggressiveList)}}
                  >
                      <ListItem>
                          <ListItemText
                              disableTypography
                              sx={{ fontFamily: settings.Font.secondary + "!important", color: settings.Font.forthColor}}
                              key={index}
                              primary={element.name.toUpperCase()}
                          />
                      </ListItem>
                  </div>
              )
            })
    
            return (
                <div className="fixed-clickable-list">
                    <List class="hide-scrollbar" style={{maxHeight: '100%', overflow: 'auto'}}>
                        <h2 style={{marginTop: 15, fontFamily: settings.Font.secondary}}> Risky </h2>
                        {riskyListItem}
                        <h2 style={{marginTop: 50, fontFamily: settings.Font.secondary}}> Aggressive </h2>
                        {aggressiveListItem}
                    </List>
                </div>
            )
        }

        return(
            <div>
              <Header/>
              <div style={{marginTop: 100}} className="main-block">
                <h1 className='title page-title' align='left'> Risky Driver? Aggressive Driver? Crazy Driver? </h1>
                <div style={{marginTop: 50}} className="main-function-subcomponents">
                    {explainBoard(
                        "Driver who has crash records", 
                        [
                            "Wha is Crash Records?",
                            " - Retire from race causing Driver (crash, accident)",
                            "-------",
                            "1. Graph A Risky Driver",
                            "   - Toxic to the team, low score point with multiple crash record",
                            "2. Graph B Aggressive Driver",
                            "   - Aggressive driver with great driving skill",
                            "3. Graph C Crazy Driver",
                            "   - There talent was born to crash"
                        ]
                    )}
                </div>
              </div>
              {generateDriversList(riskyDriversList, aggressiveDriversList)}
              <div style={{marginTop: 50}} className="main-block">
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                  <div style={{ paddingRight: 35, borderRight: "solid 6px #d0d0d2" }}>
                    {Object.keys(driverStats).length > 0 ? driverStatistics() : null}
                  </div>
                  <div style={{ paddingLeft: 35 }}>
                    {Object.keys(driverStats).length > 0 ? driverCrashStatistics() : null}
                  </div>
                </div>
                <div style={{marginTop: 50}} className="main-function-subcomponents">
                    {explainBoard(
                        "Select Target Driver from the Driver List", 
                        [
                            "Left: YearWise Number of Points ",
                            "Right: YearWise Number of Crashs"
                        ]
                    )}
                </div>
              </div>
              <div style={{marginTop: 50}} className="main-block">
                {Object.keys(riskyDriversStats).length > 0 ? riskyDriverStatistics() : null}
                <div style={{marginTop: 50}} className="main-function-subcomponents">
                    {explainBoard(
                        "Graph C - Crazy Drivers", 
                        [
                          "[Points / Crash Ratio] in Descending Order",
                          "1. Drivers who earn very less points (<10 points) but with over 3 crashes"
                        ]
                    )}
                </div>
              </div>
              <div style={{marginTop: 100}}/>
            </div>
          );
      }

export default C4Page