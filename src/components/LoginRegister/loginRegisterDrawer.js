import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Login from './Login';
import SignUp from './SignUp'
import { useLocation, useNavigate } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';


export default function FormDialog() {
const [openLoginDrawer, setOpenLoginDrawer] = React.useState(true);
const [isLoginPage, setisLoginPage] = React.useState(true)
const location = useLocation()
const navigation = useNavigate()
React.useEffect(()=>{
    if(location.pathname == '/login'){
        setisLoginPage(true)
    }else{setisLoginPage(false)}
})
  const handleClickOpen = () => {
    setOpenLoginDrawer(true);
  };

  const handleClose = () => {
    setOpenLoginDrawer(false);
    navigation('/')
  };

  const useStyles = makeStyles({
    dialogPaper: {
      minHeight: '300px !important',
    },
  });
  const classes = useStyles();

  return (
    <React.Fragment >
      
      <Dialog
    //   maxWidth='xs !important'
    classes={{
      paper: classes.dialogPaper,
    }}
        sx={{maxWidth:'550px !important',margin:'auto',minHeight:'300px !important',}}
        open={openLoginDrawer}
        onClose={handleClose}
        // PaperProps={{
        //   component: 'form',
        //   onSubmit: (event) => {
        //     event.preventDefault();
        //     const formData = new FormData(event.currentTarget);
        //     const formJson = Object.fromEntries(formData.entries());
        //     const email = formJson.email;
        //     console.log(email);
        //     handleClose();
        //   },
        // }}
      >
        {isLoginPage?(<Login/>):(<SignUp/>)}
       
        {/* <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions> */}
      </Dialog>
    </React.Fragment>
  );
}
