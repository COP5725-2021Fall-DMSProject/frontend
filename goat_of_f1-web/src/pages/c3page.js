import React, { useState, useEffect } from "react";
import Header from '../component/header'
import settings from "../settings";
import axios from "axios";
import { randDarkColor, getRegularColarList } from '../utils/utils'
import HorizontalBar from "../component/horizontalBar";
import { Line } from "react-chartjs-2";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function C3Page() {
    const [topDefenders, setTopDefenders] = useState({name: [],driver_id: [],defend_point:[]});
    const [topDefensiveRecord, setTopDefensiveRecord] = useState({year:[], defender_id:[], defender_name :[], opponent_id:[],
      opponent_name:[], teammate_id :[], teammate_name :[], race_id :[], race_name :[], defend_point:[]});
    const [defenseRecordDetail, setDefenseRecordDetail] = useState({race_id:0,race_name:"",lap: [1],defender_name: "",defender_id : 0,
    defender_position : [],opponent_name: "",opponent_id : 0,opponent_position : [],teammate_name : "",teammate_id : 0,
    teammate_position : []  })

    useEffect(() => {
        getTopDefenders();
    }, [])

    const getTopDefenders = async () => {
      const topDefendersUrl = settings.apiHostURL + '/c3/top10defender'
      // const response = await axios.get(topDefendersUrl)
    const fakeResponse = {
      defend_point: [
        8687, 
        8132, 
        7412, 
        6732, 
        6338, 
        4788, 
        4669, 
        4554, 
        4433, 
        4232
      ], 
      driver_id: [
        13, 
        22, 
        18, 
        8, 
        14, 
        17, 
        15, 
        21, 
        3, 
        2
      ], 
      name: [
        "Felipe Massa", 
        "Rubens Barrichello", 
        "Jenson Button", 
        "Kimi R\u00e4ikk\u00f6nen", 
        "David Coulthard", 
        "Mark Webber", 
        "Jarno Trulli", 
        "Giancarlo Fisichella", 
        "Nico Rosberg", 
        "Nick Heidfeld"
      ]
    };
      // setTopDefenders(response.data.result.data)
      setTopDefenders(fakeResponse)
      // setUpTheSelectDriver(0, response.data.result.data)
      setUpTheSelectDriver(0, fakeResponse.name)
  }

  const setUpTheSelectDriver = async function(index, defenderArr) {
    if(defenderArr.length > 0) {
      getDefensiveRecord(defenderArr[index])
      getDefenseRecordDetail();
    }
}
  const getDefensiveRecord = async function(defender_id) {
    const topDefensiveUrl = settings.apiHostURL + `/c3/top10record/${defender_id}`
    // const response = await axios.get(topDefensiveUrl)
    const fakeResponse = {
      defend_point: [
        61, 
        58, 
        55, 
        54, 
        54, 
        51, 
        51, 
        50, 
        49, 
        48
      ], 
      defender_id: [
        13, 
        13, 
        13, 
        13, 
        13, 
        13, 
        13, 
        13, 
        13, 
        13
      ], 
      defender_name: [
        "Felipe Massa", 
        "Felipe Massa", 
        "Felipe Massa", 
        "Felipe Massa", 
        "Felipe Massa", 
        "Felipe Massa", 
        "Felipe Massa", 
        "Felipe Massa", 
        "Felipe Massa", 
        "Felipe Massa"
      ], 
      opponent_id: [
        808, 
        807, 
        16, 
        49, 
        3, 
        1, 
        8, 
        808, 
        17, 
        8
      ], 
      opponent_name: [
        "Vitaly Petrov", 
        "Nico H\u00fclkenberg", 
        "Adrian Sutil", 
        "Heinz-Harald Frentzen", 
        "Nico Rosberg", 
        "Lewis Hamilton", 
        "Kimi R\u00e4ikk\u00f6nen", 
        "Vitaly Petrov", 
        "Mark Webber", 
        "Kimi R\u00e4ikk\u00f6nen"
      ], 
      race_id: [
        348, 
        943, 
        341, 
        128, 
        870, 
        21, 
        876, 
        351, 
        6, 
        58
      ], 
      race_name: [
        "Hungarian Grand Prix", 
        "Mexican Grand Prix", 
        "Spanish Grand Prix", 
        "Spanish Grand Prix", 
        "Hungarian Grand Prix", 
        "Spanish Grand Prix", 
        "Indian Grand Prix", 
        "Singapore Grand Prix", 
        "Monaco Grand Prix", 
        "Spanish Grand Prix"
      ], 
      teammate_id: [
        4, 
        822, 
        4, 
        2, 
        4, 
        8, 
        4, 
        4, 
        8, 
        30
      ], 
      teammate_name: [
        "Fernando Alonso", 
        "Valtteri Bottas", 
        "Fernando Alonso", 
        "Nick Heidfeld", 
        "Fernando Alonso", 
        "Kimi R\u00e4ikk\u00f6nen", 
        "Fernando Alonso", 
        "Fernando Alonso", 
        "Kimi R\u00e4ikk\u00f6nen", 
        "Michael Schumacher"
      ], 
      year: [
        2010, 
        2015, 
        2010, 
        2002, 
        2012, 
        2008, 
        2012, 
        2010, 
        2009, 
        2006
      ]
}
      // setTopDefensiveRecord(response.data.result.data)
      setTopDefensiveRecord(fakeResponse)
      setUpTheSelectRace(0, fakeResponse.race_name, fakeResponse.defender_name, fakeResponse.opponent_name, fakeResponse.teammate_name)
  
  }

  const setUpTheSelectRace = async function(index, raceArr, defenderArr, opponentArr, teamMateArr) {
    console.log(index, raceArr[index], defenderArr[index], opponentArr[index], teamMateArr[index])
    if(raceArr.length > 0) {
      getDefenseRecordDetail(raceArr[index], defenderArr[index], opponentArr[index], teamMateArr[index])
    }
  }

  const getDefenseRecordDetail = async function(raceId, defenderId, opponentId, teammateId) {
    const defensiveDetailUrl = settings.apiHostURL + `/c3/recorddetail?race_id=${raceId}&defender_id=${defenderId}
    &opponent_id=${opponentId}&teammate_id=${teammateId}`
    // const response = await axios.get(defensiveDetailUrl)
    const fakeResponse = {
      race_id:123,
      race_name:"some race",
      lap: [15,16,17,18,19,20],
      defender_name: "Ryan",
      defender_id : 234,
      defender_position : [5,3,6,4,7,3],
      opponent_name: "Anmol",
      opponent_id : 456,
      opponent_position : [7,4,7,6,8,5],
      teammate_name : "YM",
      teammate_id : 789,
      teammate_position : [4,2,3,2,3,1]
  };
    // setDefenseRecordDetail(response.data.result.data)
    setDefenseRecordDetail(fakeResponse)
  }

    function PlotTopDefenders() {
      const options = {
        scales: {
          yAxes: {
            title: {
                display: true,
                text: "Player",
                font: {
                    size: 20
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
                text: "Defense Points",
                font: {
                    size: 20
                }
            }
          },
        },
      indexAxis: 'y',
    };

    const data = {
        labels: topDefenders.name,
        datasets: [
          {          
            label: 'Defensive points',
            data: topDefenders.defend_point,
            fill: false,
            backgroundColor: getRegularColarList(1)[3],
            borderColor: getRegularColarList(1)[3]
            },
          ],
        };
      
      return(
        <div className="c2-function-components">
            {HorizontalBar(`Top 10 Defenders`, ``, data, options)}
        </div>
    )
  }

  function generateDefensiveDriversList(inputList) {
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
                        primary="Top Defenders"
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
                        primary={element}
                    />
                </ListItem>
            </div>
        )
    });

    return (
        <div className="fixed-clickable-list">
            <List class="hide-scrollbar" style={{maxHeight: '100%', overflow: 'auto'}}>
                {showAllItem()}
                {listItem}
            </List>
        </div>
    )
}

