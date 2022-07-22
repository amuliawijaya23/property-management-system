import { useEffect, useState, useMemo } from 'react';
import { Box, Modal, Grid, FormControl, Input, InputLabel, TextField, MenuItem, Button, Typography, Autocomplete, Tooltip, Avatar } from '@mui/material';
import DateTimeSelector from '../DateTimeSelector';

import useTaskForm from './hooks/useTaskForm';
import { useSelector } from 'react-redux';

import format from 'date-fns/format';
import formatDistanceToNowStrict from 'date-fns/esm/formatDistanceToNowStrict/index.js';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4
};

export default function TaskForm({ open, onClose, listingId, task, alert, setAlert, setTask }) {
	const app = useSelector((state) => state.app.value);

	const { form, setInput, setValue, setDueDate, handleCloseReset, createTask, updateTask } = useTaskForm(task);
	const initialMode = task?.id ? false : true;
	const [edit, setEdit] = useState(initialMode);
	const agent = app?.agents?.find((a) => a?.user_id === form?.agent_id);

	const handleClickEdit = () => {
		edit ? setEdit(false) : setEdit(true);
	};

	const handleClose = () => {
		handleCloseReset();
		onClose();
	};

	const handleCancel = () => {
		task?.id ? setEdit(false) : handleClose();
	};

	const validate = () => {
		let valid = true;

		Object.keys(form)
			.slice(0, 4)
			.forEach((key) => {
				if (!form[key]) {
					valid = false;
					setAlert({ ...alert, open: true, message: `${key[0].toUpperCase() + key.split('_').join(' ').substring(1)} is Required` });
				}
			});

		if (valid && task) {
			updateTask({ ...form });
			setTask({ ...form });
			setAlert({ open: true, message: 'Task Updated!', severity: 'success' });
			handleCancel();
		} else if (valid && !task) {
			createTask({ ...form });
			setAlert({ open: true, message: 'New Task Created!', severity: 'success' });
			setTask({ ...form });
			handleCancel();
		}
	};

	return (
		<Modal open={open} onClose={handleClose}>
			<Box sx={style}>
				{edit && (
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<FormControl variant='standard' fullWidth>
								<InputLabel>Summary</InputLabel>
								<Input value={form.summary} onChange={(event) => setInput(event, 'summary')} />
							</FormControl>
						</Grid>
						<Grid item xs={12} sx={{ mt: 2 }}>
							<Typography variant='body2' component='span'>
								Assignee:
							</Typography>
							<Autocomplete
								sx={{ mb: 2, mt: 2 }}
								value={agent?.name || ''}
								onChange={(event, newValue) => {
									const agent = app?.agents?.find((a) => a?.name === newValue);
									setValue(agent?.user_id, 'agent_id');
								}}
								options={app?.agents?.filter((agent) => agent?.user_id !== task?.agent_id).map((option) => option?.name)}
								freeSolo
								renderInput={(params) => <TextField {...params} variant='standard' label='Agents' placeholder='Search Agents' />}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								disabled={listingId ? true : false}
								variant='standard'
								select
								label='Listing'
								size='small'
								fullWidth
								margin='normal'
								value={form.listing_id}
								onChange={(event) => setInput(event, 'listing_id')}>
								{app?.properties?.map((property) => (
									<MenuItem key={`task-form-property-${property.id}`} value={property.id}>
										LIST-{property.id}
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField variant='standard' select label='Category' size='small' fullWidth margin='normal' value={form.category} onChange={(event) => setInput(event, 'category')}>
								{['Open House', 'Inspection', 'Call', 'Follow Up', 'Meeting', 'Adhoc'].map((type) => (
									<MenuItem key={`task-form-type-${type}`} value={type}>
										{type}
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField variant='standard' select label='Status' size='small' fullWidth margin='normal' value={form.status} onChange={(event) => setInput(event, 'status')}>
								{['Blocked', 'Open', 'Completed', 'Closed', 'Canceled'].map((type) => (
									<MenuItem key={`task-form-type-${type}`} value={type}>
										{type}
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item xs={12} md={6}>
							<DateTimeSelector form={form} setDate={setDueDate} type={'due_date'} />
						</Grid>
						<Grid item xs={12}>
							<FormControl variant='standard' fullWidth>
								<InputLabel>Notes</InputLabel>
								<Input multiline rows={3} value={form.notes} onChange={(event) => setInput(event, 'notes')} />
							</FormControl>
						</Grid>
						<Grid item xs={12} sx={{ mt: 1 }}>
							<Button variant='contained' sx={{ mr: 1 }} onClick={validate}>
								{task ? 'Update' : 'Create'}
							</Button>
							<Button variant='contained' onClick={handleCancel}>
								Cancel
							</Button>
						</Grid>
					</Grid>
				)}
				{!edit && (
					<Grid container spacing={1}>
						<Grid item container justifyContent='center' alignItems='center'>
							<Grid item xs={9}>
								<Typography variant='body1' component='div'>
									TASK-{task?.id} {task?.summary}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
									<Button onClick={handleClickEdit}>Edit</Button>
								</Box>
							</Grid>
							<Grid item xs={12} sx={{ mt: 1 }}>
								<Typography variant='caption' component='div'>
									Status: <b>{task?.status}</b>
								</Typography>
							</Grid>
						</Grid>
						{task?.agent_id && (
							<Grid item container justifyContent='center' alignItems='center' sx={{ mb: 2 }}>
								<Grid item xs={2}>
									<Tooltip title={agent?.name}>
										<Avatar src={agent?.picture} alt='agent' />
									</Tooltip>
								</Grid>
								<Grid item xs={10}>
									<Typography variant='caption' component='div'>
										{agent?.name}
									</Typography>
								</Grid>
							</Grid>
						)}
						{listingId && (
							<Grid item xs={6}>
								<Typography variant='caption' component='div'>
									Listing: <b>LIST-{listingId}</b>
								</Typography>
							</Grid>
						)}
						<Grid item xs={6}>
							<Typography variant='caption' component='div'>
								Category: <b>{task?.category}</b>
							</Typography>
						</Grid>

						{task?.due_date && (
							<Grid item xs={6}>
								<Typography variant='caption' component='div'>
									Due Date: {format(new Date(task?.due_date), 'PP')}
									<br />({formatDistanceToNowStrict(new Date(task?.due_date), { addSuffix: true })})
								</Typography>
							</Grid>
						)}
						<Grid item xs={12} sx={{ mt: 2 }}>
							<Typography variant='caption' component='div'>
								Notes:
							</Typography>
							<Typography variant='caption' component='div'>
								{task?.notes}
							</Typography>
						</Grid>
					</Grid>
				)}
			</Box>
		</Modal>
	);
}
