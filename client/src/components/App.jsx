import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';


import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ButtonAppBar from './Nav';
import DrawerList from './Drawer';
import Loading from './Loading';
import PropertyList from './PropertyList';
import Form from './Form';
import Property from './Property';

import usePropertyData from '../hooks/usePropertyData';
import useApplicationData from '../hooks/useApplicationData';
import { useSelector } from 'react-redux';

import useVisualMode from "../hooks/useVisualMode";
import { DASHBOARD, LISTINGS, PROPERTY, HIDDEN, FORM, LOADING } from "../helper/modes";

import './styles.scss';

export default function App() {
  const {
    isLoading,
    error,
    isAuthenticated,
    loginWithRedirect,
    logout,
    addListing,
  } = useApplicationData();

  const { selectProperty } = usePropertyData();

  // user state
  const user = useSelector((state) => state.user?.value);
  
  // visual mode
  const [anchorEl, setAnchorEl] = useState(false);
  const {mode, transition, back} = useVisualMode(user?.sub ? DASHBOARD : DASHBOARD);

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

  const modeHandler = (mode) => {
    transition(mode);
  };

  const returnHandler = () => {
    back();
  };

  const createListing = async(listing) => {
    transition(LOADING);
    await addListing(listing);
    transition(LISTINGS);
  };

  const setProperty = async(listing) => {
    transition(LOADING);
    await selectProperty(listing);
    transition(PROPERTY);
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
            isAuthenticated={isAuthenticated}
          />
          <SwipeableDrawer 
            anchor='left'
            open={anchorEl}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            <DrawerList
              toggleDrawer={toggleDrawer}
              modeHandler={modeHandler}
            />
          </SwipeableDrawer>
        </header>
        {(mode === LOADING || isLoading) && (
          <Loading />
        )}
        {mode === LISTINGS && (
          <PropertyList setProperty={setProperty} />
        )}
        {mode === FORM && (
          <Form 
            onCancel={returnHandler}
            onSubmit={createListing}
          />
        )}
        {mode === PROPERTY && (
          <Property
            onBack={() => modeHandler(LISTINGS)}
          />
        )}
        {mode === DASHBOARD && (
          <></>
        )}
      </CssBaseline>
    </div>
  );
};
