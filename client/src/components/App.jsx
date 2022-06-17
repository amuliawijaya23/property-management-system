import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ButtonAppBar from './Nav';
import DrawerList from './Drawer';
import Dashboard from "./Dashboard";
import Listings from './Listings';
import Form from './Form';

import useApplicationData from '../hooks/useApplicationData';

import useVisualMode from "../hooks/useVisualMode";
import { DASHBOARD, LISTINGS, HIDDEN, FORM } from "../helper/modes";

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
    addListing
  } = useApplicationData();

  const [anchorEl, setAnchorEl] = React.useState(false);

  const {mode, transition, back} = useVisualMode(user ? LISTINGS : HIDDEN);

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

  const formHandler = () => {
    transition(FORM);
  };

  const listingsHandler = () => {
    transition(LISTINGS);
  };

  const returnHandler = () => {
    back();
  };

  const createListing = (listing) => {
    addListing(listing);
    transition(LISTINGS);
  };

  React.useEffect(() => {
    if(!user && mode === LISTINGS) {
      transition(HIDDEN);
    } else if (user && mode === HIDDEN) {
      transition(LISTINGS);
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
            <DrawerList
              toggleDrawer={toggleDrawer}
              onListings={listingsHandler}
              onForm={formHandler}
            />
          </SwipeableDrawer>
        </header>
        {mode === HIDDEN && (
          <></>
        )}
        {mode === LISTINGS && (
          <Listings
            agents={state.agents}
            properties={state.properties}
          />
        )}
        {mode === FORM && (
          <Form 
            onCancel={returnHandler}
            onSubmit={createListing}
            user={user}
          />
        )}
      </CssBaseline>
    </div>
  );
};
