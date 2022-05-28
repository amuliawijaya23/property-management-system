import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, {SET_APPLICATION_DATA} from '../reducers/app';

export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, {
    data: null
  });

  useEffect(() => {
    axios.get('/api')
      .then((res) => {
        dispatch({
          type: SET_APPLICATION_DATA,
          value: {data: res.data.message}
        });
      })
      .catch(e => console.log(e.message));
  }, []);

  return { 
    state,
  };
};