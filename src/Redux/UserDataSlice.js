import { createSlice } from "@reduxjs/toolkit";

const initialState={
    NextUserId:1,
    LoggedInId:0,
    LoggedInObj:{},
    // itemsInCartLoggedIn:[],
    AllUserData:[]

}

const UserDataSlice = createSlice({
    name:'UserData',
    initialState,
    reducers:{
        setAllUserData(state,action){
           const newData = action.payload;
           newData.id = state.NextUserId;
            state.AllUserData.push(newData);
            state.NextUserId+=1;
            const allData = state.AllUserData
           console.log('data registered',allData)
        },
        setLoggedInId(state,action){
            state.LoggedInId=action.payload;
            const logedinUserObj = state.AllUserData.filter((data)=>{
                if(data.id == action.payload){
                    return {data}
                }
            })
            // console.log('redux logedindata',logedinUserObj)
            state.LoggedInObj=logedinUserObj;
            console.log("logedinUserObj",logedinUserObj)
            // state.itemsInCartLoggedIn= cartItems;
        },
        setCartItemsOfUser(state,action){
            
            // const indexOfObjlogedIn= state.AllUserData.findIndex((itemObj)=>itemObj.id == state.LoggedInId );
            console.log("state.LoggedInObj.cartItemsId",action.payload)
            state.AllUserData[state.LoggedInId -1].cartItems = action.payload
            for(let i=0;i<action.payload.length;i++){
                state.LoggedInObj[0].cartItems[i] = action.payload[i];
            }
       
            console.log("state.LoggedInObj",state.LoggedInObj.cartItems)
            
        },
        setItemsInCardId(state,action){
            
            state.AllUserData[state.LoggedInId -1].cartItemsId = action.payload
           
                for(let i=0;i<action.payload.length;i++){
                    state.LoggedInObj[0].cartItemsId[i] = action.payload[i];
                }
            
        },
        setLogout(state,action){
            state.LoggedInId =0;
            state.LoggedInObj={}
        },
    },
})
export const {setAllUserData,setLoggedInId,setCartItemsOfUser,setItemsInCardId,setLogout}= UserDataSlice.actions
export default UserDataSlice.reducer

export const LoggedInObj = (state) => state.UserData.LoggedInObj;
// export const  ItemsInCartId= (state) => state.CartItems.ItemsInCartId