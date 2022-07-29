import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    user: '',
    stream: {
      current: false,
      past: false,
      count: false,
      pastCount: false,
      currentTransactions: [],
      pastTransactions: []
    },
    sale: {
      current: false,
      past: false,
      count: false,
      pastCount: false,
      currentTransactions: [],
      pastTransactions: []
    },
    lease: {
      current: false,
      past: false,
      count: false,
      pastCount: false,
      currentTransactions: [],
      pastTransactions: []
    },
    graph: {
      current: [],
      past: [],
      label: [],
      data: []
    },
    properties: {
      open: {
        listings: [],
        tasks: []
      },
      offerAccepted: {
        listings: [],
        tasks: []
      },
      depositReceived: {
        listings: [],
        tasks: []
      },
      closing: {
        listings: [],
        tasks: []
      }
    }
  }
};

export const dashboardSlice =  createSlice({
  name: 'dashboard',
  initialState: initialState,
  reducers: {
    setDashboard: (state, action) => {
      state.value = action.payload;
    },
    setUser: (state, action) => {
      state.value.user = action.payload;
    },
    setStream: (state, action) => {
      state.value.stream = action.payload;
    },
    setSale: (state, action) => {
      state.value.sale = action.payload;
    },
    setLease: (state, action) => {
      state.value.lease = action.payload;
    },
    setGraph: (state, action) => {
      state.value.graph = action.payload;
    },
    setBoardProperties: (state, action) => {
      state.value.properties = action.payload;
    }
  },
});

export const { 
  setDashboard,
  setUser,
  setStream,
  setSale,
  setLease,
  setGraph
} = dashboardSlice.actions;

export default dashboardSlice.reducer;