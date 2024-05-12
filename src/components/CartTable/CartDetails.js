import React, { useEffect } from 'react'
import './CartDetails.css'
import { useDispatch, useSelector } from 'react-redux';
import {Box, Button, Container, IconButton, Stack, SvgIcon, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import {
    addItemInCart,
    removeItemFromCart,
    deleteItem,
    increaseQuantity,
    decreaseQuantity,
  } from "../../Redux/CartSlice";
import { ReactComponent as VegIcon } from "../../Assets/Images/icons/veg.svg"
import { ReactComponent as NonVegIcon } from "../../Assets/Images/icons/non-veg.svg"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import toast from 'react-hot-toast';


function CartDetails() {
    const ItemsInCartDetails = useSelector(
        (state) => state.cartItems.ItemsInCartDetails
      );
      const ItemsInCartId = useSelector((state) => state.cartItems.ItemsInCartId);
      const CartPrice = useSelector((state) => state.cartItems.CartPrice);

      useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on component mount
      }, []);
      const dispatch = useDispatch();
      function addItemHandeler(product_id) {
        dispatch(increaseQuantity(product_id));
      }
      function removeItemHandeler(product_id) {
        dispatch(decreaseQuantity(product_id));
      }

  return (
    <div>
        {ItemsInCartId.length === 0 ? (
        <div className="emptyCart-section">
          <Container className="emptyCart-Container">
            
            <Box className='emptyCart-p-button'>
              <AddShoppingCartOutlinedIcon sx={{fontSize:'100px'}}/>
              <Typography variant="h4" >Empty Cart</Typography>
              <Typography>Looks like you haven’t made your choice yet.</Typography>
              <Link to="/">
              <Button variant="contained">
                <ShoppingCartOutlinedIcon sx={{ fontSize: "20px" }} />{" "}
                 Brouse Menu
              </Button>
              </Link>
            </Box>
          </Container>
        </div>) 
        :(<div>
            <div className='cartItems-Container'>
                <div className='Cartitems-list'>
                  {ItemsInCartDetails.map((item, index) => {
                    const itemCount = ItemsInCartId.filter(
                      (id) => id === item.product_id
                    ).length;
                    return (
                     <div className='singleproduct-box'>
                        <div style={{display:'flex'}}>
                          <img src={item.product_imageUrl}/>
                        <div className='productName-discription'>
                            {/* <h2>{item.product_name}</h2>
                            <p>{item.small_description}</p> */}
                            <Box className='ProductDetails-details-title'>
                    
                        
                       
                    <SvgIcon sx={{fontSize:'15px',marginRight:'10px'}} component={item.is_veg?VegIcon:NonVegIcon} viewBox="0 0 10 12" />
                    {/* <SvgIcon sx={{fontSize:'17px',marginRight:'10px'}} component={VegIcon} viewBox="0 0 10 10" /> */}
                     <Typography variant='h6'>
                     
                     {item.product_name || item.name}
                     </Typography>
                    
                </Box>
                <Box className='ProductDetails-details-discription cart-item-discreption'>
                    <p>
                   {item.small_description.length > 70 ? item.small_description.substring(0, 130)+ "..." : item.small_description} 
                    </p>
                </Box>
                        </div>
                        </div>
                        <div className='productCount-price-crudActions'>
                            <p>₹{item.price}</p>
                            <Box  >
                              <Stack direction="row" className='add-remove-countbtn'  spacing={1}>
                                <IconButton onClick={()=> addItemHandeler(item.product_id)} aria-label="add" color="success">
                                  <AddIcon />
                                </IconButton>
                                {itemCount}
                                <IconButton
                                  aria-label="remove"
                                  onClick={()=> removeItemHandeler(item.product_id)}
                                  color="error"
                                >
                                  <RemoveIcon />
                                </IconButton>
                              </Stack>
                            </Box>
                        </div>
                     </div>
                    );
                  })}
                </div>
                <div className='cartPrice-n-checkout'>
                    <div className='yourCart-text'>
                        <p>YOUR CART</p>
                        <h3>SUMMARY</h3>
                        <p style={{color:'black'}}>Total Items: {ItemsInCartId.length}</p>
                    </div>
                    <div className='totalPrice-n-btn'>
                        <p>Total Amount: <span> ₹{CartPrice}</span></p>
                        <Button variant="contained" onClick={() =>toast.success("Your order is placed successfully.")}>
                <ShoppingCartOutlinedIcon sx={{ fontSize: "20px" }} />{" "}
                 Checkout Now
              </Button>
                    </div>
                </div>
            </div>

        </div>)}

    </div>
  )
}

export default CartDetails