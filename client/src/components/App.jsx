import { useState } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Listing from './Listing';

import PrimarySearchAppBar from './Nav';
import DrawerList from './Drawer';

import './App.scss';


import useApplicationData from '../hooks/useApplicationData';
import useVisualMode from '../hooks/useVisualMode';
import { HIDDEN, SHOW } from '../helper/modes';

export default function App() {
  const {state} = useApplicationData();
  const {mode, transition, back} = useVisualMode(HIDDEN);

  const toggleDrawer = (mode) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    transition(mode);
  };

  const listings = state.properties?.map((listing, i) => (
    <Listing
      key={`listing-${i}`}
      id={`listing-${i}`}
      {...listing}
    />
  ))



  return (
    <div className="App">
      <CssBaseline />
      <header className="App__header">
        <PrimarySearchAppBar 
          toggleDrawer={toggleDrawer}
        />
        <SwipeableDrawer 
          anchor='left'
          open={mode === SHOW}
          onClose={toggleDrawer(HIDDEN)}
          onOpen={toggleDrawer(SHOW)}
        >
          <DrawerList 
            toggleDrawer={toggleDrawer}
          />
        </SwipeableDrawer>
      </header>
      <section className='App__body'>
        {state.properties ? listings : <></>}
      </section>
    </div>
  );
};
