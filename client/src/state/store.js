import { configureStore } from '@reduxjs/toolkit';

// import reducers
import userReducer from './reducers/userReducer';
import propertyReducer from './reducers/propertyReducer';
import app from './reducers/app';

export const store = configureStore({
  reducer: {
    user: userReducer,
    app: app,
    property: propertyReducer
  },
});
