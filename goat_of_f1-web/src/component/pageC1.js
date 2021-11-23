// import React, { useState, useEffect} from "react";
// import Header from '../component/header'
// import { Bar, Line, Chart } from 'react-chartjs-2';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import settings from "../settings";
// import "../App.css";
// import axios from "axios";  
// import { randDarkColor } from '../utils/utils'
// import GroupedBar from "./groupBar";
// const rand = () => Math.floor(Math.random() * 255);

// const compareUrl = settings.apiHostURL + '/c1/funcA/4'
// const ageWisePointsUrl = settings.apiHostURL + '/c1/funcB/4'
// const competitiveUrl = settings.apiHostURL + '/c1/competitive-drivers'

// function PageC1() {
//     const [competitiveDriversList, setCompetitiveDrivers] = useState([{driverId: '',name:''}]);
//     const [raceWiseData, setRaceWiseData] = useState([{forename: '',l_point:'', name:'', raceid:'', someone_points: '', surname: '', year: ''}]);
//     const [ageWisePoints, setAgewisePoints] = useState([{name:'', score:[]}]);
//     const [focusOneDriver, setFocusOneDriver] = useState(false)
//     const [selectedDriver, setSelectedDriver] = useState({})

//     const startYear = 2015
//     const endYear = 2017

//     useEffect(() => {
//         getCompetitiveDriversData();
//         getComparisonData();
//         getAgeWisePoints();
//     }, [])

//     const getCompetitiveDriversData = async () => {
//         const response = await axios.get(competitiveUrl)
//         setCompetitiveDrivers(response.data.result.data.drivers)
//     }

//     const getComparisonData = async() => {
//         const response = await axios.get(compareUrl)
//         const fakeResponse = [
//           {forename: 'Nick',l_point:'101', name:'Monaco Grand Prix', raceid:'2', someone_points: '200', surname: 'Fury', year: '2009'}
//         ]
//         // setRaceWiseData(fakeResponse)
//         setRaceWiseData(response.data.result.data)
//     }

//     const getAgeWisePoints = async () => {
//         const response = await axios.get(ageWisePointsUrl)
//         const fakeResponse = [
//           { name:'lewis', score: [32, 56, 45]},
//           { name:'driverX', score: [23, 34, 67]}
//         ];
//         // setAgewisePoints(fakeResponse)
//         setAgewisePoints(response.data.result.data)
//     }

//     const handleClickDriverList = (index, flag) => {
//         setFocusOneDriver(flag)
//         if(competitiveDriversList) {
//             setSelectedDriver(competitiveDriversList[index])
//         }
//     }

//     function generateCompetitiveDriversList(inputList) {
//         const showAllItem = () => {
//             return (
//                 <div 
//                     className="list-item-container"
//                     onClick={() => {handleClickDriverList(0, false)}}
//                 >
//                     <ListItem>
//                         <ListItemText
//                             disableTypography
//                             sx={{ fontFamily: settings.Font.secondary + "!important", color: settings.Font.forthColor}}
//                             key={0}
//                             primary="ALL"
//                         />
//                     </ListItem>
//                 </div>
//             )
//         }
//         const listItem = inputList.map((element, index) => {
//             return(
//                 <div 
//                     className="list-item-container"
//                     onClick={() => {handleClickDriverList(index, true)}}
//                 >
//                     <ListItem>
//                         <ListItemText
//                             disableTypography
//                             sx={{ fontFamily: settings.Font.secondary + "!important", color: settings.Font.forthColor}}
//                             key={index}
//                             primary={element.name.toUpperCase()}
//                         />
//                     </ListItem>
//                 </div>
//             )
//         })

//         return (
//             <div style={{
//                 position: 'fixed',
//                 left: 75,
//                 top: 100,
//                 height: 350,
//                 width: 300,
//                 border: 'solid 10px ' + settings.Colors.mainColor,
//                 borderTopRightRadius: 25
//             }}>
//                 <List class="hide-scrollbar" style={{maxHeight: '100%', overflow: 'auto'}}>
//                     {showAllItem()}
//                     {listItem}
//                 </List>
//             </div>
//         )
//     }

