import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// state management
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { login } from "../state/reducers/userReducer";
import { initialize } from "../state/reducers/app";

import axios from "axios";

export default function useApplicationData() {
  const app = useSelector((state) => state.app?.value);

  const { 
    isLoading, 
    isAuthenticated,
    error,
    user,
    getAccessTokenSilently,
    loginWithRedirect,
    logout
  } = useAuth0();

  const dispatch = useDispatch();
  
  useEffect(() => {
    const startUp = async () => {
      dispatch(login({
        name: user.name,
        picture: user.picture,
        email: user.email,
        email_verified: user.email_verified,
        sub: user.sub,
        org_id: user.org_id
      }));
      try {
        const token = await getAccessTokenSilently();
        
        const appData = await Promise.all([
        axios.get(`api/listings/${user?.org_id}`),
        axios.get(`user/organization/${user?.org_id}`,
            {headers: { Authorization: `Bearer ${token}` }})
        ]);
        const [listings, agents] = appData;
  
        dispatch(initialize({
          properties: listings.data,
          agents: agents.data
        }));
      } catch (error) {
        console.error(error);
      }
    };

    if(isAuthenticated) {
      startUp();
    };
  }, [isAuthenticated, user, getAccessTokenSilently, dispatch]);

  const addListing = async(listing) => {
    const formData = new FormData();
    Object.keys(listing).forEach((key) => {
      formData.append(key, listing[key]);
    });

    try {
      const response = await axios.post('/api/listings', formData);
      dispatch(initialize({
        properties: response.data,
        agents: app.agents
      }));
    } catch (error) {
      console.error(error);
    };
  };

  return { 
    isLoading,
    error,
    isAuthenticated,
    getAccessTokenSilently,
    loginWithRedirect,
    logout,
    addListing,
  };
};