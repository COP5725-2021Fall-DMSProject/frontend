import React, { useState, useEffect} from "react";
import "../App.css";
import axios from "axios";

const f1Url = "http://ergast.com/api/f1/drivers.json?=123";

function Driver() {
    const [driverData, setDriverData] = useState([{driverId: '',givenName:'', familyName:'',dateOfbirth:'',nationality:'',url:''}]);
  
    useEffect(() => {
        getDrivers();
    }, []);
  
    const getDrivers = async () => {
        const response = await axios.get(f1Url);
        setDriverData(response.data.MRData.DriverTable.Drivers);
    };

    return (
            <table className="table" style={
                {position: 'absolute',
                top: '100px',
                fontFamily: 'Arial, Helvetica, sans-serif',
                border: '1px solid black',
                // width: '100%'
            }
                }>
                <thead className="thead-dark">
                    <tr style={{border: '1px solid black'}}>
                    {Object.keys(driverData[0]).map((heading) => <th style={{border: '1px solid black'}}>{heading}</th>)} 
                    </tr>
                </thead>
                <tbody>
                {driverData.map((row) => (
                    <tr style={{border: '1px solid black'}}> {Object.keys(driverData[0]).map((heading) => <td style={{border: '1px solid black'}}>{row[heading]}</td>)} </tr>
                ))}
                </tbody>
            </table>
    );
  }
export default Driver;