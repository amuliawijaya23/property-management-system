import { createSlice } from '@reduxjs/toolkit';

export const formSlice =  createSlice({
  name: 'form',
  initialState: {
    value: {
      steps: [],
      data: {}
    },
  },
  reducers: {
    initializeForm: (state, action) => {
      state.value = action.payload;
    },
    setFormData: (state, action) => {
      state.value.data = action.payload;
    },
    setFormImage: (state, action) => {
      state.value.data.thumbnailImage = action.payload
    }
  },
});

export const { 
  initializeForm,
  setFormData,
  setFormImage
} = formSlice.actions

export default formSlice.reducer;