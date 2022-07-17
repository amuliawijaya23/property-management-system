import { useEffect, useState } from 'react';
import { Box, Modal, Grid, FormControl, Input, InputLabel, TextField, MenuItem, AvatarGroup, Button, Typography } from '@mui/material';
import DateTimeSelector from '../DateTimeSelector';
import SelectAgent from '../SelectAgent';

import useTaskForm from './hooks/useTaskForm';

import { useSelector } from 'react-redux';

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

export default function TaskForm(props) {
	const app = useSelector((state) => state.app.value);
	const { open, onClose, listingId, task } = props;

	const { createTask, updateTask } = useTaskForm();

	const initialForm = {
		summary: '',
		notes: '',
		category: '',
		due_date: new Date(),
		agent_id: '',
		listing_id: listingId ? listingId : false,
		status: 'Active'
	};

	const [form, setForm] = useState(initialForm);

	useEffect(() => {
		if (task) {
			setForm({ ...task });
		}
	}, [task]);

	const setDueDate = (input) => {
		let data = { ...form };
		data.due_date = input;
		setForm({ ...data });
	};

	const selectAgent = (input) => {
		let data = { ...form };
		data.agent_id = input;
		setForm({ ...data });
	};

	const handleClose = () => {
		setForm(initialForm);
		onClose();
	};

	const validate = () => {
		let valid = true;

		Object.keys(form).forEach((key) => {
			if (!form[key]) {
				valid = false;
			}
		});

		if (valid && task) {
			updateTask({ ...form });
			handleClose();
		} else if (valid && !task) {
			createTask({ ...form });
			handleClose();
		}
	};

	return (
		<Modal open={open} onClose={handleClose}>
			<Box sx={style}>
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<FormControl variant='standard' fullWidth>
							<InputLabel>Summary</InputLabel>
							<Input value={form.summary} onChange={(event) => setForm({ ...form, summary: event.target.value })} />
						</FormControl>
					</Grid>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<Typography variant='body2' component='span'>
							Assignee:
						</Typography>
						<AvatarGroup spacing={'medium'} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
							{app.agents.map((agent) => (
								<SelectAgent agent={agent} assignAgent={selectAgent} selected={agent.user_id === form.agent_id} />
							))}
						</AvatarGroup>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							disabled={listingId}
							variant='standard'
							select
							label='Listing'
							size='small'
							fullWidth
							margin='normal'
							value={form.listing_id}
							onChange={(event) => setForm({ ...form, listing_id: event.target.value })}>
							{app?.properties?.map((property) => (
								<MenuItem key={`task-form-property-${property.id}`} value={property.id}>
									LIST-{property.id}
								</MenuItem>
							))}
						</TextField>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField variant='standard' select label='Category' size='small' fullWidth margin='normal' value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>
							{['Open House', 'Inspection', 'Call', 'Follow Up', 'Meeting', 'Adhoc'].map((type) => (
								<MenuItem key={`task-form-type-${type}`} value={type}>
									{type}
								</MenuItem>
							))}
						</TextField>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField variant='standard' select label='Status' size='small' fullWidth margin='normal' value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}>
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
							<Input multiline rows={3} value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} />
						</FormControl>
					</Grid>
					<Grid item xs={12} sx={{ mt: 1 }}>
						<Button variant='contained' sx={{ mr: 1 }} onClick={validate}>
							{task ? 'Update' : 'Create'}
						</Button>
						<Button variant='contained' onClick={handleClose}>
							Cancel
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Modal>
	);
}
