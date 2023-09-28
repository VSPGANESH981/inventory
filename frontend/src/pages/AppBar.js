import * as React from 'react';
import { useNavigate, Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import '../assets/css/custom.css';
import { useAuth } from '../contexts/auth';

function ResponsiveAppBar(props) {
  const {currentUser , logout} = useAuth();
  const navigate = useNavigate();


  const onLogOut = async ()=>{
    await logout(()=>{
      navigate('/login');
    });
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          </Box>
          { currentUser && <Link to="/third-party" className='linkTag'>Third Party API</Link> }
          { currentUser && <Link to="/inventory" className='linkTag'>Inventory</Link> }
          { currentUser && <Link to="/profile" className='linkTag'>Profile</Link> }
          { currentUser && <Link to="/" onClick={ onLogOut} className='linkTag'>Logout</Link> }
          { !currentUser && <Link to="/login" className='linkTag'>Login</Link> }   
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
