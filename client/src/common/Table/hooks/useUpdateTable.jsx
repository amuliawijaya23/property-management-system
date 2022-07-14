import { useSelector, useDispatch } from 'react-redux';

import { setTableRows } from '../../../state/reducers/tableReducer';

import { updatePropertiesData, updateContactsData, updateTasksData } from '../../../state/reducers/app';

import axios from 'axios';

export default function useUpdateTable() {
	const app = useSelector((state) => state.app.value);
	const table = useSelector((state) => state.table.value);
	const dispatch = useDispatch();

	const rows = (() => {
		switch (table.type) {
			case 'properties':
				return app.properties?.map((property) => ({
					id: property?.id,
					title: property?.title,
					address: property?.address,
					agent: (app.agents?.find((agent) => agent?.user_id === property?.seller_id)).picture,
					status: property?.status
				}));

			case 'contacts':
				return app.contacts?.map((contact) => ({
					id: contact?.id,
					name: `${contact.first_name} ${contact.last_name}`,
					email: contact?.email,
					mobile: contact?.mobile,
					agent: (app.agents?.find((agent) => agent?.user_id === contact?.agent_id)).picture
				}));

			case 'tasks':
				return app.tasks?.map((task) => ({
					id: task?.id,
					agent: (app.agents?.find((agent) => agent?.user_id === task?.agent_id)).picture,
					summary: task?.summary,
					category: task?.category,
					due_date: task?.due_date,
					status: task?.status
				}));

			default:
				return;
		}
	})();

	const resetTableData = () => {
		dispatch(setTableRows(rows));
	};

	const resetRows = (index) => {
		const newRows = [...table.rows];
		let selected = [...table.selected];
		const id = selected[index];
		const rowIndex = newRows.map((row) => row.id).indexOf(id);

		const initial = (() => {
			switch (table.type) {
				case 'properties':
					const propertyData = app.properties.find((property) => property.id === id);
					return {
						data: propertyData,
						agent: app.agents.find((user) => user.user_id === propertyData.seller_id)
					};

				case 'contacts':
					const contactData = app.contacts.find((contact) => contact.id === id);
					return {
						data: contactData,
						agent: app.agents.find((user) => user.user_id === contactData.agent_id)
					};

				case 'tasks':
					const taskData = app.tasks.find((task) => task.id === id);
					return {
						data: taskData,
						agent: app.agents.find((user) => user.user_id === taskData.agent_id)
					};

				default:
					return;
			}
		})();

		newRows[rowIndex] = {
			...newRows[rowIndex],
			agent: initial?.agent?.picture
		};

		if (table.type === 'properties') {
			newRows[rowIndex] = {
				...newRows[rowIndex],
				status: initial?.data?.status
			};
		}

		dispatch(setTableRows(newRows));
	};

	const updateTableData = () => {
		const tableData = [...table.rows];
		const selected = [...table.selected];

		const defaultData = (() => {
			switch (table.type) {
				case 'properties':
					return [...app.properties];

				case 'contacts':
					return [...app.contacts];

				case 'tasks':
					return [...app.tasks];

				default:
					break;
			}
		})();

		selected.forEach(async (id) => {
			const index = defaultData.map((data) => data.id).indexOf(id);
			const rowData = { ...tableData.find((row) => row.id === id) };
			const agent = app.agents.find((agent) => agent.picture === rowData.agent);
			let newData = { ...defaultData[index] };

			if (table.type === 'properties') {
				newData.status = rowData.status;
				newData.seller_id = agent.user_id;
				defaultData[index] = newData;
				await axios.put('/api/listing', newData);
			} else if (table.type === 'contacts') {
				newData.agent_id = agent.user_id;
				defaultData[index] = newData;
				await axios.put('/api/contacts', newData);
			} else {
				newData.agent_id = agent.user_id;
				defaultData[index] = newData;
				await axios.put('/api/tasks', newData);
			}
		});

		if (table.type === 'properties') {
			dispatch(updatePropertiesData(defaultData));
		} else if (table.type === 'contacts') {
			dispatch(updateContactsData(defaultData));
		} else {
			dispatch(updateTasksData(defaultData));
		}
	};

	return {
		resetTableData,
		resetRows,
		updateTableData
	};
}
