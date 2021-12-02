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
    const [topDefenders, setTopDefenders] = useState([{name: [],driver_id: [],defend_point:[]}]);
    const [topDefensiveRecord, setTopDefensiveRecord] = useState([{year:[],defender_id:[],defender_name : [],opponent_id : [],
      opponent_name : [],teammate_id : [],teammate_name : [],race_id : [],race_name : [],defend_point : []}]);
    const [defenseRecordDetail, setDefenseRecordDetail] = useState([])

    useEffect(() => {
        getTopDefenders();
        // getDefensiveRecord();
        getDefenseRecordDetail();
    }, [])

    const getTopDefenders = async () => {
      const topDefendersUrl = settings.apiHostURL + '/c3/top10defender'
      // const response = await axios.get(topDefendersUrl)
      const fakeResponse = {
        name: ["Elon Musk", "Nick Young","Ryan Kelly"],
        driver_id: [750, 999,487],
        defend_point: [321, 300,200]
    };
      // setTopDefenders(response.data.result.data)
      setTopDefenders(fakeResponse)
      // setUpTheSelectDriver(0, response.data.result.data)
      setUpTheSelectDriver(0, fakeResponse.name)
  }

  const setUpTheSelectDriver = async function(index, defenderArr) {
    if(defenderArr.length > 0) {
      getDefensiveRecord(defenderArr[index])
    }
}

  const getDefensiveRecord = async function(defender_id) {
    const topDefensiveUrl = settings.apiHostURL + `/c3/top10record/${defender_id}`
    // const response = await axios.get(topDefensiveUrl)
    const fakeResponse = {       
      year:[2015,2016,2017,2018, 2019],
      defender_id:["a", "b", "c", "d", "e"],
      defender_name : ["AAA", "BBB", "CCC", "DDD", "EEE"],
      opponent_id : [234, 567, 891, 246, 423],
      opponent_name : ["aaaa", 'bbbb', 'cccc', 'dddd', 'eeee'],
      teammate_id : [1, 2, 3, 4, 5],
      teammate_name : ["nnnn", "oooo", "pppp", "qqqq", "rrrr"],
      race_id : [222, 333, 444, 555, 666],
      race_name : ["first", "second", "third", "fourth", "fifth"],
      defend_point : [2, 6, 12, 5, 9],
      }
      // setTopDefensiveRecord(response.data.result.data)
      setTopDefensiveRecord(fakeResponse)
  
  }

  const getDefenseRecordDetail = async () => {
    // const defensiveDetailUrl = settings.apiHostURL + '/c3/recorddetail?race_id=&defender_id=&opponent_id=&teammate_id='
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
                onClick={() => {setUpTheSelectDriver(0, topDefensiveRecord.name)}}
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
    const listItem = inputList.forEach((element, index) => {
        return(
            <div 
                className="list-item-container"
                onClick={() => {setUpTheSelectDriver(index, topDefenders.name)}}
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
              text: "Year",
              font: {
                  size: 20
              }
          }
      },
    }
      };
      const data = {
        labels: topDefensiveRecord.year,
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
          <div className="c2-function-components">
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
        <div style={{
          marginTop: 100,
          marginLeft: 100,
          display: 'flex',
          flexDirection: 'column'
      }}>
      <div style={{height: 100}}/>
        {PlotTopDefenders()}
      </div>
        <div style={{
          marginTop: 100,
          marginLeft: 100,
          display: 'flex',
          flexDirection: 'column'
      }}>
      <div style={{height: 100}}/>
        {console.log(topDefenders)}
        {/* {(topDefenders != null && topDefenders.name.length) ? generateDefensiveDriversList(topDefenders.name) : null} */}
      </div>
      <div style={{
          marginTop: 100,
          marginLeft: 100,
          display: 'flex',
          flexDirection: 'column'
      }}>
      <div style={{height: 100}}/>
        {PlotTopDefensiveRecord()}
      </div>
      <div style={{
          marginTop: 100,
          marginLeft: 100,
          display: 'flex',
          flexDirection: 'column'
      }}>
      <div style={{height: 100}}/>
        {PlotDefenseRecordDetailLineChart()}
      </div>
      </div>
      )
}
      
export default C3Page;