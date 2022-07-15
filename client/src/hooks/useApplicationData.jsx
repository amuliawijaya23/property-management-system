import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// state management
import { useDispatch } from 'react-redux';

// reducers
import { login } from '../state/reducers/userReducer';
import { initialize } from '../state/reducers/app';
import { setDashboard } from '../state/reducers/dashboardReducer';
// import { setTableData } from '../state/reducers/tableReducer';

import axios from 'axios';

export default function useApplicationData() {
	const { isLoading, isAuthenticated, error, user, getAccessTokenSilently, loginWithRedirect, logout } = useAuth0();

	const dispatch = useDispatch();

	useEffect(() => {
		const startUp = async () => {
			try {
				const token = await getAccessTokenSilently();

				const appData = await Promise.all([
					axios.get(`/api/listings/${user?.org_id}`),
					axios.get(`/api/transactions/${user?.org_id}`),
					axios.get(`/api/contacts/${user?.org_id}`),
					axios.get(`/api/tasks/${user?.org_id}`),
					axios.get(`/user/organization/${user?.org_id}`, {
						headers: { Authorization: `Bearer ${token}` }
					}),
					axios.get(`/user/role/${user?.sub}`, {
						headers: { Authorization: `Bearer ${token}` }
					})
				]);
				const [listings, transactions, contacts, tasks, agents, role] = appData;

				dispatch(
					login({
						name: user.name,
						picture: user.picture,
						email: user.email,
						email_verified: user.email_verified,
						sub: user.sub,
						org_id: user.org_id,
						isAuthenticated: isAuthenticated,
						role: role.data[0]?.name || 'user',
						role_id: role.data[0]?.id || 'user'
					})
				);

				dispatch(
					initialize({
						properties: listings.data,
						agents: agents.data,
						contacts: contacts.data,
						tasks: tasks.data,
						transactions: transactions.data
					})
				);

				dispatch(
					setDashboard({
						properties: listings?.data?.filter((listing) => listing.agent_id === user?.sub),
						tasks: tasks?.data?.filter((task) => task.agent_id === user.sub),
						contacts: contacts?.data?.filter((contact) => contact.agent_id === user?.sub),
						transactions: transactions?.data?.filter((transaction) => transaction.agent_id === user?.sub)
					})
				);
			} catch (error) {
				console.error(error);
			}
		};

		if (isAuthenticated) {
			startUp();
		}
	}, [isAuthenticated, user, getAccessTokenSilently, dispatch]);

	return {
		isLoading,
		error,
		isAuthenticated,
		getAccessTokenSilently,
		loginWithRedirect,
		logout
	};
}
