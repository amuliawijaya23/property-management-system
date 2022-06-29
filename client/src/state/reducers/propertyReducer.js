import { createSlice } from '@reduxjs/toolkit';

export const propertySlice =  createSlice({
  name: 'property',
  initialState: {
    value: {
      details: {},
      images: [],
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
    setPropertyWatchers: (state, action) => {
      state.value.watchers = action.payload;
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
  setPropertyWatchers
} = propertySlice.actions

export default propertySlice.reducer;