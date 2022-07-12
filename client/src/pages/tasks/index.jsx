import './styles.scss';
import { useState } from 'react';
import Box from '@mui/material/Box';
import EnhancedTable from '../../common/Table';

import TaskForm from '../../common/TaskForm';

import useTasksData from './hooks/useTasksData';

export default function Tasks() {
	const { resetTasksData, resetTasksRow, updateTasksTableData } = useTasksData();
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	return (
		<Box width={'100%'} mt={2}>
			<EnhancedTable resetData={resetTasksData} resetRow={resetTasksRow} updateTableData={updateTasksTableData} handleOpen={handleOpen} />
			<TaskForm open={open} onClose={handleClose} />
		</Box>
	);
}
