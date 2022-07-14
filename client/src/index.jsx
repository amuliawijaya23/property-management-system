import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { Provider } from 'react-redux';
import { store } from './state/store';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientID = process.env.REACT_APP_AUTH0_CLIENT_ID;
const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Auth0Provider domain={domain} clientId={clientID} redirectUri={window.location.origin} audience={audience} onRedirectCallback={root.render()}>
		<Provider store={store}>
			<App />
		</Provider>
	</Auth0Provider>
);
