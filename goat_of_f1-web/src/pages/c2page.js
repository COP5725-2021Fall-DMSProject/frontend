import React, { useState, useEffect } from "react";
import Header from '../component/header'
import { Line } from 'react-chartjs-2';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import settings from "../settings";
import axios from "axios";
import { randDarkColor } from '../utils/utils'

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
            <div style={{width: '70%', height: 500}}>
                <div className='header'>
                    <h1 className='title page-title'> Total Points (2015-2017)</h1>
                    <div className='links'>
                    <a
                        className='btn btn-gh'
                        href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Line.js'
                    >
                    </a>
                    </div>
                </div>s
                <Line data={data} options={options} />
            </div>
        )
    }

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
            </div>
        </div>
    )
}

export default C2Page