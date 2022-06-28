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
    updatePropertiesData: (state, action) => {
      state.value.properties = action.payload;
    }
  },
});

export const { initialize, updatePropertiesData } = appSlice.actions

export default appSlice.reducer;