function generateRacewiseDefenseList(inputRecord) {
  const showAllItem = () => {
      return (
          <div 
              className="list-item-container"
              onClick={() => {setUpTheSelectRace(0, inputRecord.race_name, inputRecord.defender_name, inputRecord.opponent_name, inputRecord.teammate_name)}}
          >
              <ListItem>
                  <ListItemText
                      disableTypography
                      sx={{ fontFamily: settings.Font.secondary + "!important", color: settings.Font.forthColor}}
                      key={0}
                      primary="Defensive Races"
                  />
              </ListItem>
          </div>
      )
  }
  const listItem = inputRecord.race_name.map((element, index) => {
      return(
          <div 
              className="list-item-container"
              onClick={() => {setUpTheSelectRace(index, inputRecord.race_name, inputRecord.defender_name,
                 inputRecord.opponent_name, inputRecord.teammate_name)}}
          >
              <ListItem>
                  <ListItemText
                      disableTypography
                      sx={{ fontFamily: settings.Font.secondary + "!important", color: settings.Font.forthColor}}
                      key={index}
                      primary={element}
                  />
              </ListItem>
          </div>
      )
  });

  return (
      <div className="fixed-clickable-list">
          <List class="hide-scrollbar" style={{maxHeight: '100%', overflow: 'auto'}}>
              {showAllItem()}
              {listItem}
          </List>
      </div>
  )
}

  function PlotTopDefensiveRecord() {
    const options = {
      scales: {
        yAxes: {
          title: {
              display: true,
              text: "Defense Points",
              font: {
                  size: 20
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
                  size: 20
              }
          }
      },
    }
  };
    var raceYearLabel = [];
    for(var i = 0; i < topDefensiveRecord.race_name.length; i++) {
      raceYearLabel.push(topDefensiveRecord.race_name[i] + " - (" + topDefensiveRecord.year[i] + ")")
    }
      const data = {
        labels: raceYearLabel,
        datasets: [
          {
            label: 'Defensive Track Record',
            data: topDefensiveRecord.defend_point,
            borderColor: randDarkColor(),
            fill: false,
            cubicInterpolationMode: 'monotone',
            tension: 0.4
          },
        ],
        };

        return(
        <div className="main-function-subcomponents">
          <div className='header'>
              <h4 className='title page-title' align='center'> Defensive Track Record</h4>
              <div className='links'>
              <a
                  className='btn btn-gh'
                  href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Line.js'
              >
              </a>
              </div>
          </div>
              <Line data={data}  options={options} />
          </div>
      )
    };

    function PlotDefenseRecordDetailLineChart() {
      const options = {
        scales: {
          yAxes: {
            title: {
                display: true,
                text: "Position",
                font: {
                    size: 20
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
                text: "Lap #",
                font: {
                    size: 20
                }
            }
        },
      }
      };
    
    const data = {
        labels: defenseRecordDetail.lap,
        datasets: [
          {
            type: 'line',
            label: defenseRecordDetail.defender_name,
            borderColor: randDarkColor(),
            borderWidth: 2,
            fill: false,
            data: defenseRecordDetail.defender_position,
          },
          {
            type: 'line',
            label: defenseRecordDetail.opponent_name,
            borderColor: randDarkColor(),
            borderWidth: 2,
            fill: false,
            data: defenseRecordDetail.opponent_position,
          },
          {
            type: 'line',
            label: defenseRecordDetail.teammate_name,
            borderColor: randDarkColor(),
            borderWidth: 2,
            fill: false,
            data: defenseRecordDetail.teammate_position,
          }
        ]
        };  
        return(
          <div className="c2-function-components">
              <div className='header'>
                  <h4 className='title page-title' align='center'> Defense Record Detail</h4>
                  <div className='links'>
                  <a
                      className='btn btn-gh'
                      href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Line.js'
                  >
                  </a>
                  </div>
              </div>
              <Line data={data} options={options} />
          </div>
      )
      
  }
  
  return(
    <div>
      <Header/>
      <div style={{marginTop: 100}} className="main-block">
        {PlotTopDefenders()}
      </div>
      <div style={{marginTop: 50}} className="main-block">
        {generateDefensiveDriversList(topDefenders.name)}
      </div>
      <div style={{marginTop: 50}} className="main-block">
        {PlotTopDefensiveRecord()}
      </div>
      <div style={{marginTop: 100}} className="main-block">
        {generateRacewiseDefenseList(topDefensiveRecord)}
      </div>
      <div style={{marginTop: 50}} className="main-block">
        {PlotDefenseRecordDetailLineChart()}
      </div>
    </div>
  )
}
      
export default C3Page;