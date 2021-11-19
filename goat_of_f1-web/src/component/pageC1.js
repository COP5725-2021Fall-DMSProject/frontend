import React, { useState, useEffect} from "react";
import Header from '../component/header'
import { Bar, Line } from 'react-chartjs-2';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import settings from "../settings";
import "../App.css";
import axios from "axios";  
import { randDarkColor } from '../utils/utils'
import { TableCell } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const competitiveUrl = `http://10.136.203.20:8000/c1/competitive-drivers`
const compareUrl = `http://10.136.203.20:8000/c1/funcA/10`
const ageWisePointsUrl = `http://10.136.203.20:8000/c1/funcB/10`

function PageC1() {
    const [competitiveDrivers, setCompetitiveDrivers] = useState([{driverId: '',name:''}]);
    const [raceWiseData, setRaceWiseData] = useState([{forename: '',l_point:'', name:'', raceid:'', someone_points: '', surname: '', year: ''}]);
    const [ageWisePoints, setAgewisePoints] = useState([{name:'', score:[]}]);
    const startYear = 2015
    const endYear = 2017

    useEffect(() => {
        getCompetitiveDriversData();
        getComparisonData();
        getAgeWisePoints();
    }, [])

    const getCompetitiveDriversData = async () => {
        const response = await axios.get(competitiveUrl)
        setCompetitiveDrivers(response.data.result.drivers)
    }

    const getComparisonData = async() => {
        // const response = await axios.get(compareUrl)
        const fakeResponse = [
          {forename: 'Nick',l_point:'101', name:'Monaco Grand Prix', raceid:'2', someone_points: '200', surname: 'Fury', year: '2009'}
        ]
        setRaceWiseData(fakeResponse)
        // setRaceWiseData(response.data.result.data)
    }
    const getAgeWisePoints = async () => {
        // const response = await axios.get(ageWisePointsUrl)
        const fakeResponse = [
          { name:'lewis', score: [32, 56, 45]},
          { name:'driverX', score: [23, 34, 67]}
        ];
        setAgewisePoints(fakeResponse)
        // setAgewisePoints(response.data.result.data)
    }

    function generateCompetitveDriversList() {
      const listItem = competitiveDrivers.map((element, index) => {
          return(
              <div style={{
                  borderRight: 'solid 3px ' + settings.Colors.mainColor,
                  borderBottom: 'solid 3px ' + settings.Colors.mainColor,
              }}>
                  <ListItem>
                      <ListItemText
                          key={index}
                          primary={element.name}
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

  function ageWiseComparisonBarChart() {
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
        datasets: 
            ageWisePoints.map((element, _) => {
              console.log(element)
            const randomColorString = randDarkColor()
            return({
                label: element.name,
                data: element.score,
                fill: false,
                backgroundColor: randomColorString,
                borderColor: randomColorString
              })
            })    
    };
    
    return(
        <div className="c2-function-components">
            <div className='header'>
                <h4 className='title page-title' align='center'> Points Comparison (2015-2017)</h4>
                <div className='links'>
                <a
                    className='btn btn-gh'
                    href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Line.js'
                >
                </a>
                </div>
            </div>
            <Bar data={data} options={options} />
        </div>
    )
}

function raceWiseTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          {Object.keys(raceWiseData[0]).map((heading) => <TableCell style={{border: '1px solid black'}}>{heading.toUpperCase()}</TableCell>)} 
          </TableRow>
        </TableHead>
        <TableBody>
          {raceWiseData.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {Object.keys(raceWiseData[0]).map((heading) => <TableCell component="th" scope="row" align="center">{row[heading]}</TableCell>)} 
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
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
          {generateCompetitveDriversList()}
      </div>
      <div style={{
          marginTop: 100,
          marginLeft: 550,
          display: 'flex',
          flexDirection: 'row'
      }}>
      {raceWiseTable()}
      </div>
      <div style={{
          marginTop: 100,
          marginLeft: 500,
          display: 'flex',
          flexDirection: 'column'
      }} >
      <div style={{height: 100}}/>
          {ageWiseComparisonBarChart()}
      </div>
  </div>
)

}

export default PageC1