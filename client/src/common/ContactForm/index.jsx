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

export default function ContactForm({ open, onClose, contact, alert, setAlert, setContact }) {
	const app = useSelector((state) => state.app.value);

	const { form, setInput, setValue, setAddress, handleCloseReset, createContact, updateContact } = useContactForm(contact);
	const initialMode = contact?.id ? false : true;
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
		contact?.id ? setEdit(false) : handleClose();
	};

	const validate = () => {
		let valid = true;

		Object.keys(form)
			.slice(0, 3)
			.forEach((key) => {
				if (!form[key]) {
					valid = false;
					setAlert({ ...alert, open: true, message: `${key[0].toUpperCase() + key.split('_').join(' ').substring(1)} is Required` });
				}
			});

		if (valid && contact) {
			updateContact({ ...form });
			setContact({ ...form });
			setAlert({ open: true, message: `Contact CON-${contact?.id} Updated!`, severity: 'success' });
			handleCancel();
		} else if (valid && !contact) {
			createContact({ ...form });
			setContact({ ...form });
			setAlert({ open: true, message: `New Contact Created!`, severity: 'success' });
			handleCancel();
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
									setValue(agent?.user_id, 'agent_id');
								}}
								options={app?.agents?.filter((agent) => agent?.user_id !== contact?.agent_id).map((option) => option?.name)}
								freeSolo
								renderInput={(params) => <TextField {...params} variant='standard' label='Agents' placeholder='Search Agents' />}
							/>
						</Grid>
						<Grid item xs={6}>
							<FormControl variant='standard' fullWidth>
								<InputLabel>First Name</InputLabel>
								<Input value={form.first_name} onChange={(event) => setInput(event, 'first_name')} />
							</FormControl>
						</Grid>
						<Grid item xs={6}>
							<FormControl variant='standard' fullWidth>
								<InputLabel>Last Name</InputLabel>
								<Input value={form.last_name} onChange={(event) => setInput(event, 'last_name')} />
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<FormControl variant='standard' fullWidth>
								<InputLabel>Email</InputLabel>
								<Input value={form.email} onChange={(event) => setInput(event, 'email')} />
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
								<NumberFormat
									type='text'
									format={'###-###-####'}
									value={form?.mobile}
									customInput={Input}
									variant='standard'
									autoComplete='off'
									onValueChange={(values) => {
										const { floatValue } = values;
										setValue(floatValue, 'mobile');
									}}
								/>
								<FormHelperText>Optional</FormHelperText>
							</FormControl>
						</Grid>
						<Grid item xs={6}>
							<FormControl variant='standard' fullWidth>
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
										setValue(floatValue, 'home');
									}}
								/>
								<FormHelperText>Optional</FormHelperText>
							</FormControl>
						</Grid>
						<Grid item xs={6}>
							<FormControl variant='standard' fullWidth>
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
										setValue(floatValue, 'office');
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
