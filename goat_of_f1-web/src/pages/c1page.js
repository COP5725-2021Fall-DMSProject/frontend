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
    const [lapwiseRacewiseData, setlapwiseRacewiseData] = useState([{index: 0, l_lap_time_in_sec: 0.0,lewis_forename: '',lewis_surname: '',
    name: '', raceid: 0, someone_forename: '',someone_lap_time_in_sec: 0, someone_surname: '',year: 2000}])

    const startYear = 2015
    const endYear = 2017

    useEffect(() => {
        getCompetitiveDriversData();
        getLapwiseRacewiseComparisonData();
    }, [])

    const getCompetitiveDriversData = async () => {
        const competitiveUrl = settings.apiHostURL + '/c1/competitive-drivers'
        const response = await axios.get(competitiveUrl)
        setCompetitiveDrivers(response.data.result.data.drivers)
        console.log(response.data.result.data.drivers)
        setUpTheSelectDriver(0, response.data.result.data.drivers)
    }

    const setUpTheSelectDriver = async function(index, driverArr) {
        if(driverArr.length > 0) {
            getComparisonData(driverArr[index].driverid)
            getAgeWisePoints(driverArr[index].driverid)
        }
    }

    const getComparisonData = async function(driverid) {
        const compareUrl = settings.apiHostURL + `/c1/funcA/${driverid}`
        const response = await axios.get(compareUrl)
        // const fakeResponse = [
        // {forename: 'Nick',l_point:'101', name:'Monaco Grand Prix', raceid:'2', someone_points: '200', surname: 'Fury', year: '2009'}
        // ]
        // setRaceWiseData(fakeResponse)
        setRaceWiseData(response.data.result.data)
    }

    const getAgeWisePoints = async function(driverid){
        const ageWisePointsUrl = settings.apiHostURL + `/c1/funcB/${driverid}`
        const response = await axios.get(ageWisePointsUrl)
        // const fakeResponse = [
        // { name:'lewis', score: [32, 56, 45]},
        // { name:'driverX', score: [23, 34, 67]}
        // ];
        // setAgewisePoints(fakeResponse)
        setAgewisePoints(response.data.result.data)
    }
    
    const getLapwiseRacewiseComparisonData = async () => {
        // const lapCompareUrl = settings.apiHostURL + `/c1/funcC/${driverid}`
        // const response = await axios.get(lapCompareUrl)
        const fakeResponse = [{
            "index": 0, 
            "l_lap_time_in_sec": 981.1406896552, 
            "lewis_forename": "Lewis", 
            "lewis_surname": "Hamilton", 
            "name": "Australian Grand Prix", 
            "raceid": 18, 
            "someone_forename": "Nick", 
            "someone_lap_time_in_sec": 982.0851724138, 
            "someone_surname": "Heidfeld", 
            "year": 2008
          },
          {
            "index": 1, 
            "l_lap_time_in_sec": 1134.0756818182, 
            "lewis_forename": "Lewis", 
            "lewis_surname": "Hamilton", 
            "name": "Belgian Grand Prix", 
            "raceid": 30, 
            "someone_forename": "Nick", 
            "someone_lap_time_in_sec": 1133.8129545455, 
            "someone_surname": "Heidfeld", 
            "year": 2008
          }
    
    ]
        // console.log(response.data.result.data)
        setlapwiseRacewiseData(fakeResponse)
        // setlapwiseRacewiseData(response.data.result.data)
    }

    function generateCompetitiveDriversList(inputList) {
        const showAllItem = () => {
            return (
                <div 
                    className="list-item-container"
                    onClick={() => {setUpTheSelectDriver(0, competitiveDriversList)}}
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
                    onClick={() => {setUpTheSelectDriver(index, competitiveDriversList)}}
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
            y: {
                beginAtZero: true
              }
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
                <h4 className='title page-title' align='center'> Points Comparison (2015-2017)</h4>
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
            y: {
                beginAtZero: true
            }
            },
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
                <h4 className='title page-title' align='center'> Racewise Comparison</h4>
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
          y: {
              beginAtZero: true
            }
          },
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
          y: {
              beginAtZero: true
            }
          },
      };
  
  var raceLabel = lapwiseRacewiseData.map((element, _) => {
    return (element.raceid + "-" + element.name)
  })
  
  const data = {
      labels: raceLabel,
      datasets: [
        {
            label: lapwiseRacewiseData[0].lewis_forename + " " + lapwiseRacewiseData[0].lewis_surname,
            borderColor: getRegularColarList(0.7)[1],
            backgroundColor: getRegularColarList(0.7)[1],
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
                data: lapwiseRacewiseData.map((element, _) => element.someone_lap_time_in_sec),
            },
        ]
      };  
  
    return GroupedBar("Racewise Laptime Comparison", "", data, options)
  }


    return (
        <div>
            <Header/>
            <div style={{marginTop: 100}} className="main-block">
                <h2 className='title page-title' align='left'> Who's the next Lewis Hamilton? </h2>
            </div>
            <div style={{marginTop: 50}} className="main-block">

            </div>
            {generateCompetitiveDriversList(competitiveDriversList)}
            <div style={{marginTop: 50}} className="main-block">
                {ageWiseComparisonBarChart()}
                <div style={{marginTop: 50}} className="main-function-subcomponents">
                    {explainBoard(
                        "Points Comparison Explanation", 
                        [
                            "Lewis Points vs Selected Driver Points with following condition",
                            "1. First 3 career of the driver careers total points > W% Lewis's Points"
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
                        "Racewise Comparison Explanation", 
                        [
                            "Lewis vs Selected Driver",
                            "Compare the points between 2 drivers with conditions below:",
                            "1. Both attend to the race (map with raceID)",
                            "2. Both points cannot be 0",
                            "3. The Total Points have to be > K% Lewis's Points"
                        ]
                    )}
                </div>
            </div>
            <div style={{marginTop: 50}} className="main-block">
                {CompetitiveGroupedBarChart()}
                <div style={{marginTop: 50}} className="main-function-subcomponents">
                {explainBoard(
                    "Similarity Comparison", 
                    [
                        "Lewis vs Selected Driver according to the upper perspectives.",
                        "Summarize the Similarity."
                    ]
                )}
                </div>
            </div>
            <div style={{marginTop: 50}} className="main-block">
                {LapwiseRacewiseGroupedBarChart()}
                <div style={{marginTop: 50}} className="main-function-subcomponents">
                {explainBoard(
                    "Racewise Laptime Comparison", 
                    [
                        "Lewis vs Selected Driver according to the upper perspectives.",
                        "Summarize the lap time variations in every race."
                    ]
                )}
                </div>
            </div>
        </div>
    )

}

export default C1Page