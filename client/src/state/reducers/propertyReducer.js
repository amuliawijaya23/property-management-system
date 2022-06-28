import { createSlice } from '@reduxjs/toolkit';

export const propertySlice =  createSlice({
  name: 'property',
  initialState: {
    value: {
      details: {},
      images: [],
      messages: []
    },
  },
  reducers: {
    setPropertyData: (state, action) => {
      state.value = action.payload;
    },
    setPropertyImages: (state, action) => {
      state.value.images = action.payload;
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
  updateDetails 
} = propertySlice.actions

export default propertySlice.reducer;