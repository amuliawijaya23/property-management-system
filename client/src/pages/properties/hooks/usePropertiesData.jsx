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
		id: 'status',
		numeric: true,
		disablePadding: false,
		label: 'Status'
	},
	{
		id: 'updated_at',
		numeric: true,
		disablePadding: false,
		label: 'Updated'
	},
	{
		id: 'created_at',
		numeric: true,
		disablePadding: false,
		label: 'Created'
	},
	{
		id: 'valuation',
		numeric: true,
		disablePadding: false,
		label: 'Valuation'
	},
	{
		id: 'address',
		numeric: true,
		disablePadding: false,
		label: 'Address'
	},
	{
		id: 'title',
		numeric: true,
		disablePadding: false,
		label: 'Title'
	},
	{
		id: 'number_of_bedrooms',
		numeric: true,
		disablePadding: false,
		label: 'Bedrooms'
	},
	{
		id: 'number_of_bathrooms',
		numeric: true,
		disablePadding: false,
		label: 'Bathrooms'
	},
	{
		id: 'parking_space',
		numeric: true,
		disablePadding: false,
		label: 'Parking'
	}
];

export default function usePropertiesData() {
	const app = useSelector((state) => state.app.value);

	const dispatch = useDispatch();

	const rows = useMemo(() => {
		return app.properties?.map((property) => {
			const agent = app.agents?.find((agent) => agent?.user_id === property?.agent_id);
			return {
				id: property?.id,
				agent: agent,
				status: property?.status,
				updated_at: property?.updated_at,
				created_at: property?.created_at,
				valuation: property?.valuation,
				address: property?.address,
				title: property?.title,
				number_of_bedrooms: property?.number_of_bedrooms,
				number_of_bathrooms: property?.number_of_bathrooms,
				parking_space: property?.parking_space
			};
		});
	}, [app.properties, app.agents]);

	const initialize = useCallback(async () => {
		await dispatch(
			setDefault({
				columns: columns,
				rows: rows,
				selected: [],
				type: 'properties'
			})
		);
		window.localStorage.setItem('rows', JSON.stringify({ data: [...rows] }));
	}, [rows, dispatch]);

	useEffect(() => {
		initialize();
	}, [initialize]);
}
