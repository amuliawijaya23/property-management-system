import { useEffect, useState, useMemo } from 'react';
import { Box, Modal, Grid, FormControl, Input, InputLabel, TextField, Autocomplete, Button, Typography, FormHelperText, Divider, Tooltip, Avatar } from '@mui/material';
import SearchLocationInput from '../SearchLocationInput';
import NumberFormat from 'react-number-format';

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

	const initialMode = contact?.id ? false : true;
	const [edit, setEdit] = useState(initialMode);
	const [form, setForm] = useState(initialForm);
	const agent = app?.agents?.find((a) => a?.user_id === form?.agent_id);

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

	const handleClose = () => {
		setForm(initialForm);
		onClose();
	};

	const handleClickEdit = () => {
		edit ? setEdit(false) : setEdit(true);
	};

	const handleCancel = () => {
		contact?.id ? setEdit(false) : handleClose();
	};

	const setAddress = (input) => {
		let data = { ...form };
		data.address = input;
		setForm({ ...data });
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
				{edit && (
					<Grid container spacing={1}>
						<Grid item xs={12} sx={{ mt: 2 }}>
							<Typography variant='body2' component='span'>
								Agent:
							</Typography>
							<Autocomplete
								sx={{ mb: 2, mt: 2 }}
								value={agent?.name || ''}
								onChange={(event, newValue) => {
									const agent = app?.agents?.find((a) => a?.name === newValue);
									let newForm = { ...form };
									newForm.agent_id = agent?.user_id;
									setForm(newForm);
								}}
								options={app?.agents?.filter((agent) => agent?.user_id !== contact?.agent_id).map((option) => option?.name)}
								freeSolo
								renderInput={(params) => <TextField {...params} variant='standard' label='Agents' placeholder='Search Agents' />}
							/>
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
							<FormControl Mobile='standard' fullWidth>
								<InputLabel>Mobile</InputLabel>
								<NumberFormat
									type='text'
									format={'###-###-####'}
									value={form?.mobile}
									customInput={Input}
									variant='standard'
									autoComplete='off'
									onValueChange={(values) => {
										const { floatValue } = values;
										setForm({ ...form, mobile: floatValue });
									}}
								/>
								<FormHelperText>Optional</FormHelperText>
							</FormControl>
						</Grid>
						<Grid item xs={6}>
							<FormControl Mobile='standard' fullWidth>
								<InputLabel>Home</InputLabel>
								<NumberFormat
									type='text'
									format={'###-###-####'}
									value={form?.home}
									customInput={Input}
									variant='standard'
									autoComplete='off'
									onValueChange={(values) => {
										const { floatValue } = values;
										setForm({ ...form, home: floatValue });
									}}
								/>
								<FormHelperText>Optional</FormHelperText>
							</FormControl>
						</Grid>
						<Grid item xs={6}>
							<FormControl Mobile='standard' fullWidth>
								<InputLabel>Office</InputLabel>
								<NumberFormat
									type='text'
									format={'###-###-####'}
									value={form?.office}
									customInput={Input}
									variant='standard'
									autoComplete='off'
									onValueChange={(values) => {
										const { floatValue } = values;
										setForm({ ...form, office: floatValue });
									}}
								/>
								<FormHelperText>Optional</FormHelperText>
							</FormControl>
						</Grid>
						<Grid item xs={12} sx={{ mt: 1 }}>
							<Button variant='contained' sx={{ mr: 1 }} onClick={validate}>
								{contact ? 'Update' : 'Create'}
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
									CON-{contact?.id}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
									<Button onClick={handleClickEdit}>Edit</Button>
								</Box>
							</Grid>
						</Grid>
						<Grid item xs={6}>
							<Typography variant='caption' component='div'>
								First Name: {contact?.first_name}
							</Typography>
						</Grid>
						<Grid item xs={6}>
							<Typography variant='caption' component='div'>
								Last Name: {contact?.last_name}
							</Typography>
						</Grid>
						<Grid item xs={12} sx={{ mb: 1, mt: 1 }}>
							<Typography variant='caption' component='div'>
								Email: {contact?.email}
							</Typography>
						</Grid>
						{contact?.address && (
							<Grid item xs={12} sx={{ mb: 1, mt: 1 }}>
								<Typography variant='caption' component='div'>
									Address: {contact?.address}
								</Typography>
							</Grid>
						)}
						{contact?.mobile && (
							<Grid item xs={6}>
								<Typography variant='caption' component='div'>
									Mobile: <NumberFormat type='text' format={'###-###-####'} value={contact?.mobile} isNumericString displayType='text' />
								</Typography>
							</Grid>
						)}
						{contact?.home && (
							<Grid item xs={6}>
								<Typography variant='caption' component='div'>
									Home: <NumberFormat type='text' format={'###-###-####'} value={contact?.home} isNumericString displayType='text' />
								</Typography>
							</Grid>
						)}
						{contact?.office && (
							<Grid item xs={6}>
								<Typography variant='caption' component='div'>
									Office: <NumberFormat type='text' format={'###-###-####'} value={contact?.office} isNumericString displayType='text' />
								</Typography>
							</Grid>
						)}
						{contact?.agent_id && (
							<Grid item container justifyContent='center' alignItems='center' sx={{ mb: 2 }}>
								<Grid item xs={12} sx={{ mb: 1 }}>
									<Typography variant='caption' component='div'>
										Agent:
									</Typography>
								</Grid>
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
					</Grid>
				)}
			</Box>
		</Modal>
	);
}
