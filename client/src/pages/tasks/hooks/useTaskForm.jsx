import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { updateTasksData } from '../../../state/reducers/app';
import { useNavigate } from 'react-router-dom';

export default function useTaskForm() {
	const user = useSelector((state) => state.user.value);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const createTask = async (task) => {
		const taskData = { ...task, organization_id: user.org_id };
		try {
			const response = await axios.post('/api/tasks', taskData);
			dispatch(updateTasksData(response.data));
			navigate('/tasks');
		} catch (error) {
			console.error(error);
		}
	};

	return {
		createTask
	};
}
