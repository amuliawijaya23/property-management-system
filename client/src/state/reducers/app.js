import { createSlice } from '@reduxjs/toolkit';

export const appSlice =  createSlice({
  name: 'app',
  initialState: {
    value: {
      properties: [],
      agents: []
    },
  },
  reducers: {
    initialize: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { initialize } = appSlice.actions

export default appSlice.reducer;