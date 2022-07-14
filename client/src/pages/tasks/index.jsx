import { useState } from 'react';
import Box from '@mui/material/Box';
import EnhancedTable from '../../common/Table';

import TaskForm from '../../common/TaskForm';

import useTasksData from './hooks/useTasksData';
import { setSelected } from '../../state/reducers/tableReducer';

export default function Tasks() {
	useTasksData();
	const [open, setOpen] = useState(false);
	const [task, setTask] = useState(null);

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = (input) => {
		setTask(input);
		setOpen(true);
	};

	return (
		<Box width={'100%'} mt={2}>
			<EnhancedTable handleOpen={handleOpen} />
			<TaskForm open={open} onClose={handleClose} task={task} />
		</Box>
	);
}
