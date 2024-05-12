import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createTheme, ThemeProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setAllUserData } from "../../Redux/UserDataSlice";

function MadeWithLove() { 
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Built with love by Asodariya Dhaval
    </Typography>
  );
}

const theme = createTheme({
    typography: {
        // Define your custom typography settings here
        fontSize: 26, // Adjust the font size as needed
        // You can also define different font sizes for various components
        h1: {
          fontSize: '2.5rem', // Example: Large title
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

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    backgroundColor:" rgb(189, 162, 110) !important",
    margin: theme.spacing(1),
    // backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignUp() {
  const classes = useStyles();
const navigation = useNavigate()
  const dispatch = useDispatch()
  const[userRegisteredData, setUserRegisteredData]= useState({
    name:'',userName:'',password:'',id:0,cartItems:[],cartItemsId:[],
  })
  const AllUserData = useSelector((state)=>state.UserData.AllUserData)
  function submitHandler(e){
    e.preventDefault()
    console.log("submitHandler called")
    if(AllUserData?.filter((data)=>data.userName== userRegisteredData.userName).length>0){
      toast.error('Change the UserName!');
    }else{
      dispatch(setAllUserData(userRegisteredData))
      navigation('/login')

    }
    console.log("alldata",AllUserData)
  }
 
  function inputChangeHandeler(e){
    console.log("inputChangeHandler called")

const {name , value}= e.target;
setUserRegisteredData((prev)=>{
  return {...prev,[name]:value}
})

  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form   className={classes.form} >
            <TextField
            onChange={(e)=>inputChangeHandeler(e)}
            value={userRegisteredData.name}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
            />
            <TextField
            onChange={(e)=>inputChangeHandeler(e)}
            value={userRegisteredData.userName}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="userName"
            />
            <TextField
            onChange={(e)=>inputChangeHandeler(e)}
            value={userRegisteredData.password}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <Button
              type="submit"
              onClick={(e)=>submitHandler(e)}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={3} mb={3}>
          <MadeWithLove />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
