import './styles.scss';

import CssBaseline from '@mui/material/CssBaseline';

import Navigation from './Navigation';
import Loading from './Loading';
import Dashboard from './Dashboard';
import Properties from './Properties';
import Property from './Property';
import Tasks from './Tasks';
import Outreach from './Outreach';
import Contacts from './Contacts';

import useApplicationData from '../hooks/useApplicationData';

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
					<Routes>
						<Route path='/' element={<Dashboard />} />
						<Route path='/properties/*' element={<Properties />} />
						<Route path='communications' element={<Outreach />} />
						<Route path='/tasks/*' element={<Tasks />} />
						<Route path='/property/*' element={<Property />} />
						<Route path='/contacts/*' element={<Contacts />} />
					</Routes>
				)}
			</div>
		</Router>
	);
}
