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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function C2Page() {
    const [scoreIncrease, setAverageAgewisePoints] = useState([{ countructorId: 0, year: '', totalPoint: 0}])
    const [constructorList, setConstructorList] = useState([])
    const startYear = 2015
    const endYear = 2017

    useEffect(() => {
        getScoreIncrease();
        getContructorList();
    }, [])
    
    const getScoreIncrease = async () => {
        // const response = await axios.get(averageAgewisePointsUrl)
        const fakeResponse = [
            { countructorId: 0, year: 2015, totalPoint: 100 },
            { countructorId: 0, year: 2016, totalPoint: 132 },
            { countructorId: 0, year: 2017, totalPoint: 166 },
          ];
        // setAgewisePoints(response.data)
        setAverageAgewisePoints(fakeResponse)
    }

    const getContructorList = async () => {
        const constructorUrl = settings.apiHostURL + '/c2/investable-constructors'
        let response = await axios.get(constructorUrl)
        // let filterList = response.data.MRData.DriverTable.Constructors.map((element) => {
        //     filterList.{'id': element.constructorId, 'name': element.name}
        // })
        setConstructorList(response.data.result.data.constructors)
    }

    // Get the investable constructor list
    function generateConstructorList() {
        const listItem = constructorList.map((element, index) => {
            return(
                <div style={{
                    borderRight: 'solid 3px ' + settings.Colors.mainColor,
                    borderBottom: 'solid 3px ' + settings.Colors.mainColor,
                }}>
                    <ListItem>
                        <ListItemText
                            key={index}
                            primary={element.name.toUpperCase()}
                        />
                    </ListItem>
                </div>
            )
        })

        return (
            <List class="hide-scrollbar" style={{maxHeight: '100%', overflow: 'auto'}}>
                {listItem}
            </List>
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
                    <h1 className='title page-title'> Total Points (2015-2017)</h1>
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

    // Function B
    function constructorStatTable() {
        return (
            <div className="c2-function-components">
            <h1 className='title page-title'> Total Points (2015-2017)</h1>
            <TableContainer style={{marginTop: 50, marginBottom: 50}} component={Paper}>
                <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                    <TableCell>Dessert (100g serving)</TableCell>
                    <TableCell align="right">Calories</TableCell>
                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                    <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                        {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
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
            <div style={{
                position: 'fixed',
                left: 75,
                top: 100,
                height: 500,
                width: 400,
                borderTop: 'solid 10px ' + settings.Colors.mainColor,
                borderRight: 'solid 10px ' + settings.Colors.mainColor,
                borderTopRightRadius: 25
            }}>
                {generateConstructorList()}
            </div>
            <div style={{
                marginTop: 100,
                marginLeft: 550,
                display: 'flex',
                flexDirection: 'column'
            }}>
                {constructorLineChart()}
                <div style={{height: 100}}/>
                {constructorStatTable()}
            </div>
        </div>
    )
}

export default C2Page