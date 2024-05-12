import { createSlice } from "@reduxjs/toolkit";
import {setCartItemsOfUser,setItemsInCardId} from './UserDataSlice'

const initialState ={
    ItemsInCart:0,
    CartPrice:0,
    ItemsInCartDetails:[],
    ItemsInCartId:[],
}

const CartSlice = createSlice({
    name:'cartItems',
    initialState,
    reducers:{
        addItemInCart(state,action){
            state.ItemsInCart += 1;
            state.CartPrice +=action.payload.price;
       
            if(state.ItemsInCartId?.indexOf(action.payload.product_id)== -1){
                state.ItemsInCartDetails.push(action.payload);
                state.ItemsInCartId.push(action.payload.product_id)

            }
            else{
                state.ItemsInCartId.push(action.payload.product_id)

            }
           
        },
        removeItemFromCart(state,action){
            state.ItemsInCart -= 1;
            state.CartPrice -=action.payload.price;
            // state.ItemsInCartDetails.push(action.payload);
        },
        deleteItem(state,action){

        },
        increaseQuantity(state,action){
            const itemObjInc= state.ItemsInCartDetails.filter((itemObj)=>itemObj.product_id== action.payload); //this will be arr of size one
            state.ItemsInCart += 1;
            state.CartPrice += itemObjInc[0].price;
            state.ItemsInCartId.push(action.payload);
           
        },
        decreaseQuantity(state,action){
            const itemObjDec= state.ItemsInCartDetails.filter((itemObj)=>itemObj.product_id== action.payload);
            const indexOfObjDec= state.ItemsInCartDetails.findIndex((itemObj)=>itemObj.product_id == action.payload );
        
            const indexOfIdDec = state.ItemsInCartId.indexOf(action.payload)

            state.ItemsInCart -= 1;
            state.ItemsInCartId.splice(indexOfIdDec,1);
            
            // let dummyArr= []
            // let count =0;
            // state.ItemsInCartId.forEach((id)=>{
               
            //     if(id== action.payload){
            //         count++;
            //         console.log('id-count',count)
            //     }else{
            //         dummyArr.push(id)
            //     }

            // });
            // if(count>1){
            //     for(let i= 0;i<count-1;i++){
            //         dummyArr.push(action.payload);
            //     }
               
            // }
            // console.log('dummyarr',dummyArr)
            // state.ItemsInCartId =dummyArr

            if(state.ItemsInCartId.indexOf(action.payload)== -1){
            //    let dymmyDetailArr =[]
            //    state.ItemsInCartDetails.forEach((detailObj)=>{
            //     if(detailObj.product_id !== action.payload){
            //         dymmyDetailArr.push(detailObj)
            //     }
            //    })
            //    state.ItemsInCartDetails = dymmyDetailArr
                state.ItemsInCartDetails.splice(indexOfObjDec,1)
                state.CartPrice -= itemObjDec[0].price

            }else{
                state.CartPrice -= itemObjDec[0].price

            }
           
        },
        setCartWhenLogin(state,action){
            // state.ItemsInCartDetails = action.payload[0].CartItems 
            const length =action.payload[0].cartItems?.length;
            if(length == 0 ){
               state.ItemsInCartDetails=[];
            }else{
                for(let i=0;i<length;i++){
                    state.ItemsInCartDetails[i] = action.payload[0].cartItems[i];
                }
            }
            
            // console.log(' action.payload.detail',state.ItemsInCartDetails[0])

            state.ItemsInCartId= action.payload[0].cartItemsId 
            console.log(' action.payload.cartItemsId', state.ItemsInCartId)
            state.ItemsInCart= action.payload[0].cartItemsId?.length ;
            let cartPrice = 0; // Initialize cartPrice to 0

            action.payload[0].cartItems?.forEach((cItem) => {
              cartPrice += cItem.price; // Add each item's price to cartPrice
            });
            
            state.CartPrice = cartPrice;
            console.log(' action.payload.no', state.ItemsInCart)
            console.log(' action.payload.price', cartPrice)
           
        },
        EmptyCartWhenLogout(state,action){
            state.ItemsInCart=0;
            state.CartPrice=0;
            state.ItemsInCartDetails=[];
            state.ItemsInCartId=[];
        }
    }
})
export default CartSlice.reducer
export const {addItemInCart,removeItemFromCart,deleteItem,increaseQuantity,decreaseQuantity,setCartWhenLogin,EmptyCartWhenLogout} = CartSlice.actions

export const ItemsInCartDetails = (state) => state.cartItems.ItemsInCartDetails;
export const  ItemsInCartId= (state) => state.cartItems.ItemsInCartId