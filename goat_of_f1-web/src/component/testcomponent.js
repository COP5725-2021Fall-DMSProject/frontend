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
        <table className="table" style={{position: 'relative'}}>
            <thead className="thead-dark">
                <tr>
                {Object.keys(driverData[0]).map((heading) => <th>{heading}</th>)} 
                </tr>
            </thead>
            <tbody>
            {driverData.map((row) => (
                <tr> {Object.keys(driverData[0]).map((heading) => <td>{row[heading]}</td>)} </tr>
            ))}
            </tbody>
        </table>
    );
  }
export default Driver;