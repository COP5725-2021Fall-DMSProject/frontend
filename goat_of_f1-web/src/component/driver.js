import React, { useState, useEffect} from "react";
import "../App.css";
import * as driverApis from "../api/driver"

function Driver() {
    const [driverData, setDriverData] = useState([{driverId: '',givenName:'', familyName:'',dateOfbirth:'',nationality:'',url:''}]);
    let year = 2017

    useEffect(() => {
        driverApis.getDrivers(2017, setDriverData);
    }, []);

    return (
        <table className="table" style={{position: 'absolute', top: 50}}>
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