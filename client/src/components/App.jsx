import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';

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
    state,
    isLoading,
    user,
    isAuthenticated,
    error,
    loginWithRedirect,
    logout
  } = useApplicationData();

  const [anchorEl, setAnchorEl] = React.useState(false);

  const {mode, transition} = useVisualMode(user ? DASHBOARD : HIDDEN);

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
    if(!user && mode === DASHBOARD) {
      transition(HIDDEN);
    } else if (user && mode === HIDDEN) {
      transition(DASHBOARD);
    }
  }, [user, transition, mode]);

  if(isLoading || (mode !== HIDDEN && (!state.properties || !state.agents))) {
    return (
      <div className='App__loading'>
        <CircularProgress size={"4.5rem"}/>
      </div>
    );
  };

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
