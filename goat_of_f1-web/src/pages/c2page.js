import React, { useState, useEffect } from "react";
import Header from '../component/header'
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    LineSeries,
    BarSeries,
    Title,
    Legend
  } from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import settings from "../settings";
import axios from "axios";

function C2Page() {
    const [agewiseAveragePoints, setAverageAgewisePoints] = useState([{x:'', y:'', lewis:''}])
    const [constructorList, setConstructorList] = useState([{constructorId: '', name:''}])

    useEffect(() => {
        getAgewiseAveragePoints();
        getContructorList();
    }, [])
    
    const getAgewiseAveragePoints = async () => {
        // const response = await axios.get(averageAgewisePointsUrl)
        const fakeResponse = [
            { x: 1, y: 30, lewis: 26 },
            { x: 2, y: 40, lewis:31 },
            { x: 3, y: 5, lewis: 10},
            { x: 4, y: 2, lewis: 12},
            { x: 5, y: 21, lewis: 25},
          ];
        // setAgewisePoints(response.data)
        setAverageAgewisePoints(fakeResponse)
    }

    const getContructorList = async () => {
        const constructorUrl = "http://ergast.com/api/f1/constructors.json";
        let response = await axios.get(constructorUrl)
        // let filterList = response.data.MRData.DriverTable.Constructors.map((element) => {
        //     filterList.{'id': element.constructorId, 'name': element.name}
        // })
        setConstructorList(response.data.MRData.ConstructorTable.Constructors)
    }
    

    const legendStyles = () => ({
        root: {
          display: 'flex',
          margin: 'auto',
          flexDirection: 'row',
        },
      });
      const legendRootBase = ({ classes, ...restProps }) => (
        <Legend.Root {...restProps} className={classes.root} />
      );
      const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
      const legendLabelStyles = () => ({
        label: {
          whiteSpace: 'nowrap',
        },
      });
      const legendLabelBase = ({ classes, ...restProps }) => (
        <Legend.Label className={classes.label} {...restProps} />
      );
      const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);

    function constructorLineChart() {
        return(
            <Paper style={{
                height:'55%',
                width: '50%',
            }}>
                <Chart
                    data={agewiseAveragePoints}
                >
                    <ArgumentAxis/>
                    <ValueAxis/>
                    <LineSeries 
                        name="DriverX" 
                        valueField="y" 
                        argumentField="x"
                    />

                    <LineSeries 
                        name="Lewis" 
                        valueField="lewis" 
                        argumentField="x" 
                    />
                    <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
                    <Title text="Agewise Average Points Comparison" />
                </Chart>
            </Paper>
        )
    }

    function generateContructorList() {
        console.log(constructorList)
        const listItem = constructorList.map((element, index) => {
            return(
                <ListItem>
                    <ListItemText
                        key={index}
                        primary={element.name}
                    />
                </ListItem>
            )
        })

        console.log(listItem)
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
                {generateContructorList()}
            </div>
            <div style={{
                marginTop: 100,
                marginLeft: 550,
                display: 'flex',
                flexDirection: 'column'
            }}>
                {constructorLineChart()}
                {constructorLineChart()}
                {constructorLineChart()}
            </div>
        </div>
    )
}

export default C2Page