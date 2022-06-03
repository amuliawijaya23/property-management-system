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

  const listingCards = (properties, i) => {
    return (
      <div className="listing-rows">
        <Listing
          key={`listing-${i}`}
          id={`listing-${i}`}
          {...properties[0]}
        />
        <Listing
          key={`listing-${i + 1}`}
          id={`listing-${i + 1}`}
          {...properties[1]}
        />
      </div>
    );
  };

  const listingRows = (properties) => {
    for (let i = 0; i < 5; i += 2) {
      return (
        <div className="listing-rows">
          <Listing
            key={`listing-${i}`}
            id={`listing-${i}`}
            {...properties[i]}
          />
          <Listing
            key={`listing-${i + 1}`}
            id={`listing-${i + 1}`}
            {...properties[i+1]}
          />
        </div>
      );
    };
  };



  return (
    <div className="App">
      <CssBaseline />
      <header className="App-header">
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
      <section className='App-body'>
        {state.properties ? listingRows(state.properties) : <></>}
      </section>
    </div>
  );
};
