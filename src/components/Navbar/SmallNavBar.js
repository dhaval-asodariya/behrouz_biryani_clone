
import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, SvgIcon, Toolbar, Typography } from "@mui/material";
import logo from "../../Assets/Images/bb-brandcolor-logo.svg";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import './SmallNavBar.css'
import MobileBottomNev from './MobileBottomNev'
import CartBarBottom from "../CartBarBottom/CartBarBottom";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AccountCircle } from "@mui/icons-material";
import { setLogout } from "../../Redux/UserDataSlice";
import { EmptyCartWhenLogout } from "../../Redux/CartSlice";




function SmallNavBar() {
  const logginId = useSelector((state)=>state.UserData.LoggedInId);
  const LogedInData =useSelector((state)=>state.UserData.LoggedInObj)[0]
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  function handleCloseAppDrawer(){
  setAnchorEl(null);
  }
  function handleMenuCloseTOHome(){
  setAnchorEl(null);
  navigation('/')
  }
 function handleMenuCloseToDashboard(){
  setAnchorEl(null);
  navigation(`/dashboard/${LogedInData?.id}`)
 }
 function handleMenuCloseToLogout(){
  setAnchorEl(null);
  dispatch(setLogout())
  dispatch(EmptyCartWhenLogout())
  navigation('/')
 }
 function handleMenu(event){
  setAnchorEl(event.currentTarget);
 }
  return (
    <div style={{}}>
      <AppBar
        sx={{
          backgroundColor: "#fff",
          color: "black",
          padding: "14px 30px",
         
          height: "75px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
         position:'relative'
        }}
      >
        <Container  style={{maxWidth:'1440px',padding:'0 '}}>
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Box className='Snav-location'>
                <Box  className='location-svg'>
                <PlaceOutlinedIcon sx={{fontSize:'22px',color:'#bda26e'}}></PlaceOutlinedIcon>
                </Box>
                <Box className='location-text'>
                    <Box className='loc-city-icon'>
                        <Typography>Adajan...</Typography>
                        <KeyboardArrowDownIcon sx={{fontSize:'25px'}}></KeyboardArrowDownIcon>
                    </Box>
                    <Typography className="loc-address">Adajan FC, Surat</Typography>
                </Box>
            </Box>
            {logginId == 0 ?
             <Box className='Snav-signUp-btn'>
             <Link to='/signup'>
           <Button className="snav-signup-btn" style={{ color: 'rgb(189, 162, 110)', borderColor: 'rgb(189, 162, 110)' }} variant="outlined"><AccountCircleOutlinedIcon sx={{fontSize:'19px',marginRight:'6px'}}/> Sign Up</Button></Link>
           </Box>
           :
           <Box className='Snav-signUp-btn'>
           {/* <Link to={`/dashboard/${LogedInData?.id}`}> */}
         <Button className="snav-signup-btn" style={{display:'flex',alignItems:'center', color: 'rgb(189, 162, 110)', borderColor: 'rgb(189, 162, 110)' }} variant="outlined">
          {/* <AccountCircleOutlinedIcon sx={{fontSize:'19px',marginRight:'6px'}}/> */}
          <Typography sx={{fontSize:'15px'}}>{LogedInData.name}</Typography>
          
          <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{padding:'0',marginLeft:'10px'}}
              >
                <AccountCircle fontSize="25px" sx={{padding:'0 !important',fontSize:'15px !important',width:'1.5em',height:'1.5em'}}/>
              </IconButton>
              <Menu
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
                onClose={handleCloseAppDrawer}
              >
                <MenuItem sx={{fontSize:'16px !important'}} onClick={handleMenuCloseToDashboard}>My Profile</MenuItem>
                <MenuItem sx={{fontSize:'16px !important'}} onClick={handleMenuCloseTOHome}>Home</MenuItem>
                <MenuItem sx={{fontSize:'16px !important'}} onClick={handleMenuCloseToLogout}>Log Out</MenuItem>
                
              </Menu>
            </div>
          </Button>
          {/* </Link> */}

         </Box>
            }
           

          </Toolbar>
          {/* <CartBarBottom/> */}
          <MobileBottomNev/>
        </Container>
      </AppBar>
    </div>
  );
}

export default SmallNavBar
;

