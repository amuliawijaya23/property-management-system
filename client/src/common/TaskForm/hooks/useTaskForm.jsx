import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { updateTasksData } from '../../../state/reducers/app';
import { setPropertyTasks } from '../../../state/reducers/propertyReducer';
import { useNavigate } from 'react-router-dom';

export default function useTaskForm() {
	const app = useSelector((state) => state.app.value);
	const user = useSelector((state) => state.user.value);
	const property = useSelector((state) => state.property.value);
	const dispatch = useDispatch();

	const createTask = async (task) => {
		const taskData = { ...task, organization_id: user.org_id };
		try {
			const response = await axios.post('/api/tasks', taskData);
			dispatch(updateTasksData(response.data));

			if (property.details.id) {
				const response = await axios.get(`/api/tasks/listing/${property.details.id}`);
				dispatch(setPropertyTasks(response.data));
			}
		} catch (error) {
			console.error(error);
		}
	};

	const updateTask = async (task) => {
		const taskData = { ...task, organization_id: user.org_id };
		try {
			const response = await axios.put('/api/tasks', taskData);
			let tasks = [...app.tasks];
			const taskIndex = tasks.map((task) => task.id).indexOf(response.data[0].id);
			let propTasks = [...property.tasks];
			const propTaskIndex = propTasks.map((task) => task.id).indexOf(response.data[0].id);

			tasks[taskIndex] = response.data[0];
			propTasks[propTaskIndex] = response.data[0];
			dispatch(updateTasksData(tasks));
			dispatch(setPropertyTasks(propTasks));
		} catch (error) {
			console.error(error);
		}
	};

	return {
		createTask,
		updateTask
	};
}
