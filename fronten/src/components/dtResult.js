import React, { useState, useEffect} from "react";
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import '../css/style.css';






const DataGridComponents  = () => {
  
    const [data, setData] = useState([]);

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
            setData(response.data);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        })
    }, []);

    const columns = [
        {field: 'id', headerName: 'ID'},
        {field: 'name', headerName: 'Class', flex: 1, cellClassName: 'name-column--cell'},
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

    return (
        
        <div className="container p-4" style={{ backgroundColor: "rgba(35, 35, 34, 0.9)", borderRadius: "10px" }}>
            
            <Box 
                m='20px 0 0 0'
                height='75vh'
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
            
        
    );
};

export default DataGridComponents;
