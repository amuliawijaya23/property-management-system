import { useSelector, useDispatch } from 'react-redux';

import { setTableRows } from '../../../state/reducers/tableReducer';

import { updatePropertiesData, updateContactsData, updateTasksData, updateTransactionsData } from '../../../state/reducers/app';

import axios from 'axios';

export default function useUpdateTable() {
	const app = useSelector((state) => state.app.value);
	const table = useSelector((state) => state.table.value);
	const dispatch = useDispatch();

	const defaultRows = JSON.parse(window.localStorage.getItem('rows'))?.data;

	const resetTableData = () => {
		dispatch(setTableRows(defaultRows));
	};

	const resetRows = (index) => {
		const newRows = [...table.rows];
		let selected = [...table.selected];
		const id = selected[index];
		const rowIndex = newRows.map((row) => row.id).indexOf(id);
		const data = app[table?.type].find((data) => data.id === id);

		newRows[rowIndex] = {
			...newRows[rowIndex],
			agent: app?.agents?.find((user) => user?.user_id === data?.agent_id)
		};

		dispatch(setTableRows(newRows));
	};

	const updateTableData = () => {
		const tableData = [...table.rows];
		const selected = [...table.selected];
		const defaultData = [...app[table?.type]];

		selected.forEach(async (id) => {
			const index = defaultData.map((data) => data.id).indexOf(id);
			const rowData = { ...tableData.find((row) => row.id === id) };
			const agent = app.agents.find((agent) => agent.picture === rowData.agent);
			let newData = { ...defaultData[index] };
			newData.agent_id = agent.user_id;

			switch (table?.type) {
				case 'properties':
					await axios.put('/api/listing', newData);
					break;

				case 'contacts':
					await axios.put('/api/contacts', newData);
					break;

				case 'tasks':
					await axios.put('/api/tasks', newData);
					break;

				case 'transactions':
					await axios.put('/api/transactions', newData);
					break;

				default:
					break;
			}
			defaultData[index] = newData;
		});

		switch (table?.type) {
			case 'properties':
				dispatch(updatePropertiesData(defaultData));
				break;

			case 'contacts':
				dispatch(updateContactsData(defaultData));
				break;

			case 'tasks':
				dispatch(updateTasksData(defaultData));
				break;

			case 'transactions':
				dispatch(updateTransactionsData(defaultData));
				break;

			default:
				break;
		}
	};

	const updateRowsAgent = (agent) => {
		console.log('agent', agent);
		let newRows = [...table.rows];
		table?.selected?.forEach((id) => {
			const index = newRows.map((row) => row?.id).indexOf(id);
			let currentRow = { ...newRows[index] };
			currentRow.agent = agent;
			newRows[index] = currentRow;
		});
		console.log('new rows', newRows);
		dispatch(setTableRows(newRows));
	};

	return {
		resetTableData,
		resetRows,
		updateTableData,
		updateRowsAgent
	};
}
