import React, { useState, useEffect } from "react";
import Header from '../component/header'
import { Line } from 'react-chartjs-2';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import settings from "../settings";
import axios from "axios";
import { getRegularColarList } from '../utils/utils'
import explainBoard from '../component/explainBoard'
import VerticalBar from '../component/verticalBar'
import LineChart from '../component/lineChart'
import GroupBar from '../component/groupBar'
import PolarAreaChart from '../component/polarArea'

function C2Page() {
    const [constructorList, setConstructorList] = useState([
        {
            'name': '',
            'avg_pits_time': [],
            'budgets': [],
            'errors': []
        }
    ])
    const [selectedTeam, setSelectedTeam] = useState({})
    const [focusOneTeam, setFocusOneTeam] = useState(false)
    const [summaryStats, setSummaryStats] = useState({
        "pointBugdetRatio": [],
        "yearWiseAvgPitTime": [],
        "yearWiseErrors": [],
        "rankScores": []
    })
    const startYear = 2015
    const endYear = 2017
    
    useEffect(() => {
        getConstructorList();
    }, [])

    const getConstructorList = async () => {
        const constructorUrl = settings.apiHostURL + '/c2/investable-constructors'
        let response = await axios.get(constructorUrl)
        if(response.data.result.data.constructors) {
            setConstructorList(response.data.result.data.constructors)
        }
        let defaultTeam = response.data.result.data.constructors ? response.data.result.data.constructors[0] : {'name': 'None'}
        getConstructorsRankingScore(response.data.result.data.constructors);
        setSelectedTeam(defaultTeam)
    }

    function constructTimeRange() {
        return `${startYear}-${endYear}`
    }

    const handleClickConstructorList = (index, flag) => {
        setFocusOneTeam(flag)
        if(constructorList) {
            setSelectedTeam(constructorList[index])
        }
    }

    function getConstructorsRankingScore(inputList) {
        const pointBugdetRatioArr = []
        const yearWiseAvgPitTimeArr = []
        const yearWiseErrorsArr = []
        const rankScoresArr = []
        if(inputList.length > 0) {
            inputList.map((element, index) => {
                const pointBudgetRatio = getPointBudgetRatio(element.total_points, element.budgets)
                const avgPitStopTime = getArrayYearWiseAverage(element.avg_pits_time) - 21.0
                const avgErrors = getArrayYearWiseAverage(element.errors)

                pointBugdetRatioArr.push(pointBudgetRatio)
                yearWiseAvgPitTimeArr.push(avgPitStopTime)
                yearWiseErrorsArr.push(avgErrors)

                let score = pointBudgetRatio*10 + 10 - (avgPitStopTime*2) + 12 - avgErrors*3;
                rankScoresArr.push(score)
            });

            setSummaryStats({
                "pointBugdetRatio": pointBugdetRatioArr,
                "yearWiseAvgPitTime": yearWiseAvgPitTimeArr,
                "yearWiseErrors": yearWiseErrorsArr,
                "rankScores": rankScoresArr
            })
        }
    }
    // Get the investable constructor list
    function generateConstructorList(inputList) {
        const showAllItem = () => {
            return (
                <div 
                    className="list-item-container"
                    onClick={() => {handleClickConstructorList(0, false)}}
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
                    onClick={() => {handleClickConstructorList(index, true)}}
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
    
    // Function A
    function constructorLineChart() {
        var yearLabel = []
        for(var i = startYear; i <= endYear; i++) {
            yearLabel.push(i)
        }
        
        const countTeamsPoint = () => {
            let dataPoints = []
            if(focusOneTeam) {
                const totalCostList = selectedTeam.total_points
                const randomColorString = getRegularColarList(1)[0]
                dataPoints.push({
                    label: selectedTeam.name.toUpperCase(),
                    data: totalCostList,
                    fill: false,
                    backgroundColor: randomColorString,
                    borderColor: randomColorString,
                })
            }
            else {
                constructorList.map((element, index) => {
                    const totalCostList = element.total_points
                    const randomColorString = getRegularColarList(1)[index]
                    dataPoints.push({
                        label: element.name.toUpperCase(),
                        data: totalCostList,
                        fill: false,
                        backgroundColor: randomColorString,
                        borderColor: randomColorString,
                    })
                })
            }

            return dataPoints
        }

        const totalPointData = {
            labels: yearLabel,
            datasets: countTeamsPoint()
        }

        return(
            <div>{LineChart(`Graph A - Total Points (${constructTimeRange()})`, ``, totalPointData, null)}</div>
        )
    }

    // Function B
    function constructorStatBars() {
        var yearLabel = []
        for(var i = startYear; i <= endYear; i++) {
            yearLabel.push(i)
        }
    
        const budgetData = {
            labels: yearLabel,
            datasets: [
                {
                    label: 'Graph B - Annual Team Budgets',
                    data: selectedTeam.budgets,
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
                },
            ],
        };

        const pitStopData = {
            labels: yearLabel,
            datasets: [
                {
                    label: 'Graph C - Annual Average Pit Stop Time',
                    data: selectedTeam.avg_pits_time,
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
                },
            ],
        };

        const errorData = {
            labels: yearLabel,
            datasets: [
                {
                    label: 'Graph D - Annual # of Errors',
                    data: selectedTeam.errors,
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
                },
            ],
        };
        
        return(
            <div className="main-function-subcomponents">
                {VerticalBar(`${selectedTeam.name} Budget Stats (€ million)`, `Budget Increase must be less than 30%`, budgetData, null)}
                <div style={{height: 50}}/>
                {VerticalBar(`${selectedTeam.name} Pit Stop Stats (sec)`, `Avg pit stop time must less than the average`, pitStopData, null)}
                <div style={{height: 50}}/>
                {VerticalBar(`${selectedTeam.name} Error Stats`, `Team mechanical errors time must less than the average`, errorData, null)}
            </div>
        )
    }

    function getPointBudgetRatio(points, budgets) {
        let totalPoints = 0
        if(points) {
            points.map((value) => {
                totalPoints += value
            })

            let totalBudgets = 0
            budgets.map((value) => {
                totalBudgets += value
            })

            return totalPoints / totalBudgets
        }
        return 0;
    }

    function getArrayYearWiseAverage(input) {
        let totalValue = 0
        input.map((value) => {
            totalValue += value
        })
        return totalValue / input.length
    }

    function constructSummaryRanking() {
        const constructDataSet = () => {
            const dataSet = [
                {
                    label: 'Point/Budget Ratio',
                    data: summaryStats.pointBugdetRatio,
                    backgroundColor: 'rgb(54, 162, 235)',
                    stack: 'Stack 0',
                },
                {
                    label: 'Year-wise Average Pit stop time',
                    data: summaryStats.yearWiseAvgPitTime,
                    backgroundColor: 'rgb(75, 192, 192)',
                    stack: 'Stack 1',
                },
                {
                    label: 'Year-wise Average Errors',
                    data: summaryStats.yearWiseErrors,
                    backgroundColor: 'rgb(255, 99, 132)',
                    stack: 'Stack 2',
                },
            ]

            return dataSet
        }

        const groupBarData = {
            labels: constructorList.map((element) => {
                return element.name
            }),
            datasets: constructDataSet()
        } 

        return(
            <div>
                {GroupBar(`Constructors Summary`, ``, groupBarData, null)}
            </div>
        )
    }

    function constructPolarChartPodium() {
        const polarData = {
              labels: constructorList.map((element) => {
                return element.name
              }),
              datasets: [
                {
                  label: 'Ranking Scores',
                  data: summaryStats.rankScores,
                  backgroundColor: getRegularColarList(),
                  borderWidth: 1,
                },
              ],
            };

        return(
            <div>
                {PolarAreaChart(`Ranking Scores`, ``, polarData, null)}
                <div style={{marginTop: 50}} className="main-function-subcomponents">
                    {explainBoard(
                        "Ranking Score depends on the outcome value of Constructors Summary", 
                        [
                            "1. Points / Budget Ratio - Money Efficiency",
                            "2. YearWise PitStop time - Team effort",
                            "3. YearWise Errors - Organization"
                        ]
                    )}
                </div>
            </div>
        )
    }

    return (
        <div>
            <Header/>
            {generateConstructorList(constructorList)}
            <div style={{marginTop: 100}} className="main-block">
                <h2 className='title page-title' align='left'> Which Constructor (team) is Investable? </h2>
                <div style={{marginTop: 50}} className="main-function-subcomponents">
                    {explainBoard(
                        "List the Team with Great Potential", 
                        [
                            "The result is shown as a rank score with multiple evaluation"
                        ]
                    )}
                </div>
            </div>
            <div style={{marginTop: 50}} className="main-block">
                {constructPolarChartPodium()}
            </div>
            <div style={{marginTop: 50}} className="main-block">
                {constructSummaryRanking()}
                <div style={{marginTop: 50}} className="main-function-subcomponents">
                    {explainBoard(
                        "The ratio is count by the data from Graph A, B and C", 
                        [
                            "1. Graph A - Total Points from 2015 - 2017",
                            "2. Graph B - Budget Stats from 2015 - 2017",
                            "3. Graph C - Pit Stop Time from 2015 - 2017",
                            "4. Graph D - Errors Time from 2015 - 2017"
                        ]
                    )}
                </div>
            </div>
            <div style={{marginTop: 50}} className="main-block">
                {constructorLineChart()}
            </div>
            <div style={{marginTop: 50, marginBottom: 50}}/>
            <div className="main-block">
                <img 
                    className="main-function-subcomponents"
                    src="./team_testing.jpeg" alt="team_testing"
                    style={{
                    }}
                />
                <div style={{marginTop: 50}} className="main-function-subcomponents">
                    {explainBoard(
                        "More Perspectives from 2015 - 2017", 
                        [
                            "1. Graph B Budget Stats - [Max - Min] difference cannot grow over 30%",
                            "2. Graph C Pit Stop Time - Smaller than average",
                            "3. Graph D Errors (cause 0 points) - Smaller than average, and the error must be [Team Error]" 
                        ]
                    )}
                </div>
                <div style={{height: 50}}/>
                {constructorStatBars()}
            </div>
            <div style={{marginTop: 50, marginBottom: 50}}/>
        </div>
    )
}

export default C2Page