import React, { useState } from "react";
import { Navigate } from "react-router-dom";    
import { connect } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import '../css/style.css';
import Paper from '@mui/material/Paper';






const Analysis  = ({ isAuthenticated }) => {
    
    

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
                <div className="container p-4" style={{ backgroundColor: "rgba(35, 35, 34, 0.9)", borderRadius: "10px", overflow: 'auto' }}>
                    <Box>
                        <Box sx={{ flexGrow: 1 }}>
                            <AppBar position="static">
                                <Toolbar>
                                    <Typography className="reverse-shadow-text" variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', fontSize: '30px', display: 'flex', justifyContent: 'flex-end', marginRight: '20px' }}>
                                        L I V E 
                                    </Typography>
                                    <Typography className="reverse-shadow-text" variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', fontSize: '30px', display: 'flex', justifyContent: 'flex-start', marginLeft: '20px' }}>
                                        V I D E O 
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                        </Box>
                    </Box>
                    
                    <br></br> 
                    <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
                        <Box>
                            
                            <Paper elevation={3} sx={{ width: 700, height: 550, justifyContent: 'center', overflow: 'hidden', alignContent: 'center' }}>
                                
                                <div id="videoDiv" className="container" style={{ display: 'flex', alignContent:'center', alignItems:'center', justifyContent: 'center', marginTop: '35px'}}>

                                {/* <iframe width="700" height="550" src="http://139.162.25.226:5080/LiveApp/play.html?name=2BWQbAeudv7e1711181771934" frameborder="0" allowfullscreen></iframe> */}
                                <iframe width="700" height="550" src="https://www.youtube.com/embed/live_stream?channel=UCGiq4oMu5_XVemcUnII4RGg" frameborder="0" allowfullscreen></iframe>

                                </div>
                                
                            </Paper>
                        </Box>
                    </div>
                    
                </div>
            </ThemeProvider>
        </div>
  );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated

    
})


export default connect(mapStateToProps, {  })(Analysis);
