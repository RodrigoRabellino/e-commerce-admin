import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {},
  reducers: {
    createData(state, action) {
      return { ...action.payload };
    },
    deleteData(state, action) {
      return {};
    },
  },
});

export const { createData, deleteData } = dataSlice.actions;
export default dataSlice.reducer;
