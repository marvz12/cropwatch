import React, { useState, useEffect} from "react";
import axios from 'axios';
import { Navigate } from "react-router-dom";    
import { connect } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
//import { dataSample } from "../data/sampleData";
//import { MultiInputTimeRangeField } from '@mui/x-date-pickers-pro/MultiInputTimeRangeField';
//import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DatePicker from "react-datepicker";
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import '../css/style.css';








const DataGridComponent  = ({ isAuthenticated }) => {
  

    

    

    const darkTheme = createTheme({
        palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
        },
    });

   


    
    const [data, setData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [originalData, setOriginalData] = useState([]);

    

    

    useEffect(() => {
        const url = `${process.env.REACT_APP_API_URL}/api/fruitflygrid/`;

        axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        })
        .then(response => {
            console.log('Data fetched successfully');
            setData(response.data);
            setOriginalData(response.data); // Save a copy of the original data
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        })
    }, []);

    if(!isAuthenticated) {
        return <Navigate to='/login' />
    }

    const columns = [
        {field: 'id', headerName: 'ID'},
        {field: 'name', headerName: 'Class Name', flex: 1, cellClassName: 'name-column--cell'},
        {field: 'avg_count', headerName: 'AvgCount', type: 'number', headerAlign: 'left', align: 'left'},
        {field: 'time_stamp', headerName: 'Time', flex: 1, cellClassName: 'date-colums--cell'},
        {field: 'date', headerName: 'Date', flex: 1, cellClassName: 'date-colums--cell'}
   ]

   const rows = data.map(item => ({
    id: item.id,
    name: item.name,
    avg_count: item.avg_count,
    time_stamp: item.time_stamp,
    date: item.date
    }));

    const handleFilter = () => {
        try {
            const selectedDateFormatted = new Date(selectedDate).toLocaleDateString('en-US'); // Declare selectedDateFormatted
    
            const filteredData = originalData.filter(item => { // Use originalData for filtering
                const itemDate = new Date(item.date).toLocaleDateString('en-US');
    
                return itemDate === selectedDateFormatted;
            });
    
            if (filteredData.length === 0) {
                console.log('No data found for the selected date');
            } else {
                console.log(`Filtered data for date ${selectedDateFormatted}: `, filteredData);
            }
    
            setData(filteredData);
        } catch (error) {
            console.error('Error occurred while filtering data: ', error);
        }
    }

    if (!data) {
        return <div>Loading...</div>;
      }

    //const getRowId = (row) => row.id;

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
                                        F R U I T F L Y
                                    </Typography>
                                    <Typography className="reverse-shadow-text" variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', fontSize: '20px', display: 'flex', marginLeft: '25px' }}> D A T A</Typography>
                                </Toolbar>
                            </AppBar>
                        </Box>
                    </Box>
                    <div style={{ color: 'white', marginBottom: '10px', marginTop: '10px' }}>Select Date : <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)}/> 
                    <Button onClick={handleFilter} size="large" variant="outlined" sx={{ marginLeft: 10, flexGrow: 1 }}>Apply Filter</Button></div>
                    
                    <Box 
                        m='20px 0 0 0'
                        height='65vh'
                        sx={{
                            '& .MuiDataGrid-root': {
                                border: 'none',
                            },
                            '& .MuiDataGrid-cell': {
                                borderBottom: 'none'
                            },
                            '& .name-column--cell': {
                                color: '#689f38',
                                display: 'flex',    
                                justifyContent: 'center'
                                
                                
                            },
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#424242',
                                borderBottom: 'none',
                                
                            },
                            '& .MuiDataGrid-footerContainer': {
                                backgroundColor: '#424242',
                                borderTop: 'none'
                            },
                            

                        }}>
                        <DataGrid 
                            rows={rows}
                            columns={columns}
                            sortModel={[
                                { field: 'id',
                                  sort: 'asc'},
                            ]}
                            sx={{
                                fontSize: '12px'
                            }} />
                    </Box>
                </div>
            </ThemeProvider>
        </div>
  );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps, {  })(DataGridComponent);
