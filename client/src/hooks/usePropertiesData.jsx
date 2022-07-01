import { useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { setDefault, setTableRows } from '../state/reducers/tableReducer';

import { updatePropertiesData } from '../state/reducers/app';

import axios from 'axios';

const columns = [
	{
		id: 'id',
		numeric: false,
		disablePadding: true,
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
	const table = useSelector((state) => state.table.value);

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
			status: ['Active', 'Offer Accepted', 'Deposit Received', 'Closing'],
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

	const resetPropertiesData = () => {
		dispatch(setTableRows(rows));
	};

	const resetPropertiesRow = (index) => {
		const newRows = [...table.rows];
		let selected = [...table.selected];
		const id = selected[index];
		const rowIndex = newRows.map((row) => row.id).indexOf(id);
		const defaultData = app.properties.find((property) => property.id === id);

		const agent = app.agents.find((user) => user.user_id === defaultData.seller_id);
		newRows[rowIndex] = {
			...newRows[rowIndex],
			agent: agent?.picture,
			status: defaultData.status
		};
		dispatch(setTableRows(newRows));
	};

	const updatePropertiesTableData = () => {
		const tableData = [...table.rows];
		const selected = [...table.selected];
		let appData = [...app.properties];

		selected.forEach(async (id) => {
			const index = appData.map((property) => property.id).indexOf(id);
			const rowData = { ...tableData.find((row) => row.id === id) };
			const seller = app.agents.find((agent) => agent.picture === rowData.agent);
			const newData = {
				...appData[index],
				status: rowData.status,
				seller_id: seller.user_id
			};
			appData[index] = newData;
			await axios.put('/api/listing', newData);
		});
		dispatch(updatePropertiesData(appData));
	};

	return {
		resetPropertiesData,
		resetPropertiesRow,
		updatePropertiesTableData
	};
}
