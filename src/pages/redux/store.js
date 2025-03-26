// import { combineReducers, compose } from "redux";
// import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/reducers/authReducer";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const combineReducer = combineReducers({
//   AuthReducer
// });

const store = configureStore({
  reducer: {
    AuthReducer: authReducer,
  },
})

// const store = createStore(
//   combineReducer,
//   composeEnhancers(applyMiddleware(thunk))
// );
export default store;
