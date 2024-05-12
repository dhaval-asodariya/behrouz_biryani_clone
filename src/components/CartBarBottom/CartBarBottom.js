import { Box, Button, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import './CartBarBottom.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function CartBarBottom() {
 
  const ItemsInCart = useSelector((state)=>state.cartItems.ItemsInCart);
  return (
    <div className='Cartbar-section' style={{bottom:ItemsInCart>0?'50px':"-100px"}}>
        <Box className='CartBar-Container'>
            <Typography><span>{ItemsInCart}</span> Items</Typography>
            <Button variant="contained"><ShoppingCartOutlinedIcon sx={{fontSize:'20px'}}/> <Link to='cartTable'> View Cart</Link></Button>
        </Box>
    </div>
  )
}

export default CartBarBottom