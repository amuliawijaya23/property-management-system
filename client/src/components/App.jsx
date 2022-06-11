import CssBaseline from '@mui/material/CssBaseline';
import './styles.scss';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ButtonAppBar from './Nav';
import DrawerList from './Drawer';
import Body from './Body';

import useApplicationData from '../hooks/useApplicationData';
import useVisualMode from '../hooks/useVisualMode';
import { HIDDEN, SHOW } from '../helper/modes';

export default function App() {
  const {state} = useApplicationData();
  const {mode, transition} = useVisualMode(HIDDEN);

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

  return (
    <div className="App">
      <CssBaseline />
      <header className="App__header">
        <ButtonAppBar
          openDrawer={toggleDrawer(SHOW)}
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
      <Body
        properties={state.properties}
      />
    </div>
  );
};
