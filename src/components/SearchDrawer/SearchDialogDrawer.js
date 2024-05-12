import React, { useEffect, useState } from "react";
import "./SearchDialogDrawer.css";
import Dataset from "../Dataset/Dataset";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  IconButton,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ReactComponent as VegIcon } from "../../Assets/Images/icons/veg.svg";
import { ReactComponent as NonVegIcon } from "../../Assets/Images/icons/non-veg.svg";
import { ReactComponent as star } from "../../Assets/Images/icons/green-star.svg";
import { Link, useNavigate } from "react-router-dom";

function SearchDialogDrawer({ openSearch, handleSearchClose }) {
  // const [open, setOpen] = useState(false);
  const [recentSearch, setRecentSearch] = useState(['free','gulab','paneer','veg','biryani','halwa']);
  const [searchText, setSearchText] = useState("");
  const [AllSearchedData, setAllSearchedData] = useState([]);
  const navigate = useNavigate();

  // let AllSearchedData = [];
  useEffect(() => {
    if (searchText.length === 0) {
      setAllSearchedData([]);
    } else {
      setAllSearchedData([]);

      for (let i = 1; i < Dataset.length; i++) {
        for (let j = 0; j < Dataset[i].render_data.length; j++) {
          // AllData.push(Dataset[i].render_data[j])

          if (
            Dataset[i].render_data[j]?.product_name
              ?.toLowerCase()
              .indexOf(searchText?.toLowerCase()) >= 0 ||
            Dataset[i].render_data[j]?.name
              ?.toLowerCase()
              .indexOf(searchText?.toLowerCase()) >= 0
          ) {
            setAllSearchedData((priv) => [...priv, Dataset[i].render_data[j]]);
            // AllSearchedData.push(Dataset[i].render_data[j]);
          }
        }
      }
    }

    console.log("AllSearchedData", AllSearchedData);
    console.log("searchText", searchText);
  }, [searchText]);
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
function HandleSearchedNavigate(searchData){
  handleSearchClose();
  navigate(`/product/${searchData.product_id || searchData.id}`)
}
  function ChangeRecentSearch() {
    setRecentSearch((priv) => [...priv, searchText]);
  }

  function HandelRe_SearchInput(searched) {
    setSearchText(searched);
  }
  const handleClose = () => {
    handleSearchClose();
  };
  function inputChangeHandel(e) {
    setSearchText(e.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    // const formData = new FormData(event.currentTarget);
    // const formJson = Object.fromEntries(formData.entries());
    // const searchText = formJson.searchText;
    // console.log(searchText);
    // handleClose();
    ChangeRecentSearch();
  };

  return (
    <React.Fragment>
      <Dialog
        sx={{ Height: "700px",maxHeight:'700px' }}
        open={openSearch}
        onClose={handleClose}
        component="form"
        onSubmit={handleSubmit}
      >
        <DialogTitle sx={{ fontSize: "16px" }}>Subscribe</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <IconButton aria-label="search">
              <SearchIcon sx={{ fontSize: "20px" }} />
            </IconButton>
            <TextField
              sx={{
                fontSize: "19px",
                "& input": {
                  fontSize: "17px",
                },
                width: "900px",
                maxWidth: "100%",
                margin: "0 auto",
              }}
              InputLabelProps={{ style: { fontSize: "17px" } }}
              autoFocus
              required
              margin="dense"
              id="name"
              name="searchText"
              label="Search Item"
              type="text"
              fullWidth
              variant="standard"
              value={searchText}
              onChange={inputChangeHandel}
            />
            <Button sx={{ fontSize: "16px" }} type="submit">
              Search
            </Button>
          </Box>
          <Box sx={{ marginTop: "20px" }}>
            <DialogContentText sx={{ fontSize: "16px" }}>
              {searchText.length === 0 ? (
                <Box>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <AccessTimeIcon sx={{ marginRight: "8px" }} />
                    Recent Search
                  </Typography>
                  {recentSearch?.map((searched) => {
                    return (
                      <Button
                        onClick={() => HandelRe_SearchInput(searched)}
                        sx={{ fontSize: "16px" }}
                      >
                        {searched}
                      </Button>
                    );
                  })}
                </Box>
              ) : (
                <Box>
                  {AllSearchedData?.map((searchData)=>{
                    return(
                      <Box sx={{ display: "flex",width:'100%' }} onClick={()=>HandleSearchedNavigate(searchData)} className="searcedItem">
                        <img
                          style={{ width: "56px", height: "56px" }}
                          src={searchData.image || searchData.product_imageUrl}
                          alt="alt"
                        ></img>
                        <Box className="itemDiscription-n-p-r-i">
                          {/* <Typography>{AllSearchedData[0]?.name}</Typography> */}
                          <Box className="ProductDetails-details-title">
                            <SvgIcon
                              sx={{ fontSize: "13px", marginRight: "10px" }}
                              component={VegIcon}
                              viewBox="0 0 10 10"
                            />
    
                            <Typography variant="h6">
                              {searchData.name || searchData.product_name}
                            </Typography>
                          </Box>
                          <Box className="itemDiscription-rat-price">
                            <div style={{padding:'0 6px',alignItems:'center'}} className="product-d-ratting">
                              <SvgIcon
                                sx={{ fontSize: "15px", marginRight: "5px" }}
                                component={star}
                                viewBox="0 0 13 13"
                              ></SvgIcon>
                              <Typography>4.3</Typography>
                            </div>
                            <Typography variant="h5">
                              <span>₹</span>
                              399
                            </Typography>
                          </Box>
                        </Box>
                        <Button variant="text">
                          <ChevronRightIcon />
                        </Button>
                      </Box>
                    )
                  })}
                 
                </Box>
              )}
            </DialogContentText>
          </Box>
        </DialogContent>
        {/* <DialogActions>
          <Button sx={{ fontSize: "16px" }} onClick={handleClose}>
            Cancel
          </Button>
          <Button sx={{ fontSize: "16px" }} type="submit">
            Subscribe
          </Button>
        </DialogActions> */}
      </Dialog>
    </React.Fragment>
  );
}

export default SearchDialogDrawer;
