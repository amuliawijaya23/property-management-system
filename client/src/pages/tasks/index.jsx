import { useState } from 'react';
import Box from '@mui/material/Box';
import EnhancedTable from '../../common/Table';
import FormAlert from '../../common/FormAlert';

import TaskForm from '../../common/TaskForm';

import useTasksData from './hooks/useTasksData';

export default function Tasks() {
	useTasksData();
	const [open, setOpen] = useState(false);
	const [task, setTask] = useState(null);
	const [alert, setAlert] = useState({ open: false, message: '', severity: 'error' });

	const closeAlert = () => {
		setAlert({ open: false, message: '', severity: 'error' });
	};

	const handleClose = () => {
		setTask(null);
		setOpen(false);
	};

	const handleOpen = (input) => {
		setTask(input);
		setOpen(true);
	};

	return (
		<Box width={'100%'} mt={10} mb={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<EnhancedTable handleOpen={handleOpen} defaultOrder='desc' defaultOrderBy='due_date' />
			{open && <TaskForm open={open} onClose={handleClose} task={task} alert={alert} setAlert={setAlert} setTask={setTask} />}
			{alert?.open && <FormAlert open={alert?.open} message={alert?.message} severity={alert?.severity} onClose={closeAlert} />}
		</Box>
	);
}
