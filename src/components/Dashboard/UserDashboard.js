import React, { useEffect, useState } from "react";
import { makeStyles, createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link, useLocation } from "react-router-dom";
import { Box, Button, Paper } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../Redux/UserDataSlice";
import { EmptyCartWhenLogout } from "../../Redux/CartSlice";


const drawerWidth = 260;
const theme = createMuiTheme({
    typography: {
      // Define your custom typography settings here
      fontSize: 20, // Adjust the font size as needed
      // You can also define different font sizes for various components
      h1: {
        fontSize: '2.1rem', // Example: Large title
      },
      body1: {
        fontSize: '1.4rem', // Example: Regular text
      },
      TextField:{
          Padding:'0',
      },
      button: {
        fontSize: '1.4rem',
        backgroundColor:" rgb(189, 162, 110) !important",
        color: "rgb(255, 255, 255)"// Example: Button text
      },
      // Add more typography settings as needed
    },
  });
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    padding:'20px'
  },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//   },
sideNav:{
    width:drawerWidth,
    background: "rgb(254, 250, 240)",
    minHeight:'500px',
},
outerpaper:{
    display:'flex',
    width:'100%',
},
//   drawerPaper: {
//     width: drawerWidth,
//     backgroundColor: "#E0E0E0",
//   },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
    // backgroundColor: "#1976D2",
    backgroundColor:'#04305d',
    color: "#FFF",
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  link: {
    color: "#424242",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: "#90CAF9",
    },
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const[dashData , setDashData]=  useState({})
  const dashData1 = useSelector((state)=>state.UserData.LoggedInObj)[0]
  const itemsInCart = useSelector((state)=>state.cartItems.ItemsInCart)

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, []);
  useEffect(()=>{
    setDashData(dashData1)

  },[dashData1])

function logoutCallHandeler(){
    dispatch(setLogout())
    dispatch(EmptyCartWhenLogout())
}
  return (
    <ThemeProvider theme={theme}>
    <div className={classes.root}>
    <Paper elevation={3} className={classes.outerpaper} >

      {/* <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      > */}
      <Paper elevation={3} className={classes.sideNav}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start',color:'rgb(189, 162, 110)',padding:'20px'}} className={classes.toolbar}>
          <Typography variant="h1" align="center">
            User Dashboard
          </Typography>
        </div>
        <Divider />
        <div className={classes.userInfo}>
          <Avatar className={classes.avatar} />
          <div style={{textAlign:'left'}}>
            <Typography variant="subtitle1">{dashData?.name || 'Dhaval'}</Typography>
            <Typography variant="body2">{dashData?.userName ||"dhaval@example.com"}</Typography>
          </div>
        </div>
        <Divider />
        <List>
          <ListItem button component={Link} to="/" className={classes.link}>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="#" className={classes.link}>
            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button component={Link} to="/cartTable" className={classes.link}>
            <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
            <ListItemText primary="Cart" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={logoutCallHandeler} component={Link} to="/login" className={classes.link}>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
        </Paper>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* Your content goes here */}
        {itemsInCart>0?(
            <div>
            <Box className='emptyCart-p-button'>
              <Typography variant="h3" >You have {itemsInCart} in your Cart!!</Typography>
              <Typography>Order It Now...</Typography>
              <Link to="/cartTable">
              <Button variant="contained">
                <ShoppingCartOutlinedIcon sx={{ fontSize: "20px" }} />{" "}
                View YourCart
              </Button>
              </Link>
            </Box>
            
            </div>
        ):(
            <Box className='emptyCart-p-button'>
              <Typography variant="h3" >You don’t have any orders!</Typography>
              <Typography>Looks like you haven’t made your choice yet.</Typography>
              <Link to="/">
              <Button variant="contained">
                <ShoppingCartOutlinedIcon sx={{ fontSize: "20px" }} />{" "}
                 Brouse Menu
              </Button>
              </Link>
            </Box>
        )
    }
      </main>
    </Paper>
    </div>
    </ThemeProvider>
  );
};

export default Dashboard;
