import React, { useState, useEffect } from "react";
import Header from '../component/header'
import { Line } from 'react-chartjs-2';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import settings from "../settings";
import axios from "axios";
import { randDarkColor } from '../utils/utils'

import explainBoard from '../component/explainBoard'
import VerticalBar from '../component/verticalBar'

function C2Page() {
    const [constructorList, setConstructorList] = useState([])
    const [selectedTeam, setSelectedTeam] = useState({})
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

    // Get the investable constructor list
    function generateConstructorList() {
        const listItem = constructorList.map((element, index) => {
            return(
                <div 
                    style={{
                        borderBottom: 'solid 2.5px ' + settings.Colors.mainColor,
                        fontFamily: settings.Font.major
                    }}
                >
                    <ListItem className="list-item-component">
                        <ListItemText
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
                height: 400,
                width: 300,
                border: 'solid 10px ' + settings.Colors.mainColor,
                borderTopRightRadius: 25
            }}>
                <List class="hide-scrollbar" style={{maxHeight: '100%', overflow: 'auto'}}>
                    {listItem}
                </List>
            </div>
        )
    }
    
    // Function A
    function constructorLineChart() {
        const options = {
            scales: {
                y: {
                    beginAtZero: true
                  }
                }
            };
        
        var yearLabel = []
        for(var i = startYear; i <= endYear; i++) {
            yearLabel.push(i)
        }
        
        const data = {
            labels: yearLabel,
            datasets: constructorList.map((element, index) => {
                const totalCostList = element.total_point
                const randomColorString = randDarkColor()
                return({
                    label: element.name.toUpperCase(),
                    data: totalCostList,
                    fill: false,
                    backgroundColor: randomColorString,
                    borderColor: randomColorString,
                })
            })
        };

        return(
            <div className="c2-function-components">
                <div className='header'>
                    <h1 className='title page-title'> Total Points ({constructTimeRange()})</h1>
                </div>
                <Line data={data} options={options} />
            </div>
        )
    }

    // Function B
    function constructorBudgetBars() {
        var yearLabel = []
        for(var i = startYear; i <= endYear; i++) {
            yearLabel.push(i)
        }
    
        const data = {
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
        
        return(
            <div className="c2-function-components">
                {VerticalBar(`${selectedTeam.name} Stats`, ``, data, null)}
            </div>
        )
    }

    return (
        <div>
            <Header/>
            {generateConstructorList()}
            <div style={{
                marginTop: 100,
                marginLeft: 550,
                display: 'flex',
                flexDirection: 'column'
            }}>
                {constructorLineChart()}
                <div style={{marginTop: 50}} className="c2-function-components">
                    {explainBoard(
                        "Total Points Explanation", 
                        [
                            "1. For each year the increase rate should be over 20%",
                            "2. Only listing the top K team with the MAX point differences (End - Start)",
                        ]
                    )}
                </div>
                <div style={{height: 100}}/>
                <div style={{marginTop: 50}} className="c2-function-components">
                    {explainBoard(
                        "More Perspective", 
                        [
                            "1. Budget",
                            "2. Pit Stop Time",
                            "3. Errors" 
                        ]
                    )}
                </div>
                <div style={{height: 50}}/>
                {constructorBudgetBars()}
                <div style={{height: 50}}/>
                {constructorBudgetBars()}
                <div style={{height: 50}}/>
                {constructorBudgetBars()}
            </div>
        </div>
    )
}

export default C2Page