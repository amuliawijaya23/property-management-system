import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    properties: [],
    tasks: [],
    contacts: [],
    transactions: [],
  }
};

export const dashboardSlice =  createSlice({
  name: 'dashboard',
  initialState: initialState,
  reducers: {
    setDashboard: (state, action) => {
      state.value = action.payload;
    },
    setDashProperties: (state, action) => {
      state.value.properties = action.payload;
    },
    setDashTasks: (state, action) => {
      state.value.tasks = action.payload;
    },
    setDashContacts: (state, action) => {
      state.value.contacts = action.payload;
    },
    setDashTransactions: (state, action) => {
      state.value.transactions = action.payload;
    }
  },
});

export const { 
  setDashboard,
  setDashProperties, 
  setDashTasks,
  setDashContacts,
  setDashTransactions
} = dashboardSlice.actions;

export default dashboardSlice.reducer;