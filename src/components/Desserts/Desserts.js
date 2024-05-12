import React from 'react'
import { Box, Button, Container, IconButton, Stack, Typography } from "@mui/material";
import "./Desserts.css";
import { Link, useNavigate } from "react-router-dom";
// import Link from "@mui/material/Link";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Dataset from "../Dataset/Dataset";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { ReactComponent as VegIcon } from "../../Assets/Images/icons/veg.svg"
import { ReactComponent as NonVegIcon } from "../../Assets/Images/icons/non-veg.svg"
import SvgIcon from '@mui/material/SvgIcon';
import {  useDispatch, useSelector } from 'react-redux';
import {addItemInCart,removeItemFromCart,increaseQuantity, decreaseQuantity,} from '../../Redux/CartSlice'
import toast from "react-hot-toast";
import { updateUserSliceOnCartData } from "../../Redux/Actions";


function Desserts() {
  const windowWidth= useSelector((state)=>state.windowWidth.width)
  const ItemsInCartId = useSelector((state)=>state.cartItems.ItemsInCartId)
  const isloggedin = useSelector((state) => state.UserData.LoggedInId);
  const dispatch = useDispatch();
  const navigation = useNavigate();

    function NameComponent(name) {
      
      const truncatedName = windowWidth>1600?(name.length > 25 ? name.substring(0, 20) + '...' : name):(name.length > 20 ? name.substring(0, 15) + '...' : name);
    
        return <div> {truncatedName}</div>;
      }
      function HandleAddBtn(ItemDetails) {
        if(isloggedin ==0 ){
          toast.error('Pls Login First to Access Your Cart')
          navigation('/login')
        }else{
          dispatch(addItemInCart(ItemDetails));
          dispatch(updateUserSliceOnCartData())
          console.log("dispach fn");
        }
      }
      function addItemHandeler(product_id) {
        dispatch(increaseQuantity(product_id));
        dispatch(updateUserSliceOnCartData())

      }
      function removeItemHandeler(product_id) {
        dispatch(decreaseQuantity(product_id));
        dispatch(updateUserSliceOnCartData())

      }
     
      return (
        <div className="AllCategory-section">
          <Container className="AllCategory-container">
            <Box className="AllCategory-title">
              <Typography variant="h1">Desserts & Beverages</Typography>
              <Link to="allCategories/desserts-and-beverages-by-behrouz" color="inherit">
                See All
                <ArrowRightIcon></ArrowRightIcon>
              </Link>
            </Box>
    
            <Box className="AllCategory-carousal">
              <Box className="position-wraper">
                <Swiper
                  className="SahiBiryanies-swiper"
                  slidesPerView={"auto"}
                  spaceBetween={18}
                  keyboard={{
                    enabled: true,
                  }}
                  //   navigation={true}
                  navigation={{
                    prevEl: ".custom-swiper-Desserts-button-prev", // Bind custom prev button
                    nextEl: ".custom-swiper-Desserts-button-next", // Bind custom next button
                  }}
                  modules={[Keyboard, Pagination, Navigation]}
                  //   className="mySwiper"
                >
                  {Dataset[6].render_data.map((DessertsItem) => {
  const thisItemCount =ItemsInCartId?.filter((id) => id == DessertsItem.product_id).length;

                    return (
                      <SwiperSlide className="SahiBiryanies-slide-card">
                        <Box className="SahiBiryanies-slide-cardInner-img">
                          <img
                            className="SahiBiryanies-slide-img"
                            src={DessertsItem.product_imageUrl}
                          ></img>
                        </Box>
                        <Box className='sahi-itemDiscription' >
                        
                         <Box >
                         <SvgIcon sx={{fontSize:'14px',marginRight:'10px'}} component={DessertsItem.is_veg?VegIcon:NonVegIcon} viewBox="0 0 10 10" />
                          <Typography>
                            {NameComponent(DessertsItem.product_name)}
                          </Typography>
                         </Box>
                         <Box className='price-add-box'>
                            <Box><Typography><span>₹</span>{DessertsItem.price}</Typography></Box>
                            <Box>
                        {thisItemCount >= 1
                              ?<Box  >
                              <Stack direction="row" className='add-remove-countbtn'  spacing={1}>
                                <IconButton onClick={()=> addItemHandeler(DessertsItem.product_id)} aria-label="add" color="success">
                                  <AddIcon />
                                </IconButton>
                                {thisItemCount}
                                <IconButton
                                  aria-label="remove"
                                  onClick={()=> removeItemHandeler(DessertsItem.product_id)}
                                  color="error"
                                >
                                  <RemoveIcon />
                                </IconButton>
                              </Stack>
                            </Box>
                              :  <Button
                              className="incertItem-cart"
                              variant="outlined"
                              onClick={() => HandleAddBtn(DessertsItem)}
                              style={{
                                color: "rgb(189, 162, 110)",
                                borderColor: "rgb(189, 162, 110)",
                              }}
                            >
                             
                              Add
                            </Button>}
                          
                         
                        </Box>
                         </Box>
                         
                        </Box>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
                <button className="custom-swiper-Desserts-button-prev swiper-prev-style">
                  <KeyboardArrowLeftIcon
                    sx={{ fontSize: "27px" }}
                  ></KeyboardArrowLeftIcon>
                </button>
                <button className="custom-swiper-Desserts-button-next swiper-next-style">
                  <KeyboardArrowRightIcon
                    sx={{ fontSize: "27px" }}
                  ></KeyboardArrowRightIcon>
                </button>
              </Box>
            </Box>
          </Container>
          
        </div>
      );
}

export default Desserts