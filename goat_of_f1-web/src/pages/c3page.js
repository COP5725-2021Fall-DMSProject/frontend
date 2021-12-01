import React, { useState, useEffect } from "react";
import Header from '../component/header'
import settings from "../settings";
import axios from "axios";
import { randDarkColor, getRegularColarList } from '../utils/utils'
import HorizontalBar from "../component/horizontalBar";
import { Line } from "react-chartjs-2";

function C3Page() {
    const [topDefenders, setTopDefenders] = useState([{name: [],driver_id: [],defend_point:[]}])
    const [topDefensiveRecord, setTopDefensiveRecord] = useState([{year:[],defender_id:[],defender_name : [],opponent_id : [],
      opponent_name : [],teammate_id : [],teammate_name : [],race_id : [],race_name : [],defend_point : []}])

    useEffect(() => {
        getTopDefenders();
        getDefensiveRecord();
    }, [])

    const getTopDefenders = async () => {
      const topDefendersUrl = settings.apiHostURL + '/c3/top10defender'
      // const response = await axios.get(topDefendersUrl)
      const fakeResponse = {
        name: ["Elon Musk", "Nick Young","Ryan Kelly"],
        driver_id: [750, 999,487],
        defend_point: [321, 300,200]
    };
      // setTopDefenders(response.data.result.data)
      setTopDefenders(fakeResponse)
  }

  const getDefensiveRecord = async () => {
    // const topDefensiveUrl = settings.apiHostURL + `/c3/top10record/${driverid}`
    // const response = await axios.get(topDefensiveUrl)
    const fakeResponse = {       
      year:[2015,2016,2017,2018, 2019],
      defender_id:["a", "b", "c", "d", "e"],
      defender_name : ["AAA", "BBB", "CCC", "DDD", "EEE"],
      opponent_id : [234, 567, 891, 246, 423],
      opponent_name : ["aaaa", 'bbbb', 'cccc', 'dddd', 'eeee'],
      teammate_id : [1, 2, 3, 4, 5],
      teammate_name : ["nnnn", "oooo", "pppp", "qqqq", "rrrr"],
      race_id : [222, 333, 444, 555, 666],
      race_name : ["first", "second", "third", "fourth", "fifth"],
      defend_point : [2, 6, 12, 5, 9],
      }
      // setTopDefensiveRecord(response.data.result.data)
      setTopDefensiveRecord(fakeResponse)
  }

  function PlotTopDefensiveRecord() {
    const options = {
      scales: {
          y: {
              beginAtZero: true
            }
          }
      };
      const data = {
        labels: topDefensiveRecord.year,
        datasets: [
          {
            label: 'Defensive Track Record',
            data: topDefensiveRecord.defend_point,
            borderColor: randDarkColor(),
            fill: false,
            cubicInterpolationMode: 'monotone',
            tension: 0.4
          },
        ],
        };

        return(
          <div className="c2-function-components">
          <div className='header'>
              <h4 className='title page-title' align='center'> Defensive Track Record</h4>
              <div className='links'>
              <a
                  className='btn btn-gh'
                  href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Line.js'
              >
              </a>
              </div>
          </div>
              <Line data={data}  options={options} />
          </div>
      )
    };

    function PlotTopDefenders() {
    const data = {
        labels: topDefenders.name,
        datasets: [
          {          
            label: 'Defensive points',
            data: topDefenders.defend_point,
            fill: false,
            backgroundColor: getRegularColarList(1)[3],
            borderColor: getRegularColarList(1)[3]
            },
          ],
        };
      
      return(
        <div className="c2-function-components">
            {HorizontalBar(`Top 10 Defenders`, ``, data, null)}
        </div>
    )
  }

      return(
        <div>
        <Header/>
        <div style={{
          marginTop: 100,
          marginLeft: 100,
          display: 'flex',
          flexDirection: 'column'
      }}>
      <div style={{height: 100}}/>
        {PlotTopDefenders()}
      </div>
        <div style={{
          marginTop: 100,
          marginLeft: 100,
          display: 'flex',
          flexDirection: 'column'
      }}>
      <div style={{height: 100}}/>
        {PlotTopDefensiveRecord()}
      </div>
      </div>
      )
}
      
export default C3Page;