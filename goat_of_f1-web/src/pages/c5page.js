import React, { useState, useEffect } from "react";
import Header from '../component/header'
import settings from "../settings";
import axios from "axios";
import { randDarkColor, getRegularColarList } from '../utils/utils'
import VerticalBar from "../component/verticalBar";
import GroupBar from '../component/groupBar'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import explainBoard from '../component/explainBoard'

function C5Page() {
    const [topSpoilers, setTopSpoilers] = useState({driver_id : [],driver_name : [],position_diff : [],race_cnt : []});
    const [topSpoilerDetail, setTopSpoilerDetail] = useState({year:[],race_id:[],race_name: [],driver_name: "",
    driver_id:0,qualifying_position:[],result_position:[],position_diff:[]});

    useEffect(() => {
        getTopSpoilers();
    }, [])

    const getTopSpoilers = async () => {
        const topSpoilersUrl = settings.apiHostURL + '/c5/top10spoiler'
        const response = await axios.get(topSpoilersUrl)
        setTopSpoilers(response.data.result.data)
        setUpTheSelectDriver(0, response.data.result.data.driver_id)
    }

    const setUpTheSelectDriver = async function(index, spoilerArr) {
        if(spoilerArr.length > 0) {
          getSpoilerRecordDetail(spoilerArr[index]);
        }
    }

    const getSpoilerRecordDetail = async function(spoilerId) {
        console.log(spoilerId)
        const spoilerDetailUrl = settings.apiHostURL + `/c5/spoilerrecord/${spoilerId}`
        const response = await axios.get(spoilerDetailUrl)
        setTopSpoilerDetail(response.data.result.data)
    }

    function PlotTopSpoiler() {
        const options = {
          scales: {
            yAxes: {
              title: {
                  display: true,
                  text: "Spoiler Points",
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
                  text: "Player",
                  font: {
                      size: 20
                  }
              }
            },
          },
        indexAxis: 'y',
      };
  
      const data = {
          labels: topSpoilers.driver_name,
          datasets: [
            {          
              label: 'Spoiler points',
              data: topSpoilers.position_diff,
              fill: false,
              backgroundColor: getRegularColarList(1)[3],
              borderColor: getRegularColarList(1)[3]
              },
            ],
          };
        
        return(
          <div className="c2-function-components">
              {VerticalBar(`Graph A - Top 10 Spoilers`, ``, data, options)}
          </div>
      )
    }
  

    function generateSpoilerDriversList(inputRecord) {
        const listItem = inputRecord.driver_name.map((element, index) => {
            return(
                <div 
                    className="list-item-container"
                    onClick={() => {setUpTheSelectDriver(index, inputRecord.driver_id)}}
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
          <div className="clickable-list" style={{height: 500}}>
            <List class="hide-scrollbar" style={{maxHeight: '100%', overflow: 'auto'}}>
                {listItem}
            </List>
          </div>
        )
    }

    function PlotSpoilerRecordDetailGroupedBarChart() {
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
                    text: "Race",
                    font: {
                        size: 20
                    }
                }
            },
          }
        };
        var raceYearLabel = [];
    for(var i = 0; i < topSpoilerDetail.race_name.length; i++) {
      raceYearLabel.push(topSpoilerDetail.race_name[i] + " - (" + topSpoilerDetail.year[i] + ")")
    }
        const data = {
            labels: raceYearLabel,
            datasets: [
                {
                    label: topSpoilerDetail.driver_name + `'s Start Position`,
                    data: topSpoilerDetail.qualifying_position,
                    backgroundColor: 'rgb(54, 162, 235)',
                    stack: 'Stack 0',
                },
                {
                    label: topSpoilerDetail.driver_name + `'s Final Position`,
                    data: topSpoilerDetail.result_position,
                    backgroundColor: 'rgb(75, 192, 192)',
                    stack: 'Stack 1',
                },
                {
                    label: topSpoilerDetail.driver_name + `'s Position Difference`,
                    data: topSpoilerDetail.position_diff,
                    backgroundColor: 'rgb(255, 99, 132)',
                    stack: 'Stack 2',
                },
              ],
            };
            return(
                <div>
                    {GroupBar(`Graph B - Spoiler Summary`, ``, data, options)}
                </div>
            )
    }

    return(
        <div>
          <Header/>
          <div className="clickable-list-container">
            <div>
              <h2 style={{fontFamily: settings.Font.secondary, marginBottom: 10}}> Select Spoiler </h2>
              {generateSpoilerDriversList(topSpoilers)}
            </div>
          </div>
          <div style={{marginTop: 100}} className="main-block">
            <h1 className='title page-title' align='left'> Who's a Spoiler?</h1>
            <div style={{marginTop: 50}} className="main-function-subcomponents">
                {explainBoard(
                    "Driver who has a spoils the fan with Final Result", 
                    [
                        "Qualifying",
                        " - Pregame before the official game to decide the starting position",
                        "------------------------------------------------------------------",
                        "Find out the drivers who suppose to earn more points in Games.",
                        "1. Graph A - Top 10 spoilers",
                        "2. Graph B - Get the Qualifiying result and compare with the Official Game"
                    ]
                )}
            </div>
          </div>
          <div style={{marginTop: 100}} className="main-block">
            {PlotTopSpoiler()}
          </div>
          <div style={{marginTop: 50}} className="main-block">
            {PlotSpoilerRecordDetailGroupedBarChart()}
          </div>
          <div style={{marginTop: 100}} />
        </div>
      )
}
export default C5Page;