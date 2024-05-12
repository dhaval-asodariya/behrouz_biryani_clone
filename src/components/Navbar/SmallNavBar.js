
import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Box, Button, Container, SvgIcon, Toolbar, Typography } from "@mui/material";
import logo from "../../Assets/Images/bb-brandcolor-logo.svg";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import './SmallNavBar.css'
import MobileBottomNev from './MobileBottomNev'
import CartBarBottom from "../CartBarBottom/CartBarBottom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";





function SmallNavBar() {
  const logginId = useSelector((state)=>state.UserData.LoggedInId);
  const LogedInData =useSelector((state)=>state.UserData.LoggedInObj)[0]

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
           <Link to={`/dashboard/${LogedInData?.id}`}>
         <Button className="snav-signup-btn" style={{ color: 'rgb(189, 162, 110)', borderColor: 'rgb(189, 162, 110)' }} variant="outlined"><AccountCircleOutlinedIcon sx={{fontSize:'19px',marginRight:'6px'}}/>{LogedInData.name}</Button></Link>
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

