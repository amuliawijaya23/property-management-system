import { configureStore } from '@reduxjs/toolkit';

// import reducers
import userReducer from './reducers/userReducer';
import propertyReducer from './reducers/propertyReducer';
import tableReducer from './reducers/tableReducer';
import formReducer from './reducers/formReducer';
import dashboardReducer from './reducers/dashboardReducer';
import app from './reducers/app';

export const store = configureStore({
  reducer: {
    user: userReducer,
    app: app,
    property: propertyReducer,
    table: tableReducer,
    form: formReducer,
    dashboard: dashboardReducer
  },
});
