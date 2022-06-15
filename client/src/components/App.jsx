import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth0 } from "@auth0/auth0-react";

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ButtonAppBar from './Nav';
import DrawerList from './Drawer';
import Dashboard from "./Dashboard";

import useApplicationData from '../hooks/useApplicationData';

import useVisualMode from "../hooks/useVisualMode";
import { DASHBOARD, HIDDEN } from "../helper/modes";

import './styles.scss';

export default function App() {
  const { 
    isLoading, 
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout
  } = useAuth0();

  const {state} = useApplicationData();
  const [anchorEl, setAnchorEl] = React.useState(false);

  const {mode, transition} = useVisualMode(isAuthenticated ? DASHBOARD : HIDDEN);

  const toggleDrawer = (anchor) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setAnchorEl(anchor);
  };

  React.useEffect(() => {
    if(isAuthenticated && mode === HIDDEN) {
      transition(DASHBOARD);
    } else if (!isAuthenticated && mode === DASHBOARD) {
      transition(HIDDEN);
    }
  }, [isAuthenticated, transition, mode]);

  if(isLoading) {
    return (
      <div className='App__loading'>
        <CircularProgress size={"4.5rem"}/>
      </div>
    )
  }

  return (
    <div className="App">
      <CssBaseline>
        <header className="App__header">
          <ButtonAppBar
            className="App__bar"
            openDrawer={toggleDrawer(true)}
            logout={logout}
            loginWithRedirect={loginWithRedirect}
            user={user}
            isAuthenticated={isAuthenticated}
          />
          <SwipeableDrawer 
            anchor='left'
            open={anchorEl}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            <DrawerList toggleDrawer={toggleDrawer} />
          </SwipeableDrawer>
        </header>
        {mode === DASHBOARD && (
          <Dashboard
            properties={state.properties}
          />
        )}
        {mode === HIDDEN && (
          <></>
        )}
      </CssBaseline>
    </div>
  );
};
