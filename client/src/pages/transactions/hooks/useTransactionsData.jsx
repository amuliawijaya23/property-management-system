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
	const table = useSelector((state) => state.table.value);

	const dispatch = useDispatch();

	const rows = useMemo(() => {
		return app.transactions?.map((transaction) => {
			const agent = app.agents?.find((agent) => agent?.user_id === transaction?.agent_id);
			return {
				id: transaction?.id,
				agent: agent?.picture,
				type: transaction?.transaction_type,
				start_date: transaction?.date_started,
				end_date: transaction?.date_closed,
				status: transaction?.status,
				amount: transaction?.amount
			};
		});
	}, [app.transactions, app.agents]);

	const edit = useMemo(
		() => ({
			status: ['Open', 'Pending', 'Active', 'Closed'],
			agent: app.agents.map((agent) => agent?.name)
		}),
		[app.agents]
	);

	const initialize = useCallback(async () => {
		await dispatch(
			setDefault({
				columns: columns,
				rows: rows,
				selected: [],
				edit: edit,
				type: 'transactions'
			})
		);
	}, [edit, rows, dispatch]);

	useEffect(() => {
		initialize();
	}, [initialize]);
}
