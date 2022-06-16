import { useReducer, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import reducer, { SET_APPLICATION_DATA } from '../reducers/app';

export default function useApplicationData() {
  const { 
    isLoading, 
    isAuthenticated,
    error,
    user,
    getAccessTokenSilently,
    loginWithRedirect,
    logout
  } = useAuth0();

  const [state, dispatch] = useReducer(reducer, {
    properties: null,
    agents: null,
  });

  useEffect(() => {
    getAccessTokenSilently()
      .then((token) => {
        Promise.all([
          axios.get('api/listings'),
          axios.get(`${process.env.REACT_APP_API}/user/organization/${user?.org_id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        ]).then((response) => {
          const [listings, agents] = response;
          dispatch({
            type: SET_APPLICATION_DATA,
            value: {properties: listings.data, agents: agents.data}
          });
        })
        .catch(e => console.error(e));
      })
  }, [user, getAccessTokenSilently]);

  return { 
    state,
    user,
    isAuthenticated,
    isLoading,
    error,
    getAccessTokenSilently,
    loginWithRedirect,
    logout
  };
};