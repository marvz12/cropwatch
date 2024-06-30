import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";    
import { connect } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ChartsComponent from '../components/charts';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import { Paper } from "@mui/material";
import '../css/style.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Button from '@mui/material/Button';

// isAuthenticated
const Chart  = ({ isAuthenticated }) => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [data, setData] = useState([]);
    const [allData, setAllData] = useState([]);

    useEffect(() => {
        const url = `${process.env.REACT_APP_API_URL}/api/fruitfly/`;

        axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        })
        .then(response => {
            // Parse the dates and sort the data
            response.data.forEach(d => {
                d.date = new Date(d.date);
            });
            response.data.sort((a, b) => a.date - b.date);
        
            console.log(response.data);
            setAllData(response.data);  // Populate allData with the fetched data
            setData(response.data);  // Set data to all the fetched data
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        })
    }, []);
    
        if(!isAuthenticated) {
        return <Navigate to='/login' />
        }

        function applyFilter() {
            const filteredData = allData.filter(item => {
                const itemDate = new Date(item.date);
                const startDateWithoutTime = new Date(startDate.setHours(0, 0, 0, 0));
                const endDateWithoutTime = new Date(endDate.setHours(23, 59, 59, 999));
        
                return itemDate >= startDateWithoutTime && itemDate <= endDateWithoutTime;
            });
            console.log(filteredData)
            setData(filteredData);
        }

    const darkTheme = createTheme({
        palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
        },
    });


    return (
        <div className="login-page" style={{ display: 'flex', justifyContent: 'center' }}>
            <br></br><br></br>
            <ThemeProvider theme={darkTheme}>
                <div className="container p-4" style={{ backgroundColor: "rgba(35, 35, 34, 0.9)", borderRadius: "10px" }}>
                    <Box>
                        <Box sx={{ flexGrow: 1 }}>
                            <AppBar position="static">
                                <Toolbar>
                                    <Typography className="reverse-shadow-text" variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', fontSize: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                                        B A R
                                    </Typography>
                                    <Typography className="reverse-shadow-text" variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', fontSize: '20px', display: 'flex', marginLeft: '25px' }}> C H A R T</Typography>
                                </Toolbar>
                            </AppBar>
                        </Box>
                    </Box>
                    <Box 
                        m='20px 0 0 0'
                        height='75vh'
                        >
                        <Paper>
                            <div className="container" style={{ display: 'flex', padding: 10}} margin= "20px">
                                <div>Start Date : <DatePicker selected={startDate} onChange={date => setStartDate(date)} /></div>
                                <div style={{ marginLeft: 60}}>End Date : <DatePicker selected={endDate} onChange={date => setEndDate(date)}/></div>
                                <Button onClick={applyFilter} size="large" variant="outlined" sx={{ marginLeft: 10, flexGrow: 1 }}>Apply Filter</Button>
                            </div>
                        </Paper>
                        <ChartsComponent data={data} sx={{
                            
                        }}/>
                    </Box>
                </div>
            </ThemeProvider>
        </div>
  );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps, {  })(Chart);
