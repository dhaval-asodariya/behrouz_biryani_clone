import React from "react";
import { useSelector } from "react-redux";
import "./CartTable.css";
import { useDispatch } from "react-redux";
import {
  addItemInCart,
  removeItemFromCart,
  deleteItem,
  increaseQuantity,
  decreaseQuantity,
} from "../../Redux/CartSlice";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { Link } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";

// import { addItem, removeItem } from "./reduxSlice";

function CartTable() {
  const ItemsInCartDetails = useSelector(
    (state) => state.cartItems.ItemsInCartDetails
  );
  const ItemsInCartId = useSelector((state) => state.cartItems.ItemsInCartId);
  const CartPrice = useSelector((state) => state.cartItems.CartPrice);

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
        </div>  
      ) : (
        <div>
          <h2 className="cart-title">Your Cart</h2>
          <div className="cartTable">
            <table className="table">
              <thead className="thead">
                <tr>
                  <th>itemName</th>
                  <th>quantity</th>
                  <th>Buttons</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {ItemsInCartDetails.map((item, index) => {
                  const itemCount = ItemsInCartId.filter(
                    (id) => id === item.product_id
                  ).length;
                  return (
                    <tr key={index}>
                      <td>{item.product_name}</td>
                      <td>{itemCount}</td>
                      <td>
                        <button
                          onClick={() => addItemHandeler(item.product_id)}
                        >
                          addItem
                        </button>{" "}
                        <button
                          onClick={() => removeItemHandeler(item.product_id)}
                        >
                          removeItem
                        </button>
                      </td>
                      <td>{itemCount * item.price}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>-</td>
                  <td>-</td>
                  <td>Total Price</td>
                  <td>{CartPrice}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* <div>
        <h2 className="cart-title">Your Cart</h2>
        <div className="cartTable">
          <table className="table">
            <thead className="thead">
              <tr>
                <th>itemName</th>
                <th>quantity</th>
                <th>Buttons</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {ItemsInCartDetails.map((item, index) => {
               const itemCount =(ItemsInCartId.filter((id)=>id == item.product_id)).length;
                  return (
                    <tr>
                      <td>{item.product_name}</td>
                      <td>{itemCount}</td>
                      <td>
                        <button onClick={() => addItemHandeler(item.product_id)}>
                          addItem
                        </button>{" "}
                        <button onClick={() => removeItemHandeler(item.product_id)}>
                          removeItem
                        </button>
                      </td>
                      <td>{itemCount*item.price}</td>
                    </tr>
                  );
               
  
               
              })}
              <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>-</td>
                <td>-</td>
                <td>Total Price</td>
                <td>{CartPrice}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  );
}

export default CartTable;
