import { createSlice } from "@reduxjs/toolkit";

let token = localStorage.getItem("nute-token");
const initialState = {
  token: token ? token : "",
  islogin: token ? true : false,
  profile:{}
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLogin(state, action) {
      localStorage.setItem("nute-token", action.payload.data.token);
       state.islogin = true;
        state.token = action.payload.data.token;
    },
    setprofile(state, action) {
        state.profile=  {...action.payload.data};
    },
    authLogout(state, action) {
      localStorage.removeItem("nute-token");
      state.islogin = false;
    },
  },
})


const { authLogin, authLogout, setprofile } = authSlice.actions;


export default authSlice.reducer;
export { authLogin, authLogout, setprofile };
// export default function AuthReducer(state = initialState, action) {
//   switch (action.type) {
//     case "AUTH_LOGIN":
//     case "PROFILE":
      
//     case "AUTH_LOGOUT":
      
//     default:
//       return {
//         ...state,
//       };
//   }
// }
