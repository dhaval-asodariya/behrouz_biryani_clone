import { ItemsInCartDetails,ItemsInCartId ,setCartWhenLogin} from './CartSlice';
import { LoggedInObj ,setCartItemsOfUser,setItemsInCardId} from './UserDataSlice';
import UserDataSlice from "./UserDataSlice";
import CartReducer from './CartSlice'
 

export const updateUserSliceOnCartData = () => (dispatch, getState) => {
  const ItemsInCartDetail = ItemsInCartDetails(getState());
  const ItemsInCartIds = ItemsInCartId(getState());

  dispatch(setCartItemsOfUser(ItemsInCartDetail));
  dispatch(setItemsInCardId(ItemsInCartIds));

};

export const updateCartSliceOnUserData = () => (dispatch, getState) => {
    const LogedInObj = LoggedInObj(getState());
  
    dispatch(setCartWhenLogin(LogedInObj));
  
  };