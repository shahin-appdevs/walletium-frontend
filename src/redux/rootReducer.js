import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
// import cartReducer from "./features/cartSlice";
// import themeReducer from "./features/themeSlice";
import { baseApi } from "./api/baseApi";

const rootReducer = combineReducers({
  auth: authReducer,
  //   cart: cartReducer,
  //   theme: themeReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export default rootReducer;
