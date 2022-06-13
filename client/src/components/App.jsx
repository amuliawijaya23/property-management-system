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

  const {mode, transition, back} = useVisualMode(LOGIN);

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

  return (
    <div className="App">
      <CssBaseline>
        <header className="App__header">
          <ButtonAppBar openDrawer={toggleDrawer(true)} className="App__bar" />
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
          <LoginForm />
        )}
      </CssBaseline>
    </div>
  );
};
