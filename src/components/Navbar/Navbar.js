import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Badge, Box, Container, Toolbar, Typography } from "@mui/material";
import logo from "../../Assets/Images/bb-brandcolor-logo.svg";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CallIcon from "@mui/icons-material/Call";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuIcon from "@mui/icons-material/Menu";
import SideBar_Sample from './SideBar_Sample';
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";



function Navbar({handleSearchOpen}) {
  const [isOpen, setIsOpen] = useState(false);
  const [LogedInId , setLogedInId] = useState(0);
  const LoggedInId = useSelector((state)=>state.UserData.LoggedInId)
  // const AllUserData = useSelector((state)=>state.UserData.LoggedInId)
 const ItemsInCart = useSelector((state)=>state.cartItems.ItemsInCart)
 const LogedInData =useSelector((state)=>state.UserData.LoggedInObj)[0]
 useEffect(()=>{
  setLogedInId(LoggedInId);
  console.log('navbar logId',LoggedInId)
  console.log('navbar logdata',LogedInData)
 },[LoggedInId])
 
function HandleIsOpen(value){
  
  setIsOpen(value)

}


  return (
    <div style={{}}>
      <AppBar
        sx={{
          backgroundColor: "#fff",
          color: "black",
          padding: "14px 20px",
         
          height: "75px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
         position:'relative'
        }}
      >
        <Container  style={{maxWidth:'1440px',padding:'0 '}}>
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Box sx={{ display: "flex" }}>
              <Link to='/'>
              <img style={{ width: "100px" }} src={logo}></img>
              </Link>
              
              <Container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flexStart",
                  justifyContent: "center",
                }}
              >
                <Box display={"flex"}>
                  <LocationOnIcon
                    sx={{ height: "13px", width: "13px", color: "#bda26e" }}
                  />
                  <Typography sx={{ fontSize: "13px" }}>
                    Delivering at...
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#bda26e",
                  }}
                >
                  <Typography sx={{ fontSize: "14px" }}>395009</Typography>
                  <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                </Box>
              </Container>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CallIcon
                sx={{
                  color: "#bda26e",
                  border: "1px solid #bda26e",
                  borderRadius: "50%",
                  fontSize: "20px",
                  padding: "3px",
                  marginRight: "12px",
                }}
              ></CallIcon>
              
              <Box>
                <Typography sx={{ textAlign: "left", fontSize: "14px" }}>
                  <a
                    style={{ color: "#000", textDecoration: "none" }}
                    href="tel:2007700050050"
                  >
                    Call us at <br />
                    <strong>07700050050</strong>
                  </a>
                </Typography>
              </Box>

              <Box sx={{ margin: "0px 20px", color: "#bda26e" }} onClick={()=>handleSearchOpen()}>
                <SearchIcon sx={{ fontSize: "22px" }}></SearchIcon>
                <Typography sx={{ fontSize: "12px" }}>Search</Typography>
              </Box>
              <Box sx={{ margin: "0px 20px", color: "#bda26e",position:'relative' }}>
                <Link to='cartTable'>
                <Badge sx={{
    '& .MuiBadge-badge': {
      fontSize: '14px' 
    }
  }} badgeContent={ItemsInCart?ItemsInCart:null} color="success">
                <ShoppingCartOutlinedIcon color="action" sx={{ fontSize: "22px",color: "#bda26e" }}></ShoppingCartOutlinedIcon>
</Badge>
                
                </Link>
                
                <Typography sx={{ fontSize: "12px" }}>Cart</Typography>
                {/* <span style={{position:'absolute',top:'-12px',right:'-14px',color:'green',fontSize:'15px',border:ItemsInCart?'1px solid green':'0px',padding:'2px',borderRadius:'50%',width:'25px'}} className="CartItemCount">{ItemsInCart?ItemsInCart:null}</span> */}
              </Box>
              <Link to={LoggedInId ==0?'/login':`/dashboard/${LogedInData?.id}`}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContentL:'space-between',
                  padding: "0 16px",
                  borderRight:'1px solid #bda26e9e',
                  borderLeft:'1px solid #bda26e9e'
                }}
              >
                {/* <Avatar
                  sx={{ bgcolor: "#bda26e",fontSize:'20px'}}
                  alt="Remy Sharp"
                  src="/broken-image.jpg"
                >
                D
                </Avatar> */}
                <Avatar src="/broken-image.jpg" />
                {LogedInId ==0 ?(
                   <Typography sx={{fontSize:"18px",marginLeft:'10px',color:"#bda26e"}}>Sign In</Typography>
                ):(
                  <Typography sx={{fontSize:"19px !important",marginLeft:'13px !important',color:"#bda26e"}}>  {LogedInData?.name}</Typography>
                )}
               
              </Box>
              </Link>
              <Box sx={{ margin: "0px 20px", color: "#bda26e" }}>
                <MenuIcon onClick={()=>HandleIsOpen(!isOpen)} sx={{ fontSize: "22px" }}></MenuIcon>
                <Typography sx={{ fontSize: "12px" }}>My Profile</Typography>
              </Box>
            </Box>
          </Toolbar>
          <SideBar_Sample isOpen={isOpen} HandleIsOpen={HandleIsOpen} ></SideBar_Sample>
        </Container>
      </AppBar>
    </div>
  );
}

export default Navbar;
