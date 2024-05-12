import { combineReducers } from "@reduxjs/toolkit";
import widthReducer from './WidthSlice'
import CartReducer from './CartSlice'
import DataTypeReducer from './DataTypeSlice'
import ActiveCategorySlice from "./ActiveCategorySlice";
import UserDataSlice from "./UserDataSlice";
const rootReducer = combineReducers({
    windowWidth:widthReducer,
    cartItems:CartReducer,
    DataType:DataTypeReducer,
    ActiveCategory: ActiveCategorySlice,
    UserData:UserDataSlice,
})

export default rootReducer