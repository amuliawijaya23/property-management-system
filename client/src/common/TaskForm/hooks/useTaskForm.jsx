import axios from 'axios';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTasksData } from '../../../state/reducers/app';
import { setPropertyTasks } from '../../../state/reducers/propertyReducer';

export default function useTaskForm(task) {
	const user = useSelector((state) => state.user.value);
	const property = useSelector((state) => state.property.value);
	const listingId = property?.details?.id;
	const dispatch = useDispatch();

	const initialForm = useMemo(
		() => ({
			summary: '',
			category: '',
			due_date: new Date(),
			agent_id: user?.sub,
			notes: '',
			listing_id: listingId ? listingId : false,
			status: 'Open'
		}),
		[listingId, user?.sub]
	);

	const [form, setForm] = useState(initialForm);

	const setEditForm = useCallback(() => {
		let taskForm = { ...initialForm };
		Object.keys(taskForm).forEach((key) => {
			if (task[key]) {
				taskForm[key] = task[key];
			}
		});
		setForm({ ...taskForm, id: task?.id, organization_id: task?.organization_id });
	}, [initialForm, task]);

	useEffect(() => {
		if (task?.id) {
			setEditForm();
		}
	}, [task?.id, setEditForm]);

	const handleCloseReset = () => {
		setForm(initialForm);
	};

	const setDueDate = (input) => {
		let data = { ...form };
		data.due_date = input;
		setForm({ ...data });
	};

	const setInput = (event, field) => {
		let data = { ...form };
		data[field] = event.target.value;
		setForm({ ...data });
	};

	const setValue = (input, field) => {
		let data = { ...form };
		data[field] = input;
		setForm({ ...data });
	};

	const createTask = async (task) => {
		const taskData = { ...task, organization_id: user.org_id };
		try {
			const response = await axios.post('/api/tasks', taskData);
			dispatch(updateTasksData(response.data));

			if (property.details.id) {
				const result = await axios.get(`/api/tasks/listing/${property.details.id}`);
				dispatch(setPropertyTasks(result.data));
			}
		} catch (error) {
			console.error(error);
		}
	};

	const updateTask = async (task) => {
		const taskData = { ...task, organization_id: user.org_id };
		try {
			const response = await axios.put('/api/tasks', taskData);
			dispatch(updateTasksData(response.data));

			if (property?.details.id) {
				const result = await axios.get(`/api/tasks/listing/${property.details.id}`);
				dispatch(setPropertyTasks(result.data));
			}
		} catch (error) {
			console.error(error);
		}
	};

	return {
		form,
		createTask,
		updateTask,
		handleCloseReset,
		setDueDate,
		setInput,
		setValue
	};
}
