import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth.js';
import '../css/style.css';


import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const Navbar = ({ isAuthenticated, logout }) => {

  
  const navigate = useNavigate();
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElLeft, setAnchorElLeft] = React.useState(null);

  const handleChange = (event) => {
    
  
    if (!event.target.checked) {
      logout();
    }
    
    else {
        navigate('/login');
    }
  };
  

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
 

  const handleCloseRight = () => {
    setAnchorEl(null);
 
  };
  const handleCloseLeft = () => {
    setAnchorElLeft(null);
 
  };


  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });

  return (
    
    <Box sx={{ flexGrow: 1 }}>
        <ThemeProvider theme={darkTheme}>
            <AppBar position="static">
                <Toolbar>
                {isAuthenticated && (
                <div>
                  <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      aria-controls="menuLeft"
                      aria-haspopup="true"
                      onClick={setAnchorElLeft}
                      sx={{ mr: 2 }}
                  >
                      <MenuIcon /> 
                  </IconButton>
                    <Menu
                          id="menuLeft"
                          anchorEl={anchorElLeft}
                          anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                          }}
                          keepMounted
                          transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                          }}
                          open={Boolean(anchorElLeft)}
                          onClose={handleCloseLeft}
                        >
                          <MenuItem onClick={handleCloseLeft}>
                            <Link className='btn btn-lg' style={{ color: 'inherit' }} to='/analysis' role='button'> Live Video </Link>
                          </MenuItem>
                          <MenuItem onClick={handleCloseLeft}>
                            <Link className='btn btn-lg' style={{ color: 'inherit' }} to='/dataGrid' role='button'> Results </Link>
                          </MenuItem>
                          <MenuItem onClick={handleCloseLeft}>
                            <Link className='btn btn-lg' style={{ color: 'inherit' }} to='/chart' role='button'> Chart </Link>
                          </MenuItem>
                      </Menu>
                    </div>
                  )}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1,  }}>
                    <Link className='btn btn-lg reverse-shadow-text' style={{ color: 'inherit', fontWeight: 'bold', fontSize: '20px' }} to='/dashboard' role='button'> CROPWATCH </Link>
                </Typography>
                {
                    <Switch
                    checked={isAuthenticated}
                    onChange={handleChange}
                    aria-label="login switch"
                    />
                }
                {isAuthenticated ? 'Logout' : 'Login'}
                {isAuthenticated && (
                    <div>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                        sx={{ ml: 2 }}
                        
                    >
                        <AccountCircle />
                    </IconButton>
                    {/* <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseRight}
                    >
                        <MenuItem onClick={handleCloseRight}>Profile</MenuItem>
                        <MenuItem onClick={handleCloseRight}>My account</MenuItem>
                    </Menu> */}
                    </div>
                )}
                </Toolbar>
            </AppBar>
            
        </ThemeProvider>
        
    </Box>

    
    
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);
