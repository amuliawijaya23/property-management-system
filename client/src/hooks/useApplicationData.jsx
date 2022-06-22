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


  const addListing = (listing) => {
    const formData = new FormData();
    Object.keys(listing).forEach((key) => {
      formData.append(key, listing[key]);
    });

    return axios.post('app/api/listings', formData)
      .then((response) => {
        dispatch({
          type: SET_PROPERTY,
          value: {
            properties: response.data,
            property: null
          }
        })
      })
      .catch(e => console.error(e));
  };

  const selectProperty = (newProperty) => {
    return Promise.all([
      axios.get(`app/images/listing/${newProperty.id}`),
      axios.get(`app/message/${newProperty.id}`)
    ])
    .then((response) => {
      const [images, messages] = response;

      dispatch({
        type: SET_PROPERTY,
        value: {
          properties: state.properties,
          property: {
            details: newProperty,
            images: images.data,
            messages: messages.data
          }
        }
      })
    })
    .catch(e => console.error(e));
  };

  const uploadImages = (images) => {

    images.images.map((image) => {
      const formData = new FormData();
      formData.append('image', image);

      delete images.images;
      Object.keys(images).forEach((key) => {
        formData.append(key, images[key]);
      });
      return axios.post('app/images/listing', formData)
        .then((response) => {
          dispatch({
            type: SET_PROPERTY,
            value: {
              properties: state.properties,
              property: {...state.property, images: [...response.data]}
            }
          });
        })
        .catch(e => console.error(e));
    });
  };

  const sendMessage  = (message) => {
    return axios.post('app/message', {...message})
      .then((response) => {
        dispatch({
          type: SET_PROPERTY,
          value: {
            properties: state.properties,
            property: {...state.property, messages: [...response.data]}
          }
        });
      })
      .catch(e => console.error(e));
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
    uploadImages,
    sendMessage
  };
};