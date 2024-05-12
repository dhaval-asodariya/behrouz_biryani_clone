import React, { useEffect, useState } from "react";
import "./DeliveryBar.css";
import deliveryBoy from "../../Assets/Images/icons/delivery boy.svg";
import { Box, Stack, Typography } from "@mui/material";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { useLocation } from "react-router";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

function DeliveryBar({isCart}) {
  const[isCartopen, setIsCartopen] = useState(false)
  const location = useLocation();
  useEffect(()=>{
    setIsCartopen(isCart);
    console.log("isCartopen",isCartopen)
    // if(location.pathname =="cartTable"){
    //   setIsCartopen(true)
    // }
  })
  return (
    <div className="subNevContainer">
      <Box className="subNevBox">
       { isCartopen?(
         <div role="presentation" >
         <Breadcrumbs sx={{fontSize:'16px'}} aria-label="breadcrumb">
           <Link underline="hover" color="inherit" href="/">
             Home
           </Link>
           
           <Link
             underline="hover"
             color="text.primary"
             href="/cartTable"
             aria-current="page"
           >
             Checkout
           </Link>
         </Breadcrumbs>
       </div>
          
        ):(
          <Stack className="stack-contain" direction="row" spacing={2}>
          <Box className="shipboy-text">
            <img src={deliveryBoy}></img>
            <Typography sx={{ fontWeight: "600" }}>Delivery</Typography>
          </Box>
          <Box className='shipTimeZone'>
            <Typography>Now</Typography>
            <KeyboardArrowDownOutlinedIcon></KeyboardArrowDownOutlinedIcon>
          </Box>
        </Stack>
        )}
        
      </Box>
    </div>
  );
}

export default DeliveryBar;
