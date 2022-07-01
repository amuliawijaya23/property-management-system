import { createSlice } from '@reduxjs/toolkit';

export const appSlice =  createSlice({
  name: 'app',
  initialState: {
    value: {
      properties: [],
      agents: [],
      contacts: [],
      tasks: []
    },
  },
  reducers: {
    initialize: (state, action) => {
      state.value = action.payload;
    },
    updatePropertiesData: (state, action) => {
      state.value.properties = action.payload;
    },
    updateContactsData: (state, action) => {
      state.value.contacts = action.payload;
    },
    updateTasksData: (state, action) => {
      state.value.tasks = action.payload;
    }
  },
});

export const { initialize, updatePropertiesData, updateContactsData, updateTasksData } = appSlice.actions

export default appSlice.reducer;