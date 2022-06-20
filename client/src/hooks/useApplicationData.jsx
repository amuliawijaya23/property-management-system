import { useReducer, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import reducer, { SET_APPLICATION_DATA, SET_PROPERTY } from '../reducers/app';

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
    property: null,
    agents: null,
  });

  useEffect(() => {
    if(isAuthenticated) {
      getAccessTokenSilently()
        .then((token) => {
          Promise.all([
            axios.get(`app/api/listings/${user?.org_id}`),
            axios.get(`app/user/organization/${user?.org_id}`, {
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
    }
  }, [isAuthenticated, user, getAccessTokenSilently]);

  const uploadImage = (file) => {

    const formData = new FormData();
    formData.append('file', file);

    // get secure url from server
    axios.post('app/api/images', formData)
      .then(response => console.log(response))
    // post request to server
  };

  const addListing = (listing) => {

    const formData = new FormData();
    Object.keys(listing).forEach((key) => {
      formData.append(key, listing[key]);
    });

    return axios.post('app/api/listings', formData)
      .then((response) => {
        const property = {...response.data, status: 'Active'};

        dispatch({
          type: SET_PROPERTY,
          value: {
            properties: [...state.properties, property],
            property: property
          }
        });
      })
      .catch(e => console.error(e));
  };

  const selectProperty = (property) => {
    dispatch({
      type: SET_PROPERTY,
      value: {
        properties: state.properties,
        property: property
      }
    });
  };

  return { 
    state,
    isLoading,
    error,
    user,
    isAuthenticated,
    getAccessTokenSilently,
    loginWithRedirect,
    logout,
    addListing,
    selectProperty,
    uploadImage
  };
};