import { createSlice } from "@reduxjs/toolkit";

const initialState={
    width: window.innerWidth
}

const widthSlice = createSlice({
    name:'windowWidth',
    initialState,
    reducers:{
        setWindowWidth(state,action){
            state.width = action.payload;
            
        },
    },
})
export const {setWindowWidth}= widthSlice.actions
export default widthSlice.reducer