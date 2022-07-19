import { useState } from 'react';
import { Box, Modal, TextField, Chip, Button, Autocomplete } from '@mui/material';
import { useSelector } from 'react-redux';

import useAddWatcher from './hooks/useAddWatcher';

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

export default function AddWatcher(props) {
	const { addWatcher } = useAddWatcher();
	const app = useSelector((state) => state.app.value);
	const property = useSelector((state) => state.property.value);
	const watchers = property.watchers.map((watcher) => watcher.user_id);
	const options = app.agents.filter((agent) => !watchers.includes(agent.user_id) && agent.user_id !== property?.details?.agent_id);

	const { open, onClose } = props;
	const [value, setValue] = useState([]);

	const handleClose = () => {
		setValue([]);
		onClose();
	};

	const validate = () => {
		value.forEach((agent) => {
			const selectedAgent = app.agents.find((user) => user.name === agent);
			addWatcher(selectedAgent.user_id);
		});
		handleClose();
	};

	return (
		<Modal open={open} onClose={handleClose}>
			<Box sx={style}>
				<Autocomplete
					sx={{ mb: 2, mt: 2 }}
					value={value}
					onChange={(event, newValue) => setValue(newValue)}
					multiple
					id='tags-filled'
					options={options.map((option) => option.name)}
					freeSolo
					renderTags={(value, getTagProps) => value.map((option, index) => <Chip variant='outlined' label={option} {...getTagProps({ index })} />)}
					renderInput={(params) => <TextField {...params} variant='standard' label='Agents' placeholder='Search Agents' />}
				/>
				<Button variant='contained' sx={{ mr: 1 }} onClick={validate} disabled={value.length < 1}>
					Confirm
				</Button>
				<Button variant='contained' onClick={handleClose}>
					Cancel
				</Button>
			</Box>
		</Modal>
	);
}
