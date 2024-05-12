import React, { useEffect } from 'react'
import './ProductDetails.css'
import { Box, Button, Container, IconButton, Stack, SvgIcon, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../Assets/Images/dark_logo.avif'
import { ReactComponent as star } from "../../Assets/Images/icons/green-star.svg"
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { ReactComponent as VegIcon } from "../../Assets/Images/icons/veg.svg"
import { ReactComponent as NonVegIcon } from "../../Assets/Images/icons/non-veg.svg"
import { useNavigate, useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import Dataset from '../Dataset/Dataset';
import AllcategoryData from '../Dataset/AllCategoryData';
import ExclusiveCateData from '../Dataset/ExclusiveCateData';
import {addItemInCart,removeItemFromCart,deleteItem,increaseQuantity,decreaseQuantity} from '../../Redux/CartSlice'
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import toast from "react-hot-toast";
import { updateUserSliceOnCartData } from "../../Redux/Actions";

function ProductDetails() { //product id which is clicked
    const { productId } = useParams();
  const ItemsInCartId = useSelector((state) => state.cartItems.ItemsInCartId);
  const thisItemCount =ItemsInCartId.filter((id) => id == productId).length;
  const isloggedin = useSelector((state) => state.UserData.LoggedInId);

    const dispatch = useDispatch();
    const navigation = useNavigate();

    // const history = useHistory();

    // useEffect(() => {
    //   const unlisten = history.listen(() => {
    //     window.scrollTo(0, 0);
    //   });
  
    //   return () => {
    //     unlisten();
    //   };
    // }, [history]);
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on component mount
      }, []);

    // const ItemsInCartDetails = useSelector((state) => state.cartItems.ItemsInCartDetails);
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

  const AllData = []
  const isCollectionOfDataRedux = useSelector((state)=>(state.DataType.isCollectionOfData)) 
  if (isCollectionOfDataRedux) {
    // Code block if the condition is true
    let getDataFlag = false;
    for (let i = 0; i < AllcategoryData[0].data.collections.length; i++) {
        for (let j = 0; j <  AllcategoryData[0].data.collections[i].products.length; j++) {
            const thisDataObj = AllcategoryData[0].data.collections[i].products[j];
            if (thisDataObj.product_id == productId || thisDataObj.id == productId) {
                AllData.push(thisDataObj);
                getDataFlag= true;
                break;
            }
        }
        if(getDataFlag){break}
        for(let j = 0; j< ExclusiveCateData[0].products_data.collections[i]?.products?.length;j++){
          const thisDataObj =  ExclusiveCateData[0].products_data.collections[i]?.products[j];
          if (thisDataObj.product_id == productId || thisDataObj.id == productId) {
            AllData.push(thisDataObj);
            getDataFlag= true;
            break;
        }
        }
    }
} else {
    // Code block if the condition is false
    for (let i = 0; i < Dataset.length; i++) {
        for (let j = 0; j < Dataset[i].render_data.length; j++) {
            const thisDataObj = Dataset[i].render_data[j];
            if (thisDataObj.product_id == productId || thisDataObj.id == productId) {
                AllData.push(thisDataObj);
            }
        }
    }
}

    const prodObjData = AllData[0];
    // const prodObjData = AllData?.filter((dataObj)=>dataObj.product_id == productId ||dataObj.id ==productId)[0];
    const prodImgLink =prodObjData?.product_imageUrl ||prodObjData?.image ;
  return (
    <div className='ProductDetails-wraper'>
        <Container className='ProductDetails-container'>
            <Box className='ProductDetails-inner-flexbox'>
                <Box className='ProductDetails-imgbox'>
                    <img src={prodImgLink}></img>
                </Box>
                <Box className='ProductDetails-details'>
                    <Box className='ProductDetails-details-rate-share'>
                        <div className='product-img-n-p'>
                            <div><img style={{width:'38px',height:'38px',borderRadius:'4px'}} src={logo}></img></div>
                            <div><p>by Behrouz Biryani</p></div>
                        </div>
                        <div className='product-d-ratting'>
                        <SvgIcon  sx={{fontSize:'20px',marginRight:'5px'}} component={star} viewBox="0 0 16 16"></SvgIcon>
                            <Typography>{prodObjData.rating || 5 }</Typography>
                           
                        </div>
                        <div className='product-d-share'>
                            <p>Share</p>
                            <ShareOutlinedIcon sx={{fontSize:'17px'}}></ShareOutlinedIcon>
                        </div>
                    </Box>
                    <Box className='ProductDetails-details-title'>
                    
                        
                       
                        <SvgIcon sx={{fontSize:'17px',marginRight:'10px'}} component={prodObjData.is_veg?VegIcon:NonVegIcon} viewBox="0 0 10 10" />
                        {/* <SvgIcon sx={{fontSize:'17px',marginRight:'10px'}} component={VegIcon} viewBox="0 0 10 10" /> */}
                         <Typography variant='h5'>
                         
                         {prodObjData.product_name || prodObjData.name}
                         </Typography>
                        
                    </Box>
                    <Box className='ProductDetails-details-discription'>
                        <p>
                       {prodObjData.small_description} 
                        </p>
                    </Box>
                    <Box className='ProductDetails-details-price-add'>
                        <Typography variant='h5'><span>₹</span>{prodObjData.price || 'Try'}</Typography>
                        {/* <Button style={{ backgroundColor: 'rgb(189, 162, 110)'}} onClick={()=>HandleAddBtn(prodObjData)} variant="contained">Add</Button> */}
                        {thisItemCount >= 1
                              ?<Box  sx={{fontSize:'14px'}}>
                              <Stack sx={{padding:'8px 25px'}} direction="row" className='add-remove-countbtn'  spacing={1}>
                                <IconButton onClick={()=> addItemHandeler(prodObjData.product_id)} aria-label="add" color="success">
                                  <AddIcon />
                                </IconButton>
                                <IconButton> {thisItemCount}</IconButton>
                               
                                <IconButton
                                  aria-label="remove"
                                  onClick={()=> removeItemHandeler(prodObjData.product_id)}
                                  color="error"
                                >
                                  <RemoveIcon />
                                </IconButton>
                              </Stack>
                            </Box>
                              :  <Button
                              className="incertItem-cart"
                              variant="outlined"
                              onClick={() => HandleAddBtn(prodObjData)}
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
        </Container>

    </div>
  )
}

export default ProductDetails