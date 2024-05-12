import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isCollectionOfData : false
}

const DataTypeSlice = createSlice({
    name:'DataType',
    initialState,
    reducers:{
        setisCollectionOfData(state,action){
            state.isCollectionOfData = action.payload;
            
        },
    },
})
export const {setisCollectionOfData}= DataTypeSlice.actions
export default DataTypeSlice.reducer