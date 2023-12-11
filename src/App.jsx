
//import './App.css'
import supabase from './config/supabaseClient'
//import { AppBar } from '@mui/material';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import {Link, Outlet} from 'react-router-dom'
import './index.css'
import logo from './images/logo.png'

function App() {

 console.log(supabase);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <img
              src={logo}
              alt="Logo"
              style={{ width: '100px', marginRight: '20px' }}
            />
            <nav style={{ display: 'flex', gap: '20px' }}>
              <Link to={"/"} style={{ textDecoration: 'none', color: 'white' }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Home</Typography>
              </Link>
              <Link to={"/Happenings"} style={{ textDecoration: 'none', color: 'white' }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Tapahtumat</Typography>
              </Link>
              <Link to={"/Users"} style={{ textDecoration: 'none', color: 'white' }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Käyttäjät</Typography>
              </Link>
              <Link to={"/Associations"} style={{ textDecoration: 'none', color: 'white' }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Harrastukset</Typography>
              </Link>
            </nav>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
     
    </>
  )
}

export default App
