import './styles.scss';

import CssBaseline from '@mui/material/CssBaseline';

import Header from './Header';
import Loading from './Loading';
import Dashboard from './Dashboard';
import PropertyList from './PropertyList';
import Property from './Property';
import Communication from './Communications/Index';

import useApplicationData from '../hooks/useApplicationData';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
	const { isLoading, error, loginWithRedirect, logout } = useApplicationData();

	return (
		<Router>
			<div className='App'>
				<CssBaseline />
				<Header loginWithRedirect={loginWithRedirect} logout={logout} />
				{isLoading && <Loading />}
				{!isLoading && (
					<Routes>
						<Route path='/' element={<Dashboard />} />
						<Route path='/properties/*' element={<PropertyList />} />
						<Route path='communications' element={<Communication />} />
						<Route path='/property/*' element={<Property />} />
					</Routes>
				)}
			</div>
		</Router>
	);
}
