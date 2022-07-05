import './styles.scss';

import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

// import components
import Navigation from './common/Navigation';
import Loading from './common/Loading';
import BasicSpeedDial from './common/SpeedDial';

// import pages
import Dashboard from './pages/dashboard';
import Properties from './pages/properties';
import Outreach from './pages/outreach';
import Tasks from './pages/tasks';
import Contacts from './pages/contacts';
import Property from './pages/property';

import useApplicationData from './hooks/useApplicationData';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
	const { isLoading, error, loginWithRedirect, logout } = useApplicationData();

	return (
		<Router>
			<div className='App'>
				<CssBaseline />
				<Navigation loginWithRedirect={loginWithRedirect} logout={logout} />
				{isLoading && <Loading />}
				{!isLoading && (
					<section className='main'>
						<Routes>
							<Route path='/' element={<Dashboard />} />
							<Route path='/properties/*' element={<Properties />} />
							<Route path='/tasks/*' element={<Tasks />} />
							<Route path='/contacts/*' element={<Contacts />} />
							<Route path='/property/*' element={<Property />} />
							<Route path='/outreach' element={<Outreach />} />
						</Routes>
						<BasicSpeedDial />
					</section>
				)}
			</div>
		</Router>
	);
}
