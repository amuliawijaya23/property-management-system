import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import './styles.scss';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ButtonAppBar from './Nav';
import DrawerList from './Drawer';
import Dashboard from "./Dashboard";
import LoginForm from './LoginForm';

import useApplicationData from '../hooks/useApplicationData';

import useVisualMode from "../hooks/useVisualMode";
import { LOGIN, HIDDEN, DASHBOARD } from "../helper/modes";

export default function App() {
  const {state} = useApplicationData();
  const [anchorEl, setAnchorEl] = React.useState(false);

  const {mode, transition, back} = useVisualMode(DASHBOARD);

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

  const toggleLogin = () => {
    (mode === LOGIN) ? back() : transition(LOGIN);
  };

  return (
    <div className="App">
      <CssBaseline>
        <header className="App__header">
          <ButtonAppBar
            className="App__bar"
            openDrawer={toggleDrawer(true)}
            onLogin={toggleLogin}
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
        {mode === LOGIN && (
          <LoginForm
            toggleLogin={toggleLogin}
          />
        )}
      </CssBaseline>
    </div>
  );
};
