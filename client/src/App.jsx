import { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';

// import components
import Navigation from './common/Navigation';
import Loading from './common/Loading';

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
			<Box>
				<CssBaseline />
				<Navigation loginWithRedirect={loginWithRedirect} logout={logout} />
				{isLoading && <Loading />}
				{!isLoading && (
					<Box sx={{ display: 'flex', mt: 8, mb: 2, alignItems: 'center', justifyContent: 'center' }}>
						<Routes>
							<Route path='/' element={<Dashboard />} />
							<Route path='/properties' element={<Properties />} />
							<Route path='/tasks' element={<Tasks />} />
							<Route path='/contacts/*' element={<Contacts />} />
							<Route path='/property/:id' element={<Property />} />
							<Route path='/outreach' element={<Outreach />} />
						</Routes>
					</Box>
				)}
			</Box>
		</Router>
	);
}
