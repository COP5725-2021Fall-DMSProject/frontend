import React, { useState, useEffect } from "react";
import Header from '../component/header'
import {
    ArgumentAxis,
    LineSeries,
    ValueAxis,
    Chart,
    SplineSeries,
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
    const [scoreIncrease, setAverageAgewisePoints] = useState([{ countructorId: 0, year: '', totalPoint: 0}])
    const [constructorList, setConstructorList] = useState([{constructorId: '', name:''}])

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

    const ValueLabel = (props) => {
        const { text } = props;
        return (
          <ValueAxis.Label
            {...props}
            text={`${text}%`}
          />
        );
    };

    function constructorLineChart() {
        return(
            <Paper style={{
                height:'55%',
                width: '70%',
            }}>
                <Chart
                    data={scoreIncrease}
                >
                    {/* <ArgumentScale/> */}
                    <ArgumentAxis/>
                    <ValueAxis
                        labelComponent={ValueLabel}
                    />
                    
                    <LineSeries 
                        name="DriverX" 
                        valueField="totalPoint" 
                        argumentField="year"
                    />
                    <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
                    <Title style={{fontFamily: 'Audiowide'}}text="Constuctor Total Points (2015-2017)" />
                </Chart>
            </Paper>
        )
    }

    function generateContructorList() {
        console.log(constructorList)
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
                {generateContructorList()}
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