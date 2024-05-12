import { createSlice } from "@reduxjs/toolkit";
import allCategoryNavData from "../components/Dataset/NavTabsData";

const initialState={
    ActiveCategory: "/allCategories",
    ActiveIndex:0
}

const ActiveCategorySlice = createSlice({
    name:'ActiveCategory',
    initialState,
    reducers:{
        setActiveCategory(state,action){
            state.ActiveCategory = action.payload;
            const requireObj = allCategoryNavData.filter((singleTab)=>singleTab.path ==action.payload )[0] || allCategoryNavData[0]
            state.ActiveIndex= requireObj.index
            console.log("redux",requireObj.index)
            // state.ActiveCategory = action.payload.split('&').at(1);
            // state.ActiveIndex = action.payload.split('&').at(-1);
            
        },
        setActiveIndex(state,action){
            state.ActiveIndex = action.payload;
            
        },
    },
})
export const {setActiveCategory,setActiveIndex}= ActiveCategorySlice.actions
export default ActiveCategorySlice.reducer