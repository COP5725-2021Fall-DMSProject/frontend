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
import explainBoard from '../component/explainBoard'

function C3Page() {
    const [topDefenders, setTopDefenders] = useState({name: [],driver_id: [],defend_point:[]});
    const [topDefensiveRecord, setTopDefensiveRecord] = useState({year:[], defender_id:[], defender_name :[], opponent_id:[],
      opponent_name:[], teammate_id :[], teammate_name :[], race_id :[], race_name :[], defend_point:[]});
    const [defenseRecordDetail, setDefenseRecordDetail] = useState({})
    const [driverList, setDriverList] = useState([{driverId: '', name: ''}]);
    const [raceInfoList, setRaceInfoList] = useState([{raceId: '', name: ''}]);

    const [selectDriverName, setSelectedDriverName] = useState('')
    const [selectRaceName, setSelectRaceName] = useState('')

    useEffect(() => {
        getTopDefenders()
    }, [])

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

    const createRaceObjList = (inputList) => {
      let raceObjList = []
      for (let i = 0; i < inputList.race_id.length; i++) {
        let namePrefix = inputList.race_name[i].split(" ")[0]
        raceObjList.push({
          'raceId': inputList.race_id[i],
          'name': inputList.year[i] + " " + namePrefix
        })
      }
      return raceObjList
    }

    const getTopDefenders = async () => {
      const topDefendersUrl = settings.apiHostURL + '/c3/top10defender'
      const response = await axios.get(topDefendersUrl)

      setTopDefenders(response.data.result.data)
      let driversObjList = createDriversObjList(response.data.result.data)
      setDriverList(createDriversObjList(response.data.result.data))
      getDefensiveRecord(driversObjList[0].driverId);
      setSelectedDriverName(driversObjList[0].name);
    }

    const setUpTheSelectDriver = async function(index, defenderArr) {
      if(defenderArr.length > 0) {
        getDefensiveRecord(defenderArr[index].driverId)
        setSelectedDriverName(defenderArr[index].name);
      }
    }

    const getDefensiveRecord = async function(defender_id) {
      const topDefensiveUrl = settings.apiHostURL + `/c3/top10record/${defender_id}`
      const response = await axios.get(topDefensiveUrl)
      const responseData = response.data.result.data

      setTopDefensiveRecord(responseData)

      let raceObjList = createRaceObjList(responseData)
      setRaceInfoList(raceObjList)
      setUpTheSelectRace(0, responseData.race_id, responseData.defender_id, responseData.opponent_id, responseData.teammate_id)
    }

  const setUpTheSelectRace = async function(index, raceArr, defenderArr, opponentArr, teamMateArr) {
    if(raceArr != null && raceArr.length > 0) {
      setSelectRaceName(raceInfoList[index].name)
      getDefenseRecordDetail(raceArr[index], defenderArr[index], opponentArr[index], teamMateArr[index])
    }
  }

  const getDefenseRecordDetail = async function(raceId, defenderId, opponentId, teammateId) {
    const defensiveDetailUrl = settings.apiHostURL + `/c3/recorddetail?race_id=${raceId}&defender_id=${defenderId}
    &opponent_id=${opponentId}&teammate_id=${teammateId}`
    const response = await axios.get(defensiveDetailUrl)
    setDefenseRecordDetail(response.data.result.data)
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
        <div className="clickable-list">
            <List class="hide-scrollbar" style={{maxHeight: '100%', overflow: 'auto'}}>
                {listItem}
            </List>
        </div>
    )
  }

  function generateRaceWiseDefenseList(inputList, inputRecord) {
    const listItem = inputList.map((element, index) => {
        return(
            <div 
                className="list-item-container"
                onClick={() => {setUpTheSelectRace(index, inputRecord.race_id, inputRecord.defender_id,
                  inputRecord.opponent_id, inputRecord.teammate_id)}}
            >
                <ListItem>
                    <ListItemText
                        disableTypography
                        sx={{fontFamily: settings.Font.secondary + "!important", color: settings.Font.forthColor}}
                        key={index}
                        primary={element.name}
                    />
                </ListItem>
            </div>
        )
    });

    return (
        <div className="clickable-list">
            <List class="hide-scrollbar" style={{maxHeight: '100%', overflow: 'auto'}}>
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
      raceYearLabel.push(topDefensiveRecord.year[i] + " " + topDefensiveRecord.race_name[i])
    }
      const data = {
        labels: raceYearLabel,
          datasets: [
            {
              label: 'RaceWise Defensive Points',
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
              <h4 className='title page-title' align='center'> {`[${selectDriverName}]'s Top 10 Defensive Race Record`} </h4>
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
            label: `(Defenser) ${defenseRecordDetail.defender_name}`,
            borderColor: getRegularColarList(1)[0],
            borderWidth: 2,
            fill: false,
            data: defenseRecordDetail.defender_position,
          },
          {
            type: 'line',
            label: `(Opponent) ${defenseRecordDetail.opponent_name}`,
            borderColor: getRegularColarList(1)[1],
            borderWidth: 2,
            fill: false,
            data: defenseRecordDetail.opponent_position,
          },
          {
            type: 'line',
            label: `(Teammate) ${defenseRecordDetail.teammate_name}`,
            borderColor: getRegularColarList(1)[3],
            borderWidth: 2,
            fill: false,
            data: defenseRecordDetail.teammate_position,
          }
        ]
        };  
        return(
          <div className="c2-function-components">
              <div className='header'>
                  <h4 className='title page-title' align='center'> {`[${selectDriverName}]'s LapWise Defense on [${selectRaceName}]`}</h4>
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
      <div>
        <div className="clickable-list-container">
          <div>
            <h2 style={{fontFamily: settings.Font.secondary, marginBottom: 10}}> Select Defender </h2>
            {generateDefensiveDriversList(driverList)}
          </div>
          <div style={{marginTop: 20}}>
            <h2 style={{fontFamily: settings.Font.secondary, marginBottom: 10}}> Select Race </h2>
            {generateRaceWiseDefenseList(raceInfoList, topDefensiveRecord)}
          </div>
        </div>

        <div >
          <div style={{marginTop: 100}} className="main-block">
            <h1 className='title page-title' align='left'> Which driver is good at defending? </h1>
            <div style={{marginTop: 50}} className="main-function-subcomponents">
                    {explainBoard(
                        "Defender", 
                        [
                          "Legendary drivers usually sacrifice for the team to block others for teammate.",
                          "Evaluate the defending effort by the conditions below",
                          "(1) Consecutively block the same opponent more than 4 + X lap.",
                          "(2) At the meanwhile, Teammates must be above the defender.",
                          "==> Get X points",
                        ]
                    )}
                </div>
          </div>
          <div style={{marginTop: 50}} className="main-block">
            {PlotTopDefenders()}
          </div>
          <div style={{marginTop: 50}} className="main-block">
            {PlotTopDefensiveRecord()}
          </div>
          <div style={{marginTop: 50}} className="main-block">
            {Object.keys(defenseRecordDetail).length > 0 ? PlotDefenseRecordDetailLineChart() : null}
          </div>
        </div>
        <div style={{marginTop: 50}}/>
      </div>
    </div>
  )
}
      
export default C3Page;