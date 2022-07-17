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
		const defaultTable = [...app[table?.type]];
		const setDispatch = (res) => {
			switch (table?.type) {
				case 'properties':
					dispatch(updatePropertiesData(res));
					break;

				case 'contacts':
					dispatch(updateContactsData(res));
					break;

				case 'tasks':
					dispatch(updateTasksData(res));
					break;

				case 'transactions':
					dispatch(updateTransactionsData(res));
					break;

				default:
					break;
			}
		};

		selected.forEach(async (id) => {
			const index = defaultTable.map((data) => data.id).indexOf(id);
			const rowData = { ...tableData.find((row) => row.id === id) };
			let newData = { ...defaultTable[index], agent_id: rowData?.agent?.user_id };
			const response = await axios.put(`/api/${table?.type}`, newData);
			setDispatch(response.data);
		});
		window.localStorage.setItem('rows', JSON.stringify({ data: [...table.rows] }));
	};

	const updateRowsAgent = (agent) => {
		let newRows = [...table.rows];
		table?.selected?.forEach((id) => {
			const index = newRows.map((row) => row?.id).indexOf(id);
			let currentRow = { ...newRows[index] };
			currentRow.agent = agent;
			newRows[index] = currentRow;
		});
		dispatch(setTableRows(newRows));
	};

	return {
		resetTableData,
		resetRows,
		updateTableData,
		updateRowsAgent
	};
}
