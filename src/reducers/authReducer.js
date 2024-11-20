import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    currentUser: {
      loginSuccess: false,
    },
  },
  reducers: {
    setCurrentUser: (state, action) => {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
  },
});

export const { setCurrentUser } = authSlice.actions;
export default authSlice;
