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
    updateMediaGallery: (state, action) => {
      const newState = {...state.value};
      newState.images = action.payload;
      state.value = newState;
    },
    updateDetails: (state, action) => {
      const newState = {...state.value};
      newState.details = action.payload;
      state.value = newState;
    }
  },
});

export const { setPropertyData, updateMediaGallery, updateMessages, updateDetails } = propertySlice.actions

export default propertySlice.reducer;