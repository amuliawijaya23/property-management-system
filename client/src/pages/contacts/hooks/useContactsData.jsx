import { useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { setDefault, setTableRows } from '../../../state/reducers/tableReducer';

import { updateContactsData } from '../../../state/reducers/app';

import axios from 'axios';

const columns = [
	{
		id: 'id',
		numeric: false,
		disablePadding: true,
		label: 'ID'
	},
	{
		id: 'agent',
		numeric: true,
		disablePadding: false,
		label: 'Agent'
	},
	{
		id: 'name',
		numeric: true,
		disablePadding: false,
		label: 'Name'
	},
	{
		id: 'email',
		numeric: true,
		disablePadding: false,
		label: 'Email'
	},
	{
		id: 'mobile',
		numeric: true,
		disablePadding: false,
		label: 'Mobile'
	}
];

export default function usePropertiesData() {
	const app = useSelector((state) => state.app.value);
	const table = useSelector((state) => state.table.value);

	const dispatch = useDispatch();

	const rows = useMemo(() => {
		return app.contacts?.map((contact) => {
			const agent = app.agents?.find((agent) => agent?.user_id === contact?.agent_id);
			return {
				id: contact?.id,
				name: `${contact.first_name} ${contact.last_name}`,
				email: contact?.email,
				mobile: contact?.mobile,
				agent: agent?.picture
			};
		});
	}, [app.contacts, app.agents]);

	const edit = useMemo(
		() => ({
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
				type: 'contacts'
			})
		);
	}, [edit, rows, dispatch]);

	useEffect(() => {
		initialize();
	}, [initialize]);

	const resetContactsData = () => {
		dispatch(setTableRows(rows));
	};

	const resetContactsRow = (index) => {
		const newRows = [...table.rows];
		let selected = [...table.selected];
		const id = selected[index];
		const rowIndex = newRows.map((row) => row.id).indexOf(id);
		const defaultData = app.contacts.find((contact) => contact.id === id);

		const agent = app.agents.find((user) => user.user_id === defaultData.agent_id);

		newRows[rowIndex] = {
			...newRows[rowIndex],
			agent: agent?.picture
		};
		dispatch(setTableRows(newRows));
	};

	const updateContactsTableData = () => {
		const tableData = [...table.rows];
		const selected = [...table.selected];
		let appData = [...app.contacts];

		selected.forEach(async (id) => {
			const index = appData.map((contact) => contact.id).indexOf(id);
			const rowData = { ...tableData.find((row) => row.id === id) };
			const agent = app.agents.find((agent) => agent.picture === rowData.agent);
			const newData = {
				...appData[index],
				agent_id: agent.user_id
			};
			appData[index] = newData;
			await axios.put('/api/contacts', newData);
		});
		dispatch(updateContactsData(appData));
	};

	return {
		resetContactsData,
		resetContactsRow,
		updateContactsTableData
	};
}
