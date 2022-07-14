import { useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setDefault, setTableRows } from '../../../state/reducers/tableReducer';

import { updatePropertiesData } from '../../../state/reducers/app';

const columns = [
	{
		id: 'id',
		numeric: false,
		disablePadding: false,
		label: 'ID'
	},
	{
		id: 'title',
		numeric: true,
		disablePadding: false,
		label: 'Title'
	},
	{
		id: 'address',
		numeric: true,
		disablePadding: false,
		label: 'Address'
	},
	{
		id: 'agent',
		numeric: true,
		disablePadding: false,
		label: 'Agent'
	},
	{
		id: 'status',
		numeric: true,
		disablePadding: false,
		label: 'Status'
	}
];

export default function usePropertiesData() {
	const app = useSelector((state) => state.app.value);

	const dispatch = useDispatch();

	const rows = useMemo(() => {
		return app.properties?.map((property) => {
			const seller = app.agents?.find((agent) => agent?.user_id === property?.seller_id);
			return {
				id: property?.id,
				title: property?.title,
				address: property?.address,
				agent: seller?.picture,
				status: property?.status
			};
		});
	}, [app.properties, app.agents]);

	const edit = useMemo(
		() => ({
			status: ['Open', 'Offer Accepted', 'Deposit Received', 'Completion', 'Closed'],
			seller_id: app.agents.map((agent) => agent?.name)
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
				type: 'properties'
			})
		);
	}, [edit, rows, dispatch]);

	useEffect(() => {
		initialize();
	}, [initialize]);
}
