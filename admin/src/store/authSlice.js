import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token")

const initialState = {
  isLoggedin: !!token,
  user:"",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedin = true;    
      localStorage.setItem("user", state.user = action.payload)
    },
    logout: (state) => {
      state.isLoggedin = false;
      state.user = null
      localStorage.removeItem("user")
    },
    update: (state, action) => {
      state.user = { ...state.user, ...action.payload }; 
    },
  },
});

export const {login , logout, update} = authSlice.actions;
export default authSlice.reducer;
