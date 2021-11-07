import axios from 'axios'

export let getDrivers = async (year, setDriverData) => {
    const response = await axios.get(`http://ergast.com/api/f1/${year}/drivers.json`);
    setDriverData(response.data.MRData.DriverTable.Drivers);
};