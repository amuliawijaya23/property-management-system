import { useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { setDefault, setTableRows } from '../state/reducers/tableReducer';

import { updateTasksData } from '../state/reducers/app';

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
		id: 'summary',
		numeric: true,
		disablePadding: false,
		label: 'Summary'
	},
	{
		id: 'category',
		numeric: true,
		disablePadding: false,
		label: 'Category'
	},
	{
		id: 'due_date',
		numeric: true,
		disablePadding: false,
		label: 'Due Date'
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
		return app.tasks?.map((task) => {
			const agent = app.agents?.find((agent) => agent?.user_id === task?.agent_id);
			return {
				id: task?.id,
				agent: agent?.picture,
				summary: task?.summary,
				category: task?.category,
				due_date: task?.due_date,
				status: task?.status
			};
		});
	}, [app.tasks, app.agents]);

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
				type: 'tasks'
			})
		);
	}, [edit, rows, dispatch]);

	useEffect(() => {
		initialize();
	}, [initialize]);

	const resetTasksData = () => {
		dispatch(setTableRows(rows));
	};

	const resetTasksRow = (index) => {
		const newRows = [...table.rows];
		let selected = [...table.selected];
		const id = selected[index];
		const rowIndex = newRows.map((row) => row.id).indexOf(id);
		const defaultData = app.tasks.find((task) => task.id === id);

		const agent = app.agents.find((user) => user.user_id === defaultData.agent_id);

		newRows[rowIndex] = {
			...newRows[rowIndex],
			agent: agent?.picture
		};
		dispatch(setTableRows(newRows));
	};

	const updateTasksTableData = () => {
		const tableData = [...table.rows];
		const selected = [...table.selected];
		let appData = [...app.tasks];

		selected.forEach(async (id) => {
			const index = appData.map((task) => task.id).indexOf(id);
			const rowData = { ...tableData.find((row) => row.id === id) };
			const agent = app.agents.find((agent) => agent.picture === rowData.agent);
			const newData = {
				...appData[index],
				// status: rowData.status,
				agent_id: agent.user_id
			};
			appData[index] = newData;
			await axios.put('/api/tasks', newData);
		});
		dispatch(updateTasksData(appData));
	};

	return {
		resetTasksData,
		resetTasksRow,
		updateTasksTableData
	};
}
