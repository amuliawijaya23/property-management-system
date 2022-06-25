import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    properties: [],
    edit: {
      status: '',
      seller_id: ''
    }
  }
};

export const tableSlice =  createSlice({
  name: 'table',
  initialState: initialState,
  reducers: {
    setDefault: (state, action) => {
      state.value = action.payload;
    },
    setTableData: (state, action) => {
      state.value.properties = action.payload;
    },
    setEditValue: (state, action) => {
      state.value.edit = action.payload;
    }
  },
});

export const { 
  setDefault,
  setTableData, 
  setEditValue, 
} = tableSlice.actions;

export default tableSlice.reducer;