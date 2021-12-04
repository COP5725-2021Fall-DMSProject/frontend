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
    defender_position : [],opponent_name: "",opponent_id : 0, opponent_position : [],teammate_name : "",teammate_id : 0,
    teammate_position : []  })

    const [driverList, setDriverList] = useState([{driverId: '',name:''}]);
    const [raceInfoList, setRaceInfoList] = useState([{driverId: '',name:''}]);

    useEffect(() => {
        getTopDefenders();
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

    const getTopDefenders = async () => {
      const topDefendersUrl = settings.apiHostURL + '/c3/top10defender'
      const response = await axios.get(topDefendersUrl)

      setTopDefenders(response.data.result.data)
      let driversObjList = createDriversObjList(response.data.result.data)
      console.log(driversObjList)
      setDriverList(driversObjList)
      // setUpTheSelectDriver(0, response.data.result.data.name)
    }

    const setUpTheSelectDriver = async function(index, defenderArr) {
      if(defenderArr.length > 0) {
        getDefensiveRecord(defenderArr[index])
        getDefenseRecordDetail();
      }
    }

    const getDefensiveRecord = async function(defender_id) {
      const topDefensiveUrl = settings.apiHostURL + `/c3/top10record/${defender_id}`
      const response = await axios.get(topDefensiveUrl)
      const fakeResponse = response.data.result.data
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
    console.log(inputList)
    const listItem = inputList.map((element, index) => {
        return(
            <div 
                className="list-item-container"
                // onClick={() => {setUpTheSelectDriver(index, inputList)}}
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

function generateRacewiseDefenseList(inputRecord) {
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
      <div>
        <div className="clickable-list-container">
          <div>
            <h2 style={{fontFamily: settings.Font.secondary, marginBottom: 10}}> Select Defender </h2>
            {generateDefensiveDriversList(driverList)}
          </div>
          <div style={{marginTop: 20}}>
            <h2 style={{fontFamily: settings.Font.secondary, marginBottom: 10}}> Select Race </h2>
            {generateRacewiseDefenseList(topDefensiveRecord)}
          </div>
        </div>

        <div >
          <div style={{marginTop: 100}} className="main-block">
            <h1 className='title page-title' align='left'> Which driver is good at defending? </h1>
          </div>
          <div style={{marginTop: 50}} className="main-block">
            {PlotTopDefenders()}
          </div>
          <div style={{marginTop: 50}} className="main-block">
            {PlotTopDefensiveRecord()}
          </div>
          <div style={{marginTop: 50}} className="main-block">
            {PlotDefenseRecordDetailLineChart()}
          </div>
        </div>

      </div>
    </div>
  )
}
      
export default C3Page;