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
            axios.get(`api/listings/${user?.org_id}`),
            axios.get(`user/organization/${user?.org_id}`, {
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
    formData.append('thumbnailImage', listing.thumbnailImage);
    formData.append('title', listing.title);
    formData.append('description', listing.description);
    formData.append('streetAdress', listing.streetAddress);
    formData.append('city', listing.city);
    formData.append('province', listing.province);
    formData.append('postalCode', listing.postalCode);
    formData.append('country', listing.country);
    formData.append('type', listing.type);
    formData.append('size', listing.size);
    formData.append('bedrooms', listing.bedrooms);
    formData.append('bathrooms', listing.bathrooms);
    formData.append('parking', listing.parking);
    formData.append('organization_id', listing.organization_id);
    formData.append('seller_id', listing.seller_id);
    formData.append('price', listing.price);

    return axios.post('api/listings', formData)
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

  return { 
    state,
    isLoading,
    error,
    user,
    isAuthenticated,
    getAccessTokenSilently,
    loginWithRedirect,
    logout,
    addListing
  };
};