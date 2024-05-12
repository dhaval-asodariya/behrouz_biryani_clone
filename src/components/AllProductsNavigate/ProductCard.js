import React from 'react'
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Divider, IconButton, Stack, SvgIcon, Typography } from "@mui/material";
import { ReactComponent as VegIcon } from "../../Assets/Images/icons/veg.svg"
import { ReactComponent as NonVegIcon } from "../../Assets/Images/icons/non-veg.svg"
import { ReactComponent as star } from "../../Assets/Images/icons/green-star.svg"
import { useDispatch, useSelector } from 'react-redux';
import {addItemInCart,increaseQuantity,decreaseQuantity} from '../../Redux/CartSlice'
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Link, useNavigate } from 'react-router-dom';
import { Scale, Transform } from '@mui/icons-material';
import toast from "react-hot-toast";
import { updateUserSliceOnCartData } from "../../Redux/Actions";

function ProductCard({product}) {
  const ItemsInCartId = useSelector((state) => state.cartItems.ItemsInCartId);
  const thisItemCount =ItemsInCartId.filter((id) => id == product.product_id).length;
  const isloggedin = useSelector((state) => state.UserData.LoggedInId);
const dispatch = useDispatch();
const navigation = useNavigate();
  function HandleAddBtn(ItemDetails){
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
    
    <div style={{transition:" transform 0.3s ease 0s"} }>
        <Card sx={{ maxWidth: 270 }}>
        <Link key={product.product_id} to={`/product/${product.product_id}`}>
        <CardActionArea>
                            <CardMedia
                              component="img"
                              object-fit= "inherit"
                              height="150"
                              image={product.product_imageUrl}
                              alt="green iguana"
                            />
                            <CardContent sx={{paddingBottom:'0'}}>
                              <Typography gutterBottom sx={{fontSize:"18px",fontWeight:'600',minHeight:'70px'}} variant="h5" component="div">
                              <SvgIcon sx={{fontSize:'15px',marginRight:'6px'}} component={product.is_veg?VegIcon:NonVegIcon} viewBox="0 0 12 9" />

                                {product.product_name.length>45?product.product_name.slice(0,45)+'...':product.product_name}
                              </Typography>

                              <Typography variant="body1" sx={{fontSize:'13px'}} color="text.secondary">
                               {product.small_description?.length>100?product.small_description.slice(0,95)+'...':product.small_description}
                              </Typography>

                              <div className='product-d-ratting' style={{width:'fit-content',height:'25px',padding:'0px 6px',fontSize:'15px',margin:'10px 0'}}>
                        <SvgIcon  sx={{fontSize:'19px',marginRight:'5px'}} component={star} viewBox="0 0 10 20"></SvgIcon>
                            <Typography>{product.rating || 5 }</Typography>
                           
                        </div>
                            </CardContent>
                          </CardActionArea>
        </Link>
                         

                          <Divider />

                          <CardActions>
                          <Box className='ProductDetails-details-price-add'>
                        <Typography variant='h5' sx={{marginLeft:'10px'}}><span>₹</span>{product.price || 'Try'}</Typography>
                       
                        {thisItemCount >= 1
                              ?<Box  sx={{fontSize:'14px',width:'100px'}}>
                              <Stack sx={{padding:'2px 5px'}} direction="row" className='add-remove-countbtn'  spacing={0}>
                                <IconButton onClick={()=> addItemHandeler(product.product_id)} aria-label="add" color="success">
                                  <AddIcon />
                                </IconButton>
                                <IconButton> {thisItemCount}</IconButton>
                               
                                <IconButton
                                  aria-label="remove"
                                  onClick={()=> removeItemHandeler(product.product_id)}
                                  color="error"
                                >
                                  <RemoveIcon />
                                </IconButton>
                              </Stack>
                            </Box>
                              :  <Button sx={{padding:'8px 15px !important',width:'100px !important'}}
                              className="incertItem-cart"
                              variant="outlined"
                              onClick={() => HandleAddBtn(product)}
                              style={{
                                color: "rgb(189, 162, 110)",
                                borderColor: "rgb(189, 162, 110)",
                              }}
                            >
                             
                              Add
                            </Button>}
                          
                         
                       
                    </Box>
                          </CardActions>
                       </Card>
    </div>
  )
}

export default ProductCard