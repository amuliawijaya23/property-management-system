import './App.css';

import useApplicationData from './hooks/useApplicationData';
import useVisualMode from './hooks/useVisualMode';

export default function App() {
  const {state} = useApplicationData();
  const {mode, transition, back} = useVisualMode();

  return (
    <div className="App">
      <header className="app-header">
        <p>{!state.data ? 'Loading...' : state.data}</p>
      </header>
    </div>
  );
};
