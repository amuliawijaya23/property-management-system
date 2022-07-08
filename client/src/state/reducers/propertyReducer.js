import { createSlice } from '@reduxjs/toolkit';

export const propertySlice =  createSlice({
  name: 'property',
  initialState: {
    value: {
      details: {},
      images: [],
      files: [],
      tasks: [],
      messages: [],
      watchers: []
    },
  },
  reducers: {
    setPropertyData: (state, action) => {
      state.value = action.payload;
    },
    setPropertyImages: (state, action) => {
      state.value.images = action.payload;
    },
    setPropertyFiles: (state, action) => {
      state.value.files = action.payload;
    },
    setPropertyWatchers: (state, action) => {
      state.value.watchers = action.payload;
    },
    setPropertyTasks: (state, action) => {
      state.value.tasks= action.payload;
    },
    updateDetails: (state, action) => {
      const newState = {...state.value};
      newState.details = action.payload;
      state.value = newState;
    }
  },
});

export const { 
  setPropertyData,
  setPropertyImages,
  updateMediaGallery, 
  updateMessages, 
  updateDetails ,
  setPropertyWatchers,
  setPropertyFiles,
  setPropertyTasks
} = propertySlice.actions

export default propertySlice.reducer;