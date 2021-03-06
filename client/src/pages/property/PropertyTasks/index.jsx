import { useState } from 'react';

import { Box, Table, TableBody, TableCell, TableHead, TableRow, Chip, Avatar, Button, Alert } from '@mui/material';
import TaskForm from '../../../common/TaskForm';
import FormAlert from '../../../common/FormAlert';

import { useSelector } from 'react-redux';

import format from 'date-fns/format';

export default function PropertyTasks() {
	const app = useSelector((state) => state.app.value);
	const property = useSelector((state) => state.property.value);

	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState(null);
	const [alert, setAlert] = useState({ open: false, message: '', severity: 'error' });

	const closeAlert = () => {
		setAlert({ open: false, message: '', severity: 'error' });
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setSelected(null);
		setOpen(false);
	};

	const handleSelect = (input) => {
		setSelected(input);
		setOpen(true);
	};

	const rows = property?.tasks?.map((task, i) => {
		const agent = app?.agents?.find((agent) => agent?.user_id === task?.agent_id);
		return {
			id: task?.id,
			agent: agent?.picture,
			category: task?.category,
			summary: task?.summary,
			due_date: task?.due_date,
			status: task?.status
		};
	});

	return (
		<Box width={'100%'} sx={{ overflow: 'auto', minHeight: 300 }}>
			<Button onClick={handleOpen}>Add Task</Button>
			<Table sx={{ minWidth: 650 }} aria-labelledby='dense table'>
				<TableHead>
					<TableRow>
						<TableCell>ID</TableCell>
						<TableCell>Agent</TableCell>
						<TableCell>Category</TableCell>
						<TableCell>Summary</TableCell>
						<TableCell>Due Date</TableCell>
						<TableCell>Status</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, i) => {
						const currentTask = property.tasks.find((task) => task.id === row.id);
						const color = (() => {
							switch (row.status) {
								case 'Active':
									return 'primary';

								case 'Blocked':
									return 'error';

								case 'Closed':
									return 'success';

								case 'Canceled':
									return 'default';

								default:
									return;
							}
						})();

						return (
							<TableRow key={`property-task-${i}`} sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }} hover onClick={() => handleSelect(currentTask)}>
								<TableCell component='th' scope='row'>
									TASK-{row.id}
								</TableCell>
								<TableCell>
									<Avatar src={row.agent} alt='agent' />
								</TableCell>
								<TableCell>{row.category}</TableCell>
								<TableCell>{row.summary}</TableCell>
								<TableCell>{format(new Date(row.due_date), 'PPpp')}</TableCell>
								<TableCell>
									<Chip label={row.status} color={color} />
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
			{rows.length < 1 && (
				<Alert severity='info' sx={{ mt: 2 }}>
					No task found for this listing, click add task to create one.
				</Alert>
			)}
			{open && <TaskForm open={open} onClose={handleClose} listingId={property?.details?.id} task={selected} alert={alert} setAlert={setAlert} setTask={setSelected} />}
			{alert?.open && <FormAlert open={alert?.open} message={alert?.message} severity={alert?.severity} onClose={closeAlert} />}
		</Box>
	);
}
