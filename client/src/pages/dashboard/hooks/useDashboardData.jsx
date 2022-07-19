import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setUser, setStream, setSale, setLease, setGraph } from '../../../state/reducers/dashboardReducer';

import startOfYear from 'date-fns/esm/fp/startOfYear';
import subYears from 'date-fns/subYears';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import eachMonthOfInterval from 'date-fns/eachMonthOfInterval';
import format from 'date-fns/format';

export const useDashboardData = () => {
	// Global State
	const user = useSelector((state) => state.user.value);
	const dashboard = useSelector((state) => state?.dashboard?.value);
	const dispatch = useDispatch();

	// Local State
	const [range, setRange] = useState({
		start: startOfYear(new Date()),
		end: new Date()
	});
	const [pastRange, setPastRange] = useState({
		start: subYears(startOfYear(new Date()), 1),
		end: subYears(new Date(), 1)
	});

	const getStream = useCallback(async () => {
		const data = {
			status: 'Completed',
			agent_id: dashboard?.user,
			organization_id: user?.org_id
		};

		try {
			const [totalStream, pastStream, totalSale, pastSale, totalLease, pastLease] = await Promise.all([
				axios.post(`/api/transactions/data`, { ...range, ...data }),
				axios.post(`/api/transactions/data`, { ...pastRange, ...data }),
				axios.post(`/api/transactions/data`, { ...range, ...data, transaction_type: 'Sale' }),
				axios.post(`/api/transactions/data`, { ...pastRange, ...data, transaction_type: 'Sale' }),
				axios.post(`/api/transactions/data`, { ...range, ...data, transaction_type: 'Lease' }),
				axios.post(`/api/transactions/data`, { ...pastRange, ...data, transaction_type: 'Lease' })
			]);

			dispatch(
				setStream({
					current: parseInt(totalStream?.data?.sum),
					past: parseInt(pastStream?.data?.sum),
					currentTransactions: totalStream?.data?.transactions,
					pastTransactions: pastStream?.data?.transactions,
					count: parseInt(totalStream?.data?.count),
					pastCount: parseInt(pastStream?.data?.count)
				})
			);

			dispatch(
				setSale({
					current: parseInt(totalSale?.data?.sum),
					past: parseInt(pastSale?.data?.sum),
					currentTransactions: totalSale?.data?.transactions,
					pastTransactions: pastSale?.data?.transactions,
					count: parseInt(totalSale?.data?.count),
					pastCount: parseInt(pastSale?.data?.count)
				})
			);

			dispatch(
				setLease({
					current: parseInt(totalLease?.data?.sum),
					past: parseInt(pastLease?.data?.sum),
					currentTransactions: totalLease?.data?.transactions,
					pastTransactions: pastLease?.data?.transactions,
					count: parseInt(totalLease?.data?.count),
					pastCount: parseInt(pastLease?.data?.count)
				})
			);
		} catch (error) {
			error.response ? console.error(error.response.body) : console.error(error);
		}
	}, [range, pastRange, dashboard?.user, user?.org_id, dispatch]);

	const getGraphData = useCallback(async () => {
		const data = {
			status: 'Completed',
			agent_id: dashboard?.user,
			organization_id: user?.org_id
		};

		try {
			const months = eachMonthOfInterval({ ...range }).map((month) => ({
				start: startOfMonth(month),
				end: endOfMonth(month)
			}));

			const pastMonths = eachMonthOfInterval({ ...pastRange }).map((month) => ({
				start: startOfMonth(month),
				end: endOfMonth(month)
			}));

			const allTransactions = await axios.post(`/api/transactions/data`, { ...range, organization_id: user?.org_id, status: 'Completed' });
			const transactions = await (await Promise.all(months.map((month) => axios.post(`/api/transactions/data`, { ...month, ...data })))).map((transaction) => transaction.data);
			const pastTransactions = await (await Promise.all(pastMonths.map((month) => axios.post(`/api/transactions/data`, { ...month, ...data })))).map((transaction) => transaction.data);
			const label = months.map((month) => format(new Date(month.start), 'PP'));

			dispatch(
				setGraph({
					current: transactions,
					past: pastTransactions,
					label: label,
					total: allTransactions?.data?.transactions
				})
			);
		} catch (error) {
			console.error(error.response ? error.response.body : error);
		}
	}, [dashboard?.user, user?.org_id, range, pastRange, dispatch]);

	useEffect(() => {
		getStream();
		getGraphData();
	}, [getStream, getGraphData]);

	const selectAgent = (input) => {
		dispatch(setUser(input));
	};

	return {
		selectAgent
	};
};