//   function ageWiseComparisonBarChart() {
//     const options = {
//         scales: {
//             y: {
//                 beginAtZero: true
//               }
//             }
//         };
    
//     var yearLabel = []
//     for(var i = startYear; i <= endYear; i++) {
//       yearLabel.push(i)
//     }

//     const data = {
//         labels: yearLabel,
//         datasets: 
//             ageWisePoints.map((element, _) => {
//               console.log(element)
//             const randomColorString = randDarkColor()
//             return({
//                 label: element.name,
//                 data: element.score,
//                 fill: false,
//                 backgroundColor: randomColorString,
//                 borderColor: randomColorString
//               })
//             })    
//     };
    
//     return(
//         <div className="c2-function-components">
//             <div className='header'>
//                 <h4 className='title page-title' align='center'> Points Comparison (2015-2017)</h4>
//                 <div className='links'>
//                 <a
//                     className='btn btn-gh'
//                     href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Line.js'
//                 >
//                 </a>
//                 </div>
//             </div>
//             <Bar data={data} options={options} />
//         </div>
//     )
// }

// function raceWiseComparisonLineChart() {
//   const options = {
//     scales: {
//         y: {
//             beginAtZero: true
//           }
//         },
//     };

// var raceIdLabel = raceWiseData.map((element, _) => {
//   return (element.year+ "-"+ element.raceid +"-"+ element.name)
// })

// const data = {
//     labels: raceIdLabel,
//     datasets: [
//       {
//         type: 'line',
//         label: 'Lewis',
//         borderColor: `rgb(${rand()}, ${rand()}, ${rand()})`,
//         borderWidth: 2,
//         fill: false,
//         data: raceWiseData.map((element, _) => {return (element.l_point)}),
//       },
//       {
//         type: 'line',
//         label: raceWiseData[0].forename,
//         borderColor: `rgb(${rand()}, ${rand()}, ${rand()})`,
//         borderWidth: 2,
//         fill: false,
//         data: raceWiseData.map((element, _) => {return (element.someone_points)}),
//       }
//     ]
//     };  

// return(
//     <div className="c2-function-components">
//         <div className='header'>
//             <h4 className='title page-title' align='center'> Racewise Comparison</h4>
//             <div className='links'>
//             <a
//                 className='btn btn-gh'
//                 href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Line.js'
//             >
//             </a>
//             </div>
//         </div>
//         <Line data={data} options={options} />
//     </div>
// )

// }

// function CompetitiveGroupedBarChart() {
//     const options = {
//       scales: {
//           y: {
//               beginAtZero: true
//             }
//           },
//       };
  
//   var driverLabel = competitiveDriversList.map((element, _) => {
//     return (element.name)
//   })
  
//   const data = {
//       labels: driverLabel,
//       datasets: [
//         {
//           label: 'Comparison with Lewis',
//           borderColor: randDarkColor(),
//           backgroundColor: randDarkColor(),
//           borderWidth: 2,
//           fill: false,
//           data: competitiveDriversList.map((element, _) => {return (element.total_similarity_with_lewis)}),
//         },
//       ]
//       };  
  
//     return GroupedBar("Similarity Comparison", "", data, options)
//   }

//     return (
//         <div>
//                 <Header/>
//                 {generateCompetitiveDriversList(competitiveDriversList)}
//                 <div className="main-block">
//                     {raceWiseComparisonLineChart()}
//                 </div>
//                 <div className="main-block">
//                     {ageWiseComparisonBarChart()}
//                 </div>
//                 <div className="main-block">
//                 {CompetitiveGroupedBarChart()}
//                 </div>
//         </div>
//     )

// }

// export default PageC1