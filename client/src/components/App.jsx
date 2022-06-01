import CssBaseline from '@mui/material/CssBaseline';

import './App.scss';

import PrimarySearchAppBar from './Nav';

import useApplicationData from '../hooks/useApplicationData';
import useVisualMode from '../hooks/useVisualMode';

export default function App() {
  const {state} = useApplicationData();
  const {mode, transition, back} = useVisualMode();

  return (
    <div className="App">
      <CssBaseline />
      <header className="app-header">
        <PrimarySearchAppBar />
      </header>
    </div>
  );
};
