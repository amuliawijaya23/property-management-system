import { useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setDefault } from '../../../state/reducers/tableReducer';

const columns = [
	{
		id: 'id',
		numeric: false,
		disablePadding: false,
		label: 'ID'
	},
	{
		id: 'agent',
		numeric: true,
		disablePadding: false,
		label: 'Agent'
	},
	{
		id: 'type',
		numeric: true,
		disablePadding: false,
		label: 'Type'
	},
	{
		id: 'start_date',
		numeric: true,
		disablePadding: false,
		label: 'Start Date'
	},
	{
		id: 'end_date',
		numeric: true,
		disablePadding: false,
		label: 'End Date'
	},
	{
		id: 'status',
		numeric: true,
		disablePadding: false,
		label: 'Status'
	},
	{
		id: 'amount',
		disablePadding: false,
		label: 'Amount'
	}
];

export default function useTransactionsData() {
	const app = useSelector((state) => state.app.value);

	const dispatch = useDispatch();

	const rows = useMemo(() => {
		return app.transactions?.map((transaction) => {
			const agent = app.agents?.find((agent) => agent?.user_id === transaction?.agent_id);
			return {
				id: transaction?.id,
				agent: agent,
				type: transaction?.transaction_type,
				start_date: transaction?.start_date,
				end_date: transaction?.end_date,
				status: transaction?.status,
				amount: transaction?.transaction_value
			};
		});
	}, [app.transactions, app.agents]);

	const initialize = useCallback(async () => {
		await dispatch(
			setDefault({
				columns: columns,
				rows: rows,
				selected: [],
				filters: {
					agents: [],
					status: []
				},
				type: 'transactions'
			})
		);
		window.localStorage.setItem('rows', JSON.stringify({ data: [...rows] }));
	}, [rows, dispatch]);

	useEffect(() => {
		initialize();
	}, [initialize]);
}
