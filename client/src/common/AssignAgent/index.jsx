import { useState } from 'react';
import { Box, Modal, TextField, Button, Autocomplete } from '@mui/material';
import { useSelector } from 'react-redux';
import usePropertyForm from '../PropertyForm/hooks/usePropertyForm';

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

export default function AssignAgent(props) {
	const app = useSelector((state) => state.app.value);
	const property = useSelector((state) => state.property.value);
	const { updateProperty } = usePropertyForm();

	const { open, onClose } = props;
	const [value, setValue] = useState('');

	const handleClose = () => {
		setValue('');
		onClose();
	};

	const validate = () => {
		if (value) {
			const selectedAgent = app.agents.find((user) => user.name === value);
			const newData = { ...property?.details, agent_id: selectedAgent.user_id };
			updateProperty(newData);
		}
		handleClose();
	};

	return (
		<Modal open={open} onClose={handleClose}>
			<Box sx={style}>
				<Autocomplete
					sx={{ mb: 2, mt: 2 }}
					value={value}
					onChange={(event, newValue) => setValue(newValue)}
					options={app?.agents?.filter((agent) => agent?.user_id !== property?.details?.agent_id).map((option) => option?.name)}
					freeSolo
					renderInput={(params) => <TextField {...params} variant='standard' label='Agents' placeholder='Search Agents' />}
				/>
				<Button variant='contained' sx={{ mr: 1 }} onClick={validate} disabled={value?.length < 1}>
					Confirm
				</Button>
				<Button variant='contained' onClick={handleClose}>
					Cancel
				</Button>
			</Box>
		</Modal>
	);
}
