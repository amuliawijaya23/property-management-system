import { useEffect, useState, useMemo } from 'react';
import { Box, Modal, Grid, FormControl, Input, InputLabel, AvatarGroup, Button, Typography, FormHelperText, Divider } from '@mui/material';
import SelectAgent from '../SelectAgent';
import SearchLocationInput from '../SearchLocationInput';

import { useSelector } from 'react-redux';

import useContactForm from './hooks/useContactForm';

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

export default function ContactForm(props) {
	const user = useSelector((state) => state?.user?.value);
	const app = useSelector((state) => state.app.value);
	const { open, onClose, contact } = props;

	const { createContact, updateContact } = useContactForm();

	const initialForm = useMemo(
		() => ({
			agent_id: user?.sub,
			first_name: '',
			last_name: '',
			email: '',
			address: '',
			mobile: false,
			home: false,
			office: false
		}),
		[user?.sub]
	);

	const [form, setForm] = useState(initialForm);

	useEffect(() => {
		if (contact) {
			let contactForm = { ...initialForm };
			Object.keys(contactForm).forEach((key) => {
				if (contact[key]) {
					contactForm[key] = contact[key];
				}
			});

			setForm({ ...contactForm, id: contact?.id, organization_id: contact?.organization_id });
		}
	}, [contact, initialForm]);

	const selectAgent = (input) => {
		let data = { ...form };
		data.agent_id = input;
		setForm({ ...data });
	};

	const setAddress = (input) => {
		let data = { ...form };
		data.address = input;
		setForm({ ...data });
	};

	const handleClose = () => {
		setForm(initialForm);
		onClose();
	};

	const validate = () => {
		let valid = true;

		Object.keys(form)
			.slice(0, 3)
			.forEach((key) => {
				if (!form[key]) {
					valid = false;
				}
			});

		if (valid && contact) {
			updateContact({ ...form });
			handleClose();
		} else if (valid && !contact) {
			createContact({ ...form });
			handleClose();
		}
	};

	return (
		<Modal open={open} onClose={handleClose}>
			<Box sx={style}>
				<Grid container spacing={1}>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<Typography variant='body2' component='span'>
							Agent:
						</Typography>
						<AvatarGroup spacing={'medium'} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
							{app.agents.map((agent, i) => (
								<SelectAgent key={`select-agent-contact-${i}`} agent={agent} assignAgent={selectAgent} selected={agent.user_id === form.agent_id} />
							))}
						</AvatarGroup>
					</Grid>
					<Grid item xs={6}>
						<FormControl variant='standard' fullWidth>
							<InputLabel>First Name</InputLabel>
							<Input value={form.first_name} onChange={(event) => setForm({ ...form, first_name: event.target.value })} />
						</FormControl>
					</Grid>
					<Grid item xs={6}>
						<FormControl variant='standard' fullWidth>
							<InputLabel>Last Name</InputLabel>
							<Input value={form.last_name} onChange={(event) => setForm({ ...form, last_name: event.target.value })} />
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<FormControl variant='standard' fullWidth>
							<InputLabel>Email</InputLabel>
							<Input value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
						</FormControl>
					</Grid>
					<Grid item xs={12} sx={{ mt: 3 }}>
						<Typography variant='body2' component='div' sx={{ mb: 1 }}>
							Optional
						</Typography>
						<Divider />
					</Grid>
					<Grid item xs={12} sx={{ mt: -3 }}>
						<SearchLocationInput setAddress={setAddress} form={form} />
					</Grid>
					<Grid item xs={12}>
						<FormControl variant='standard' fullWidth>
							<InputLabel>Mobile</InputLabel>
							<Input value={form.mobile} onChange={(event) => setForm({ ...form, mobile: event.target.value })} type='number' />
							<FormHelperText>Optional</FormHelperText>
						</FormControl>
					</Grid>
					<Grid item xs={6}>
						<FormControl variant='standard' fullWidth>
							<InputLabel>Home</InputLabel>
							<Input value={form.home} onChange={(event) => setForm({ ...form, home: event.target.value })} type='number' />
							<FormHelperText>Optional</FormHelperText>
						</FormControl>
					</Grid>
					<Grid item xs={6}>
						<FormControl variant='standard' fullWidth>
							<InputLabel>Office</InputLabel>
							<Input value={form.office} onChange={(event) => setForm({ ...form, office: event.target.value })} type='number' />
							<FormHelperText>Optional</FormHelperText>
						</FormControl>
					</Grid>
					<Grid item xs={12} sx={{ mt: 1 }}>
						<Button variant='contained' sx={{ mr: 1 }} onClick={validate}>
							{contact ? 'Update' : 'Create'}
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
