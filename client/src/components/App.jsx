import { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ButtonAppBar from './Nav';
import DrawerList from './Drawer';
import Listings from './Listings';
import Form from './Form';
import Property from './Property';

import useApplicationData from '../hooks/useApplicationData';

import useVisualMode from "../hooks/useVisualMode";
import { DASHBOARD, LISTINGS, PROPERTY, HIDDEN, FORM } from "../helper/modes";

import './styles.scss';

export default function App() {
  const {
    state,
    isLoading,
    user,
    isAuthenticated,
    error,
    loginWithRedirect,
    logout,
    addListing,
    selectProperty,
    uploadImage
  } = useApplicationData();

  const [anchorEl, setAnchorEl] = useState(false);

  const {mode, transition, back} = useVisualMode(user?.sub ? HIDDEN : HIDDEN);

  // useEffect(() => {
  //   if(!user && mode === HIDDEN) {
  //     transition(HIDDEN);
  //   } else if (user && mode === HIDDEN) {
  //     transition(HIDDEN);
  //   }
  // }, [user, transition, mode]);

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

  const createListing = (listing) => {
    addListing(listing);
    transition(LISTINGS);
  };

  const setProperty = (listing) => {
    selectProperty(listing);
    transition(PROPERTY);
  };

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
            <DrawerList
              toggleDrawer={toggleDrawer}
              modeHandler={modeHandler}
            />
          </SwipeableDrawer>
        </header>
        {mode === LISTINGS && (
          <Listings
            agents={state.agents}
            properties={state.properties}
            setProperty={setProperty}
          />
        )}
        {mode === FORM && (
          <Form 
            onCancel={returnHandler}
            onSubmit={createListing}
            setProperty={setProperty}
            user={user}
          />
        )}
        {mode === PROPERTY && (
          <Property
            property={state.property}
            agents={state.agents}
            onBack={returnHandler}
            user={user}
          />
        )}
      </CssBaseline>
    </div>
  );
};
