import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { updateTasksData } from '../../../state/reducers/app';
import { setPropertyTasks } from '../../../state/reducers/propertyReducer';

export default function useTaskForm() {
	const user = useSelector((state) => state.user.value);
	const property = useSelector((state) => state.property.value);
	const dispatch = useDispatch();

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
		createTask,
		updateTask
	};
}
