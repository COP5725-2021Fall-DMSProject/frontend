import React, { useState, useEffect } from "react";
import Header from '../component/header'
import { Line } from 'react-chartjs-2';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import settings from "../settings";
import axios from "axios";
import { randDarkColor } from '../utils/utils'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import explainBoard from '../component/explainBoard'

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

    function createRowData(year, budgets, avgPitTime, errors) {
        return { year, budgets, avgPitTime, errors}
    }

    function constructTableRows() {
        if(Object.keys(selectedTeam).length === 0) return []
        let tableRows = []
        for(let i = startYear; i <= endYear; i++) {
            let currIdx = i-startYear
            if(selectedTeam.budgets && selectedTeam.avg_pit_time && selectedTeam.errors) {
                let tuple = createRowData(i, selectedTeam.budgets[currIdx], selectedTeam.avg_pit_time[currIdx], selectedTeam.errors[currIdx])
                tableRows.push(tuple)
            }
        }
        return tableRows
    }

    // Function B
    function constructorStatTable() {
        return (
            <div className="c2-function-components">
            <h1 className='title page-title'> {selectedTeam.name} Stats {constructTimeRange()}</h1>
            <TableContainer style={{marginTop: 50, marginBottom: 50}} component={Paper}>
                <Table size="medium" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Year</TableCell>
                        <TableCell align="left">Budget(M)</TableCell>
                        <TableCell align="left">Average Pit Time(s)</TableCell>
                        <TableCell align="left">Errors</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {constructTableRows().map((row) => (
                        <TableRow
                            key={row.year}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                            {row.year}
                            </TableCell>
                            <TableCell align="left">{row.budgets}</TableCell>
                            <TableCell align="left">{row.avgPitTime}</TableCell>
                            <TableCell align="left">{row.errors}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
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
                {constructorStatTable()}
                <div style={{marginTop: 50}} className="c2-function-components">
                    {explainBoard(
                        "Team Stats Explanation", 
                        [
                            "Teams are improving due to different perspectives",
                            "1. Budget - The success is simply increasing the funding",
                            "---",
                            "2. Pit Stop Time - Changing race car components is also another battle, great team work show at pit stop time",
                            "---",
                            "3. Errors - Errors often is unacceptable, team will cost hundred thousands dollars due to errors" 
                        ]
                    )}
                </div>
            </div>
        </div>
    )
}

export default C2Page