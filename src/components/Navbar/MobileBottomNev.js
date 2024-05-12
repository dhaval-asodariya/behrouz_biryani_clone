import React, { useEffect, useState } from "react";
import '../../App.css'
import styled, { createGlobalStyle } from "styled-components";
import { Home, Bookmark, User, Calendar,ShoppingCart} from "react-feather";
import { BottomNavigation, BottomNavigationAction, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import SideBar_Sample from './SideBar_Sample'
import { Link, useNavigate } from "react-router-dom";
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const logginId = useSelector((state)=>state.UserData.LoggedInId);
  const LogedInData =useSelector((state)=>state.UserData.LoggedInObj)[0]
  const navigation = useNavigate();
  function HandleProfileOpen(){
    handelActiveBtn('Profile')
    logginId >0? navigation(`/dashboard/${LogedInData?.id}`):navigation('/login')
  }

  function HandleIsOpen(value){
    
    setIsOpen(value)
    handelActiveBtn('Order')
  }
    const [acliveBtn,setActiveBtn]=useState('Home')
    const windowDimension= useSelector((state)=>state.windowWidth.width)
function handelActiveBtn(clickedBtn){
    setActiveBtn(clickedBtn);
}


  const isMobile = windowDimension <= 800;
  const isMobileNavVisible = isMobile?'flex':'none'
  return (
    
<Box sx={{maxWidth:'100%',overflowX:'hidden'}}>
      <Box sx={{ backgroundColor: '#eeeeee', minHeight: '0vh' }}>
      <BottomNavigation
        sx={{
            display:isMobileNavVisible,
          position: 'fixed',
          bottom: 0,
          left:0,
          width: '100%',
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
          zIndex: 100,
        }}
      >
        <Link to='/'>
        <BottomNavigationAction
          label="Home"
          icon={<Home />}
          style={{ color: acliveBtn === 'Home' ? 'rgb(189, 162, 110)' : 'rgb(102, 102, 102)',flexDirection: 'column'  }}
          onClick={() => handelActiveBtn('Home')}
        >home</BottomNavigationAction>
        </Link>
        <Link>
        <BottomNavigationAction
          label="My Profile"
          icon={<User />}
          style={{ color: acliveBtn === 'Profile' ? 'rgb(189, 162, 110)' : 'rgb(102, 102, 102)',flexDirection: 'column'  }}
          onClick={()=>HandleProfileOpen()}
          
        ></BottomNavigationAction>
        </Link>
        <Link>
        <BottomNavigationAction
          label="Party Order"
          icon={<Calendar />}
          style={{ color: acliveBtn === 'Order' ? 'rgb(189, 162, 110)' : 'rgb(102, 102, 102)' }}
          onClick={() => HandleIsOpen(!isOpen)}
        />
        </Link>
        <Link to='cartTable'>
        <BottomNavigationAction
          label="Cart"
          icon={<ShoppingCart />}
          style={{ color: acliveBtn === 'Cart' ? 'rgb(189, 162, 110)' : 'rgb(102, 102, 102)' }}
          onClick={() => handelActiveBtn('Cart')}
        /></Link>
      </BottomNavigation>
      

    </Box>
    <SideBar_Sample isOpen={isOpen} HandleIsOpen={HandleIsOpen} ></SideBar_Sample>

    </Box>
  );
}

const Styles = {
  Wrapper: styled.main`
    background-color: #eeeeee;
    height: 0vh;
  `
};

const Navbar = {
  Wrapper: styled.nav`
    flex: 1;

    align-self: flex-start;

    padding: 1rem 3rem;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: white;
  `,
  Logo: styled.h1`
    border: 1px solid gray;
    padding: 0.5rem 1rem;
  `,
  Items: styled.ul`
    display: flex;
    list-style: none;
  `,
  Item: styled.li`
    padding: 0 1rem;
    cursor: pointer;
  `
};

const MobileNavbar = {
  Wrapper: styled(Navbar.Wrapper)`
    position: fixed;
    width: 100vw;
    bottom: 0;
z-index:100;
    justify-content: center;
  `,
  Items: styled(Navbar.Items)`
    flex: 1;
    padding: 0 2rem;

    justify-content: space-around;
  `,
  Item: styled(Navbar.Item)`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    font-size: 1.2rem;
  `,
  Icon: styled.span``
};

const CSSReset = createGlobalStyle`
  *,
  *::before, 
  *::after {
    margin: 0; 
    padding: 0;
    box-sizing: inherit;
  }

  html {
    font-size: 62.5%; /*1rem = 10px*/
    box-sizing: border-box;      
  }  

  body {
    font-size: 1.4rem;
    font-family: sans-serif;
  }
`;

export default App;
