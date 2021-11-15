import React, { useState, useEffect} from "react";
import Paper from '@material-ui/core/Paper';
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
import "../App.css";
import axios from "axios";

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
  

const compareUrl = ``
const agewisePointsUrl = ``
const averageAgewisePointsUrl = ``

function PageC1() {
    const [scoreCompare, setScoreCompareData] = useState([{year: '',race:'', driver:'',lewis:''}]);
    const [agewisePoints, setAgewisePoints] = useState([{age:'', x:'', lewis:''}]);
    const [agewiseAveragePoints, setAverageAgewisePoints] = useState([{x:'', y:'', lewis:''}]);

    useEffect(() => {
        getComparisonData();
        getAgewiseAveragePoints();
        getAgeWisePoints();
    }, [])

    const getComparisonData = async () => {
        // const response = await axios.get(compareUrl)
        const fakeResponse = [
            { year: 2010 , race: 'Istanbul', driver: 77, lewis: 88},
            { year: 2011, race: 'Monaco', driver: 65, lewis: 63},
            { year: 2012, race: 'Heidelberg', driver: 78, lewis: 86},
            { year: 2013, race: 'Lyon', driver: 73, lewis: 81},
            { year: 2014, race: 'Amsterdam', driver: 90, lewis: 88},
          ];
        // setScoreCompareData(response.data)
        setScoreCompareData(fakeResponse)
    }

    const getAgeWisePoints = async() => {
        // const response = await axios.get(agewisePointsUrl)
        const fakeResponse = [
            { age:21, x: 72, lewis: 97 },
            { age:22, x: 87, lewis: 83 },
            { age:23, x: 90, lewis: 89 },
            { age:24, x: 83, lewis: 91 },
            { age:25, x: 77, lewis: 85 },
          ];
          // setAgewisePoints(response.data)
        setAgewisePoints(fakeResponse)
    }
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

    return (
        <div>
        <div style={
            {
                margin: '0 auto',
                textAlign: 'left',
                width: '300px'
            }
        }>
        <table className="table" style={
            {position: 'absolute',
            top: '100px',
            fontFamily: 'Arial, Helvetica, sans-serif',
            border: '1px solid black'}
            }>
            <thead className="thead-dark">
                <tr style={{border: '1px solid black'}}>
                {Object.keys(scoreCompare[0]).map((heading) => <th style={{border: '1px solid black'}}>{heading}</th>)} 
                </tr>
            </thead>
            <tbody>
            {scoreCompare.map((row) => (
                <tr style={{border: '1px solid black'}}> {Object.keys(scoreCompare[0]).map((heading) => <td style={{border: '1px solid black'}}>{row[heading]}</td>)} </tr>
            ))}
            </tbody>
        </table>
        </div>
        <br/>
        <div>
        <Paper
        style={
                {position: 'relative',
                top: '250px',
                height:'55%',
                width: '40%',
                float: 'left',
                }
            }>
        <Chart data={agewisePoints} >
          <ArgumentAxis />
          <ValueAxis />
          <BarSeries
            name="DriverX"
            valueField="x"
            argumentField="age"
            color="#ffd700"
          />
          <BarSeries
            name="Lewis"
            valueField="lewis"
            argumentField="age"
            color="#c0c0c0"
          />
          <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
          <Title text="Agewise Points Comparison" />
        </Chart>
      </Paper>
      </div>
      <div>
        <Paper style={
            {position: 'relative',
            top: '250px',
            height:'55%',
            width: '40%',
            float: 'left',
            marginLeft: '200px'
        }
            }>
        <Chart
        data={agewiseAveragePoints}
        >
        <ArgumentAxis/>
        <ValueAxis/>
        <LineSeries 
        name="DriverX" 
        valueField="y" 
        argumentField="x" />

        <LineSeries 
        name="Lewis" 
        valueField="lewis" 
        argumentField="x" />

        <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
        <Title text="Agewise Average Points Comparison" />
        </Chart>
        </Paper>
        </div>
        </div>
    )
}

export default PageC1