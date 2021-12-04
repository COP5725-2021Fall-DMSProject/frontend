import React, { useState, useEffect} from "react";
import Header from '../component/header'
import { Bar, Line, Chart } from 'react-chartjs-2';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import settings from "../settings";
import "../App.css";
import axios from "axios";  
import { randDarkColor, getRegularColarList } from '../utils/utils'
import GroupedBar from "../component/groupBar";
import explainBoard from '../component/explainBoard'

function C1Page() {
    const [competitiveDriversList, setCompetitiveDrivers] = useState([{driverId: '',name:''}]);
    const [raceWiseData, setRaceWiseData] = useState([{forename: '',l_point:'', name:'', raceid:'', someone_points: '', surname: '', year: ''}]);
    const [ageWisePoints, setAgewisePoints] = useState([{name:'', score:[]}]);
    const [lapwiseRacewiseData, setlapwiseRacewiseData] = useState([{
        "index": 0, 
        "l_lap_time_in_sec": 0, 
        "lewis_forename": "Lewis", 
        "lewis_surname": "Hamilton", 
        "name": "", 
        "raceid": 0, 
        "someone_forename": "", 
        "someone_lap_time_in_sec": 0, 
        "someone_surname": "", 
        "year": 0
      }])

    useEffect(() => {
        getCompetitiveDriversData();
    }, [])

    const getCompetitiveDriversData = async () => {
        const competitiveUrl = settings.apiHostURL + '/c1/competitive-drivers'
        const response = await axios.get(competitiveUrl)
        setCompetitiveDrivers(response.data.result.data.drivers)
        setUpTheSelectDriver(0, response.data.result.data.drivers)
    }

    const setUpTheSelectDriver = async function(index, driverArr) {
        if(driverArr.length > 0) {
            getComparisonData(driverArr[index].driverid)
            getAgeWisePoints(driverArr[index].driverid)
            getLapwiseRacewiseComparisonData(driverArr[index].driverid)
        }
    }

    const getComparisonData = async function(driverid) {
        const compareUrl = settings.apiHostURL + `/c1/funcA/${driverid}`
        const response = await axios.get(compareUrl)
        setRaceWiseData(response.data.result.data)
    }

    const getAgeWisePoints = async function(driverid){
        const ageWisePointsUrl = settings.apiHostURL + `/c1/funcB/${driverid}`
        const response = await axios.get(ageWisePointsUrl)
        setAgewisePoints(response.data.result.data)
    }
    
    const getLapwiseRacewiseComparisonData = async function(driverid) {
        const lapCompareUrl = settings.apiHostURL + `/c1/funcC/${driverid}`
        const response = await axios.get(lapCompareUrl)
        setlapwiseRacewiseData(response.data.result.data)
    }

    function generateCompetitiveDriversList(inputList) {
        const showAllItem = () => {
            return (
                <div 
                    className="list-item-container"
                    onClick={() => {setUpTheSelectDriver(0, inputList)}}
                >
                    <ListItem>
                        <ListItemText
                            disableTypography
                            sx={{ fontFamily: settings.Font.secondary + "!important", color: settings.Font.forthColor}}
                            key={0}
                            primary="ALL"
                        />
                    </ListItem>
                </div>
            )
        }
        const listItem = inputList.map((element, index) => {
            return(
                <div 
                    className="list-item-container"
                    onClick={() => {setUpTheSelectDriver(index, inputList)}}
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
                    {showAllItem()}
                    {listItem}
                </List>
            </div>
        )
    }

  function ageWiseComparisonBarChart() {
    const options = {
        scales: {
            yAxes: {
              title: {
                  display: true,
                  text: "Total Points",
                  font: {
                      size: 16
                  },
              },
              beginAtZero: true
            },
            xAxes: {
              title: {
                  display: true,
                  text: "First 3 Career Year",
                  font: {
                      size: 16
                  }
              }
          },
        } 
        };
    
    var yearLabel = []
    for(var i = 1; i <= 3; i++) {
       yearLabel.push(`Career Year ${i}`)
    }

    const data = {
        labels: yearLabel,
        datasets: 
            ageWisePoints.map((element, index) => {
            return({
                label: element.name,
                data: element.score,
                fill: false,
                backgroundColor: getRegularColarList(1)[index],
                borderColor: getRegularColarList(1)[index]
              })
            })    
        };
    
    return(
        <div className="main-function-subcomponents">
            <div className='header'>
                <h2 className='title page-title' align='center'> Graph A - Points Comparison (First 3 Career)</h2>
                <div className='links'>
                <a
                    className='btn btn-gh'
                    href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Line.js'
                >
                </a>
                </div>
            </div>
            <Bar data={data} options={options} />
        </div>
    )
}

function raceWiseComparisonLineChart() {
    const options = {
        scales: {
            yAxes: {
              title: {
                  display: true,
                  text: "Points",
                  font: {
                      size: 16
                  },
              },
              beginAtZero: true
            },
            xAxes: {
              title: {
                  display: true,
                  text: "Grand Prix (Race)",
                  font: {
                      size: 16
                  }
              }
          },
        } 
    };

    var raceIdLabel = raceWiseData.map((element, _) => {
    return (element.year +" "+ element.name + ` (${element.raceid})`)
    })

    const racewiseData = {
        labels: raceIdLabel,
        datasets: [
            {
                type: 'line',
                label: 'Lewis',
                borderColor: getRegularColarList(1)[0],
                borderWidth: 2,
                fill: false,
                data: raceWiseData.map((element, _) => {
                    let maxRacePoint = 25
                    return element.l_point > maxRacePoint ? maxRacePoint : element.l_point
                }),
            },
            {
                type: 'line',
                label: raceWiseData[0].forename,
                borderColor: getRegularColarList(1)[1],
                borderWidth: 2,
                fill: false,
                data: raceWiseData.map((element, _) => {
                    let maxRacePoint = 25
                    return element.someone_points > maxRacePoint ? maxRacePoint : element.someone_points
                }),
            }
        ]
    };  

    return(
        <div style={{width: window ? window.innerWidth *0.8 : 1500}}>
            <div className='header'>
                <h2 className='title page-title' align='center'> Graph B - Racewise Comparison</h2>
                <div className='links'>
                <a
                    className='btn btn-gh'
                    href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Line.js'
                >
                </a>
                </div>
            </div>
            <Line data={racewiseData} options={options} />
        </div>
    )

}

function CompetitiveGroupedBarChart() {
    const options = {
        scales: {
            yAxes: {
              title: {
                  display: true,
                  text: "Avarage Similarity (1.0 = 100%)",
                  font: {
                      size: 16
                  },
              },
              beginAtZero: true
            },
            xAxes: {
              title: {
                  display: true,
                  text: "Drivers",
                  font: {
                      size: 16
                  }
              }
          },
        } 
      };
  
  var driverLabel = competitiveDriversList.map((element, _) => {
    return (element.name)
  })
  
  const data = {
      labels: driverLabel,
      datasets: [
            {
                label: 'Comparison with Lewis',
                borderColor: getRegularColarList(0.7)[1],
                backgroundColor: getRegularColarList(0.7)[1],
                borderWidth: 2,
                fill: false,
                data: competitiveDriversList.map((element, _) => {
                    let maxSimilarity = 1
                    let value = element.total_similarity_with_lewis
                    return value > maxSimilarity ? maxSimilarity : value
                }),
            },
        ]
      };  
  
    return GroupedBar("Similarity Comparison", "", data, options)
  }

  function LapwiseRacewiseGroupedBarChart() {
    const options = {
        scales: {
            yAxes: {
              title: {
                  display: true,
                  text: "Total Lap Time (sec)",
                  font: {
                      size: 16
                  },
              },
              ticks: {
                  precision: 0
              },
              beginAtZero: true
            },
            xAxes: {
              title: {
                  display: true,
                  text: "Race",
                  font: {
                      size: 16
                  }
              }
          },
        } 
      };
  
    var raceLabel = lapwiseRacewiseData.map((element, _) => {
        return (element.raceid + "-" + element.name)
    })
  
    const data = {
        labels: raceLabel,
        datasets: [
            {
                label: lapwiseRacewiseData[0].lewis_forename + " " + lapwiseRacewiseData[0].lewis_surname,
                borderColor: getRegularColarList(0.7)[0],
                backgroundColor: getRegularColarList(0.7)[0],
                borderWidth: 2,
                fill: false,
                data: lapwiseRacewiseData.map((element, _) => element.l_lap_time_in_sec),
            },
            {
                label: lapwiseRacewiseData[0].someone_forename + " " + lapwiseRacewiseData[0].someone_surname,
                borderColor: getRegularColarList(0.7)[1],
                backgroundColor: getRegularColarList(0.7)[1],
                borderWidth: 2,
                fill: false,
                data: lapwiseRacewiseData.map((element, _) => element.someone_lap_time_in_sec)
            }
        ]};  
    
    return (
        <div style={{
            width: window ? Math.max(1500, window.innerWidth) : 2000,
            height: 400 
        }}>
            {GroupedBar("Racewise Laptime Comparison", "", data, options)}
        </div>
    )
  }


    return (
        <div>
            <Header/>
            <div style={{marginTop: 100}} className="main-block">
                <h1 className='title page-title' align='left'> Who's the next Lewis Hamilton? </h1>
                <div style={{marginTop: 50}} className="main-function-subcomponents">
                    {explainBoard(
                        "Choose the top 10 most similar Drivers", 
                        [
                            "The result is outcome from the combination of Graph A, B, and C"
                        ]
                    )}
                </div>
            </div>
            {generateCompetitiveDriversList(competitiveDriversList)}
            <div style={{marginTop: 50}} className="main-block">
                {CompetitiveGroupedBarChart()}
                <div style={{marginTop: 50}} className="main-function-subcomponents">
                {explainBoard(
                    "Similarity Comparison", 
                    [
                        "1. Graph A - Points Comparison Explanation",
                        "2. Graph B - Racewise Comparison Explanation",
                        "3. Graph C - Racewise LapTime Comparison" 
                    ]
                )}
                </div>
            </div>
            <div style={{marginTop: 50}} className="main-block">
                {ageWiseComparisonBarChart()}
                <div style={{marginTop: 50}} className="main-function-subcomponents">
                    {explainBoard(
                        "Graph A - Points Comparison Explanation", 
                        [
                            "1. X = First 3 career of the driver careers points",
                            "2. Y = First 3 career of Lewis's Points",
                            "Result: Sub Similarity = X / Y Ratio"
                        ]
                    )}
                </div>
            </div>
            <div style={{marginTop: 50, overflowX: 'scroll'}} className="main-block">
                {raceWiseComparisonLineChart()}
            </div>
            <div style={{marginTop: 50}} className="sub-block">
                <div className="main-function-subcomponents">
                    {explainBoard(
                        "Graph B - Racewise Comparison Explanation", 
                        [
                            "Lewis vs Selected Driver",
                            "Compare the points between 2 drivers with conditions below:",
                            "1. Both attend to the race (map with raceID)",
                            "2. Both points cannot be 0",
                            "3. Order in Ascending order according to year and raceId",
                            "---------",
                            "X = Total points of Selected Driver",
                            "Y = Total points of Lewis's",
                            "Result: Sub Similarity = X / Y Ratio"
                        ]
                    )}
                </div>
            </div>
            <div style={{marginTop: 50, overflowX: 'scroll'}} className="main-block">
                {LapwiseRacewiseGroupedBarChart()}
            </div>
            <div style={{marginTop: 50}} className="sub-block">
                <div className="main-function-subcomponents">
                    {explainBoard(
                    "Graph C - Racewise LapTime Comparison", 
                    [
                        "Lewis vs Selected Driver",
                        "Compare the drivers lap time with Lewis in the same lap count",
                        "1. Must finished the same lap count",
                        "2. Lap count will effect the car's and driver's condition",
                        "---------",
                        "X = Total LapTime race of Selected Driver",
                        "Y = Total LapTime race of Lewis's",
                        "Result: Sub Similarity = X / Y Ratio"
                    ]
                )}
                </div>
            </div>
        </div>
    )

}

export default C1Page