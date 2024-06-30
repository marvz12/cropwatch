import React from "react";
import { Link, Navigate } from "react-router-dom";    
import { connect } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import '../css/style.css';
import { Container } from "@mui/material";
import Charts from "../components/charts";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import DataGridComponents from '../components/dtResult'


const DashBoard  = ({ isAuthenticated }) => {
  

        if(!isAuthenticated) {
        return <Navigate to='/login' />
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
                <div className="container p-4" style={{ backgroundColor: "rgba(35, 35, 34, 0.9)", borderRadius: "10px", overflow: 'auto'}}>
                    <Box>
                        <Box sx={{ flexGrow: 1 }}>
                            <AppBar position="static">
                                <Toolbar>
                                    <Typography className="reverse-shadow-text" variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', fontSize: '20px', display: 'flex', justifyContent: 'center' }}>
                                        D A S H B O A R D
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                        </Box>
                    </Box>
                    <Container  style={{ display: "flex" }}>

                        <Paper elevation={3} sx={{ width: 500, height: 300, mt: 2}}>
                            <Charts />
                            
                        </Paper>
                        <Card sx={{ maxWidth: 345, ml: 3, mt: 2 }}>
                            
                            <CardContent>
                                <Typography gutterBottom variant="h3" component="div" sx={{display: 'flex', justifyContent: 'center' }}>
                                CHART
                                </Typography>
                                <Typography variant="body3" color="text.secondary" sx={{display: 'flex', textAlign: 'center' }}>
                                This table shows the counting results of the rough estimation of the existing numbers of the fruit flies in a chart form 
                                
                                
                                </Typography>
                                    <br></br>
                                    <br></br>
                                <Typography variant="body3" color="text.secondary" sx={{display: 'flex', textAlign: 'center' }}>
                                Press CHART for a better view of the chart.
                                </Typography>
                                    <br></br>
                                    <br></br>
                            </CardContent>
                            <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                             <Button size="large" variant="outlined">
                             <Link to='/chart' style={{ color: 'inherit' }}>Chart</Link>
                             </Button>
                            </CardActions>
                        </Card>
                        
                    </Container>
                    <br></br> <br></br>
                    <Container  style={{ display: "flex" }}>
                        <Card sx={{ maxWidth: 345, mr: 3, mt: 2 }}>
                            
                            <CardContent>
                                <Typography gutterBottom variant="h3" component="div" sx={{display: 'flex', justifyContent: 'center' }}>
                                RESULTS
                                </Typography>
                                <Typography variant="body3" color="text.secondary" sx={{display: 'flex', textAlign: 'center' }}>
                                The results table will show an overall overview of information regarding the data collected such as: class, average count, time and date through the system's analysis which serves as the statistical report of the system.
                                </Typography>
                                <br></br>
                                <br></br>
                                <Typography variant="body3" color="text.secondary" sx={{display: 'flex', textAlign: 'center' }}>
                                Press RESULTS for more intricate details.
                                </Typography>
                                    
                            </CardContent>
                            <CardActions style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', height: '20%' }}>
                             <Button size="large" variant="outlined">
                                    <Link to='/dataGrid' style={{ color: 'inherit'}}>Results</Link>
                            </Button>
                            </CardActions>
                        </Card>
                        <Paper elevation={3} sx={{ width: 500, height: 400, mt: 2, overflow: 'auto'}}>
                            <DataGridComponents />
                            
                        </Paper>
                    </Container>
                   
                </div>
                
            </ThemeProvider>
        </div>
  );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps, {  })(DashBoard);
