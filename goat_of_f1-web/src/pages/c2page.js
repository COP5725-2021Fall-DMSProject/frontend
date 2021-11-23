import React, { useState, useEffect } from "react";
import Header from '../component/header'
import { Line } from 'react-chartjs-2';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import settings from "../settings";
import axios from "axios";
import { randDarkColor, assembleColor, getColorRGBnumber} from '../utils/utils'

import explainBoard from '../component/explainBoard'
import VerticalBar from '../component/verticalBar'
import LineChart from '../component/lineChart'
import GroupBar from '../component/groupBar'

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
            <div style={{
                position: 'fixed',
                left: 75,
                top: 100,
                height: 350,
                width: 300,
                border: 'solid 10px ' + settings.Colors.mainColor,
                borderTopRightRadius: 25
            }}>
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
                const randomColorString = randDarkColor()
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
                    const randomColorString = randDarkColor()
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
            <div>{LineChart(`Total Points (${constructTimeRange()})`, ``, totalPointData, null)}</div>
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
                    label: 'Annual Team Budgets',
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
                    label: 'Annual Average Pit Stop Time',
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
                    label: 'Annual # of Errors',
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
            <div className="c2-function-components">
                {VerticalBar(`${selectedTeam.name} Budget Stats (€ million)`, `Budget Increase must be less than 30%`, budgetData, null)}
                <div style={{height: 50}}/>
                {VerticalBar(`${selectedTeam.name} Pit Stop Stats (sec)`, `Avg pit stop time must less than the average`, pitStopData, null)}
                <div style={{height: 50}}/>
                {VerticalBar(`${selectedTeam.name} Error Stats`, `Team mechanical errors must less than 10 times`, errorData, null)}
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
                    data: [],
                    backgroundColor: 'rgb(54, 162, 235)',
                    stack: 'Stack 0',
                },
                {
                    label: 'Year-wise Average Pit stop time',
                    data: [],
                    backgroundColor: 'rgb(75, 192, 192)',
                    stack: 'Stack 1',
                },
                {
                    label: 'Year-wise Average Errors',
                    data: [],
                    backgroundColor: 'rgb(255, 99, 132)',
                    stack: 'Stack 2',
                },
            ]
            constructorList.map((element, index) => {
                const pointBudgetRatio = getPointBudgetRatio(element.total_points, element.budgets)
                const avgPitStopTime = getArrayYearWiseAverage(element.avg_pits_time) - 21.0
                const avgErrors = getArrayYearWiseAverage(element.errors)

                dataSet[0].data.push(pointBudgetRatio)
                dataSet[1].data.push(avgPitStopTime)
                dataSet[2].data.push(avgErrors)
            });

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
    return (
        <div>
            <Header/>
            {generateConstructorList(constructorList)}
            <div style={{marginTop: 100}} className="main-block">
                <h2 className='title page-title' align='left'> Which Constructor (team) is Investable? </h2>
            </div>
            <div style={{marginTop: 50}} className="main-block">
                {constructorLineChart()}
                <div style={{marginTop: 50}} className="c2-function-components">
                    {explainBoard(
                        "Total Points Explanation", 
                        [
                            "1. Average point should be over 100 points",
                            "- Try to find the potentials",
                            "- Middle level team usually will have over 100 points"
                        ]
                    )}
                </div>
            </div>
            <div style={{marginTop: 50, marginBottom: 50}}/>
            <div className="main-block">
                <img 
                    className="c2-function-components"
                    src="./team_testing.jpeg" alt="team_testing"
                    style={{
                    }}
                />
                <div style={{marginTop: 50}} className="c2-function-components">
                    {explainBoard(
                        "More Perspective", 
                        [
                            "1. Budget - the team's success is not only build by money",
                            "2. Pit Stop Time - showing the team have great team works",
                            "3. Errors - show the team has great organizations" 
                        ]
                    )}
                </div>
                <div style={{height: 50}}/>
                {constructorStatBars()}
            </div>
            <div style={{marginTop: 50, marginBottom: 50}}/>
            <div className="main-block">
                {constructSummaryRanking()}
            </div>
            <div style={{height: 50}}/>
        </div>
    )
}

export default C2Page