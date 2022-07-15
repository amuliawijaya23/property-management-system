import { useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { setDefault, setTableRows } from '../../../state/reducers/tableReducer';

// import { updateTasksData } from 'state/reducers/app';
import { updateTasksData } from '../../../state/reducers/app';

import axios from 'axios';

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
				type: 'tasks'
			})
		);
	}, [edit, rows, dispatch]);

	useEffect(() => {
		initialize();
	}, [initialize]);
}
