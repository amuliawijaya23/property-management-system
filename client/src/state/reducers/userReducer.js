import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  picture: '',
  email: '',
  email_verified: false,
  sub: '',
  org_id: '',
  isAuthenticated: false,
  role: '',
  role_id: ''
};

export const userSlice =  createSlice({
  
  name: 'user',
  initialState: {
    value: {...initialState},
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state, action) => {
      state.value = initialState;
    },
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;