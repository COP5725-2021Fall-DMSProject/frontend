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

function C5Page() {
    const [topSpoilers, setTopSpoilers] = useState({driver_id : [],driver_name : [],position_diff : [],race_cnt : []});
    const [topSpoilerDetail, setTopSpoilerDetail] = useState({year:[],race_id:[],race_name: [],driver_name: "",
    driver_id:0,qualifying_position:[],result_position:[],position_diff:[]});

    useEffect(() => {
        getTopSpoilers();
    }, [])

    const getTopSpoilers = async () => {
        const topSpoilersUrl = settings.apiHostURL + '/c5/top10spoiler'
        // const response = await axios.get(topSpoilersUrl)
        const fakeResponse = {
            driver_id: [
              3, 
              17, 
              1, 
              822, 
              30, 
              807, 
              13, 
              826, 
              817, 
              20
            ], 
            driver_name: [
              "Nico Rosberg", 
              "Mark Webber", 
              "Lewis Hamilton", 
              "Valtteri Bottas", 
              "Michael Schumacher", 
              "Nico H\u00fclkenberg", 
              "Felipe Massa", 
              "Daniil Kvyat", 
              "Daniel Ricciardo", 
              "Sebastian Vettel"
            ], 
            position_diff: [
              -0.6470588235, 
              -0.0588235294, 
              -0.036036036, 
              0.0506329114, 
              0.5769230769, 
              0.5795454545, 
              0.6422018349, 
              0.6538461538, 
              0.6960784314, 
              0.7256637168
            ], 
            race_cnt: [
              102, 
              51, 
              111, 
              79, 
              26, 
              88, 
              109, 
              52, 
              102, 
              113
            ]
      }
        // setTopSpoilers(response.data.result.data)
        setTopSpoilers(fakeResponse)
      // setUpTheSelectDriver(0, response.data.result.data)
      setUpTheSelectDriver(0, fakeResponse.driver_id)
    }

    const setUpTheSelectDriver = async function(index, spoilerArr) {
        if(spoilerArr.length > 0) {
          getSpoilerRecordDetail(spoilerArr[index]);
        }
    }

    const getSpoilerRecordDetail = async function(spoilerId) {
        console.log(spoilerId)
        const spoilerDetailUrl = settings.apiHostURL + `/c3/spoilerrecord/${spoilerId}`
        // const response = await axios.get(spoilerDetailUrl)
        const fakeResponse = {
                driver_id: 1, 
                driver_name: "Lewis Hamilton", 
                position_diff: [
                  -17, 
                  -10, 
                  -7, 
                  -7, 
                  -6, 
                  -6, 
                  -5, 
                  -5, 
                  -4, 
                  -4
                ], 
                qualifying_position: [
                  2, 
                  2, 
                  1, 
                  3, 
                  2, 
                  2, 
                  2, 
                  1, 
                  1, 
                  5
                ], 
                race_id: [
                  867, 
                  884, 
                  864, 
                  875, 
                  863, 
                  842, 
                  857, 
                  936, 
                  888, 
                  899
                ], 
                race_name: [
                  "European Grand Prix", 
                  "Spanish Grand Prix", 
                  "Spanish Grand Prix", 
                  "Korean Grand Prix", 
                  "Bahrain Grand Prix", 
                  "Malaysian Grand Prix", 
                  "Indian Grand Prix", 
                  "Hungarian Grand Prix", 
                  "German Grand Prix", 
                  "Brazilian Grand Prix"
                ], 
                result_position: [
                  19, 
                  12, 
                  8, 
                  10, 
                  8, 
                  8, 
                  7, 
                  6, 
                  5, 
                  9
                ], 
                year: [
                  2012, 
                  2013, 
                  2012, 
                  2012, 
                  2012, 
                  2011, 
                  2011, 
                  2015, 
                  2013, 
                  2013
                ]
              }
        // setTopSpoilerDetail(response.data.result.data)
        setTopSpoilerDetail(fakeResponse)
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
              {VerticalBar(`Top 10 Spoilers`, ``, data, options)}
          </div>
      )
    }
  

    function generateSpoilerDriversList(inputRecord) {
        const showAllItem = () => {
            return (
                <div 
                    className="list-item-container"
                    onClick={() => {setUpTheSelectDriver(0, inputRecord.driver_id)}}
                >
                    <ListItem>
                        <ListItemText
                            disableTypography
                            sx={{ fontFamily: settings.Font.secondary + "!important", color: settings.Font.forthColor}}
                            key={0}
                            primary="Top Spoilers"
                        />
                    </ListItem>
                </div>
            )
        };

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
            <div className="fixed-clickable-list">
                <List class="hide-scrollbar" style={{maxHeight: '100%', overflow: 'auto'}}>
                    {showAllItem()}
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
                    {GroupBar(`Spoiler Summary`, ``, data, options)}
                </div>
            )
    }

    return(
        <div>
          <Header/>
          <div style={{marginTop: 100}} className="main-block">
            {PlotTopSpoiler()}
          </div>
          <div style={{marginTop: 50}} className="main-block">
            {generateSpoilerDriversList(topSpoilers)}
          </div>
          <div style={{marginTop: 50}} className="main-block">
            {PlotSpoilerRecordDetailGroupedBarChart()}
          </div>
        </div>
      )
}
export default C5Page;