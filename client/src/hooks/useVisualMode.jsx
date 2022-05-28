import {useState} from 'react';

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  // push new mode to history, slice from history if replace === true
  const transition = (mode, replace = false) => {
    if (replace) {
      setHistory(prev => [...prev.slice(0, -1), mode]);
    } else {
      setHistory(prev => [...prev, mode]);
    };
  };

  // set mode to the previous mode in history
  const back = () => {
    if (history.length > 1) {
      setHistory(prev => [...prev.slice(0, -1)]);
    };
  };

  // return transition and back function, and set mode as the last mode in history
  return {mode: history[history.length - 1], transition, back};
}