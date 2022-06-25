import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {},
  reducers: {
    loginAdmin(state, action) {
      console.log(action.payload);
      return { ...action.payload };
    },
    logOutAdmin(state, action) {
      console.log("logOut user:", action.payload);
      return {};
    },
  },
});

export const { loginAdmin, logOutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
