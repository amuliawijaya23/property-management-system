import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, {SET_APPLICATION_DATA} from '../reducers/app';

export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, {
    properties: null
  });

  useEffect(() => {
    axios.get('/api/listings')
      .then((res) => {
        dispatch({
          type: SET_APPLICATION_DATA,
          value: {properties: res.data}
        });
      })
      .catch(e => console.log(e.message));
  }, []);

  return { 
    state,
  };
};