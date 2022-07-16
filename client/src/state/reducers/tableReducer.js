import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    columns: [],
    rows: [],
    selected: [],
    type: ''
  }
};

export const tableSlice =  createSlice({
  name: 'table',
  initialState: initialState,
  reducers: {
    setDefault: (state, action) => {
      state.value = action.payload;
    },
    setTableColumns: (state, action) => {
      state.value.columns = action.payload;
    },
    setTableRows: (state, action) => {
      state.value.rows = action.payload;
    },
    setSelected: (state, action) => {
      state.value.selected = action.payload;
    }
  },
});

export const { 
  setDefault,
  setTableColumns, 
  setTableRows,
  setSelected,
} = tableSlice.actions;

export default tableSlice.reducer;