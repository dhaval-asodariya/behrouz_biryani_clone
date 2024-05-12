import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Padding } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setLoggedInId } from "../../Redux/UserDataSlice";
import { updateCartSliceOnUserData } from "../../Redux/Actions";

const MadeWithLove = () => (
    <Typography variant="body2" color="textSecondary" align="center">
      Built with love by Asodariya Dhaval </Typography>
  
  );
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
  root: {
    // width:'100%',
    // margin:'10px,0 !important',
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
    // height: "90vh"
  },
  paper: {
    // minHeight:'110% !important',

    margin: theme.spacing(6, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"

  },
  avatar: {
    margin: theme.spacing(1),
    // backgroundColor: theme.palette.secondary.main
    backgroundColor:" rgb(189, 162, 110) !important",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Login = () => {
  const classes = useStyles();
  const navigation = useNavigate()
  const dispatch = useDispatch()
 const[userLogInData, setUserLogInData] = useState({
  userName:'',password:'',
 })
  const AllUserData = useSelector((state)=>state.UserData.AllUserData)
  const cartitemsid = useSelector((state)=>state.cartItems.ItemsInCartId)


function submitHandeler(e){
  e.preventDefault();
  const matchData =AllUserData.filter((data)=>data.userName == userLogInData.userName && data.password == userLogInData.password )
const relatedData = AllUserData.filter((data)=>data.userName == userLogInData.userName || data.password == userLogInData.password )
  if(matchData.length>0){
    toast.success(`wellcome, ${userLogInData.userName} to Dashboard`)
    navigation(`/dashboard/${matchData[0].id}`)
    dispatch(setLoggedInId(matchData[0].id))
    dispatch(updateCartSliceOnUserData())
    console.log('cartitemsid',cartitemsid)
  }else if(matchData==0 &&relatedData.length>0){
    toast.error('UserName or Password is Wrong, pls try Again')
  }
  else{
    toast.error('you are not registered, pls signUp')
    navigation(`/signup`)

  }
}
console.log('cartitemsid',cartitemsid)

function inputChangeHandeler(e){
  console.log("inputChangeHandler called")

const {name , value}= e.target;
console.log("name",name,value)

setUserLogInData((prev)=>{
return {...prev,[name]:value}
})
console.log("inputChange",userLogInData.userName)

}
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
          <div id='loginForm' className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h1">
              Sign in
            </Typography>
            <form className={classes.form} >
              <TextField
              onChange={(e)=> inputChangeHandeler(e)}
              value={userLogInData.userName}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="userName"
                label="userName"
                name="userName"
                autoComplete="UserName"
                autoFocus
              />
              <TextField
              onChange={(e)=> inputChangeHandeler(e)}
              value={userLogInData.password}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                onClick={(e)=>submitHandeler(e)}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body1">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup" variant="body1">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <MadeWithLove />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
