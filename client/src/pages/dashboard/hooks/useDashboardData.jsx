import axios from 'axios';
import { useState, useEffect, useCallback, useMemo } from 'react';
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

	const [distance, setDistance] = useState(1);

	const pastRange = useMemo(
		() => ({
			start: subYears(new Date(range?.start), distance),
			end: subYears(new Date(range?.end), distance)
		}),
		[range?.start, range?.end, distance]
	);

	const getStream = useCallback(async () => {
		const data = {
			agent_id: dashboard?.user,
			organization_id: user?.org_id
		};

		try {
			const [totalSale, pastTotalSales, totalLeases, pastTotalLeases] = await Promise.all([
				axios.post(`/api/transactions/data`, { ...range, ...data, transaction_type: 'Sale' }),
				axios.post(`/api/transactions/data`, { ...pastRange, ...data, transaction_type: 'Sale' }),
				axios.post(`/api/transactions/data`, { ...range, ...data, transaction_type: 'Lease' }),
				axios.post(`/api/transactions/data`, { ...pastRange, ...data, transaction_type: 'Lease' })
			]);

			const sales = parseInt(totalSale?.data?.sum);
			const salesCount = parseInt(totalSale?.data?.count);
			const salesTransactions = totalSale?.data?.transactions;

			const leases = parseInt(totalLeases?.data?.sum);
			const leasesCount = parseInt(totalLeases?.data?.count);
			const leasesTransactions = totalLeases?.data?.transactions;

			const pastSales = parseInt(pastTotalSales?.data?.sum);
			const pastSalesCount = parseInt(pastTotalSales?.data?.count);
			const pastSalesTransactions = pastTotalSales?.data?.transactions;

			const pastLeases = parseInt(pastTotalLeases?.data?.sum);
			const pastLeasesCount = parseInt(pastTotalLeases?.data?.count);
			const pastLeasesTransactions = pastTotalLeases?.data?.transactions;

			dispatch(
				setStream({
					current: sales + leases,
					past: pastSales + pastLeases,
					currentTransactions: salesTransactions.concat(leasesTransactions),
					pastTransactions: pastSalesTransactions.concat(pastLeasesTransactions),
					count: salesCount,
					pastCount: pastSalesCount
				})
			);

			dispatch(
				setSale({
					current: sales,
					past: pastSales,
					currentTransactions: salesTransactions,
					pastTransactions: pastSalesTransactions,
					count: salesCount,
					pastCount: pastSalesCount
				})
			);

			dispatch(
				setLease({
					current: leases,
					past: pastLeases,
					currentTransactions: leasesTransactions,
					pastTransactions: pastLeasesTransactions,
					count: leasesCount,
					pastCount: pastLeasesCount
				})
			);
		} catch (error) {
			error.response ? console.error(error.response.body) : console.error(error);
		}
	}, [range, pastRange, dashboard?.user, user?.org_id, dispatch]);

	const getGraphData = useCallback(async () => {
		const data = {
			agent_id: dashboard?.user,
			organization_id: user?.org_id
		};

		try {
			const months = eachMonthOfInterval({ ...range }).map((month, i) => {
				if (i === 0) {
					return {
						start: range?.start,
						end: endOfMonth(month)
					};
				}
				if (i === eachMonthOfInterval({ ...range }).length - 1) {
					return {
						start: startOfMonth(month),
						end: range?.end
					};
				}
				return {
					start: startOfMonth(month),
					end: endOfMonth(month)
				};
			});

			const pastMonths = eachMonthOfInterval({ ...pastRange }).map((month, i) => {
				if (i === 0) {
					return {
						start: pastRange?.start,
						end: endOfMonth(month)
					};
				}
				if (i === eachMonthOfInterval({ ...pastRange }).length - 1) {
					return {
						start: startOfMonth(month),
						end: pastRange?.end
					};
				}
				return {
					start: startOfMonth(month),
					end: endOfMonth(month)
				};
			});

			const allTransactions = await axios.post(`/api/transactions/data`, { ...range, organization_id: user?.org_id, status: 'Closed' });
			const sales = await (await Promise.all(months.map((month) => axios.post(`/api/transactions/data`, { ...month, ...data, transaction_type: 'Sale' })))).map((transaction) => transaction.data);
			const leases = await (await Promise.all(months.map((month) => axios.post(`/api/transactions/data`, { ...month, ...data, transaction_type: 'Lease' })))).map((transaction) => transaction.data);
			const pastSales = await (
				await Promise.all(pastMonths.map((month) => axios.post(`/api/transactions/data`, { ...month, ...data, transaction_type: 'Sale' })))
			).map((transaction) => transaction.data);
			const pastLeases = await (
				await Promise.all(pastMonths.map((month) => axios.post(`/api/transactions/data`, { ...month, ...data, transaction_type: 'Lease' })))
			).map((transaction) => transaction.data);

			const label = months.map((month, i) => (i === 0 ? format(new Date(month.start), 'P') : format(new Date(month.end), 'P')));

			dispatch(
				setGraph({
					sales: sales,
					leases: leases,
					pastSales: pastSales,
					pastLeases: pastLeases,
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

	const setStart = (input) => {
		setRange({ ...range, start: input });
	};

	const setEnd = (input) => {
		setRange({ ...range, end: input });
	};

	const selectDistance = (event) => {
		setDistance(event.target.value);
	};

	return {
		range,
		distance,
		setStart,
		setEnd,
		selectDistance,
		selectAgent
	};
};
