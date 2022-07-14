import { useState, useEffect } from 'react';
import { Box, Drawer, Grid, Button, TextField, MenuItem, Input, InputLabel, InputAdornment, FormControl, AvatarGroup, Typography, LinearProgress } from '@mui/material';

import HotelRoundedIcon from '@mui/icons-material/HotelRounded';
import ShowerRoundedIcon from '@mui/icons-material/ShowerRounded';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';

import SelectAgent from '../SelectAgent';
import SearchLocationInput from '../SearchLocationInput';

import usePropertyForm from './hooks/usePropertyForm';
import FormAlert from '../FormAlert';

import { useSelector } from 'react-redux';

const initialForm = {
	title: '',
	status: '',
	address: '',
	zip_code: false,
	service_type: '',
	property_type: '',
	description: '',
	size: false,
	number_of_bedrooms: false,
	number_of_bathrooms: false,
	parking_space: false,
	price: false
};

export default function PropertyForm(props) {
	const { generateDescription, addProperty, updateProperty } = usePropertyForm();
	const { open, onClose, property } = props;

	const app = useSelector((state) => state.app.value);

	const [form, setForm] = useState(initialForm);
	const [alert, setAlert] = useState('');
	const [openAlert, setOpenAlert] = useState(false);
	const [severity, setSeverity] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (property) {
			setForm({ ...property });
		}
	}, [property]);

	const handleClose = () => {
		property ? setForm({ ...property }) : setForm(initialForm);
		onClose();
	};

	const closeAlert = () => {
		setAlert('');
		setOpenAlert(false);
		setSeverity('');
	};

	const selectAgent = (input) => {
		let data = { ...form };
		data.seller_id = input;
		setForm({ ...data });
	};

	const setAddress = (input) => {
		let data = { ...form };
		data.address = input;
		setForm({ ...data });
	};

	const getDescription = async () => {
		let valid = true;

		Object.keys(form).forEach((key) => {
			if (!form[key] && key !== 'description') {
				valid = false;
			}
		});

		if (valid) {
			setLoading(true);
			let data = { ...form };
			const result = await generateDescription(data);
			data.description = result;
			await setForm({ ...data });
			await setAlert('New Description Generated');
			setOpenAlert(true);
			setLoading(false);
			setSeverity('success');
		} else {
			setAlert('Missing Required Field(s)');
			setOpenAlert(true);
			setSeverity('error');
		}
	};

	const createUpdateListing = () => {
		let valid = true;
		Object.keys(form).forEach((key) => {
			if (!form[key]) {
				valid = false;
				setAlert(`${key[0].toUpperCase() + key.split('_').join(' ').substring(1)} is Required`);
				setOpenAlert(true);
				setSeverity('error');
			}
		});

		if (form.description.length > 1000) {
			valid = false;
			setAlert('Description exceeds character limit');
			setOpenAlert(true);
			setSeverity('error');
		}

		if (valid && property) {
			updateProperty({ ...form });
			setAlert('Listing Updated!');
			setOpenAlert(true);
			setSeverity('success');
			handleClose();
		} else if (valid && !property) {
			addProperty({ ...form });
			setAlert('Listing Created!');
			setOpenAlert(true);
			setSeverity('success');
			handleClose();
		}
	};

	return (
		<>
			<Drawer anchor='right' open={open} onClose={onClose} PaperProps={{ sx: { width: '65%' } }}>
				<Box sx={{ padding: 3, minHeight: '95%' }}>
					<Grid container spacing={3}>
						<Grid item md={12} xs={12}>
							<FormControl variant='standard' fullWidth>
								<InputLabel>Title</InputLabel>
								<Input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} id='property-form-title' />
							</FormControl>
						</Grid>
						<Grid item md={12} xs={12}>
							<TextField variant='standard' select label='Status' value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })} size='small' fullWidth margin='normal'>
								{['Open', 'Offer Accepted', 'Deposit Received', 'Completion', 'Closed'].map((type) => (
									<MenuItem key={`property-form-status-menu-${type}`} value={type}>
										{type}
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item md={12} xs={12}>
							<Typography variant='body2' component='span'>
								Assignee:
							</Typography>
							<AvatarGroup spacing={'medium'} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
								{app.agents.map((agent) => (
									<SelectAgent agent={agent} assignAgent={selectAgent} selected={agent.user_id === form.seller_id} />
								))}
							</AvatarGroup>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								variant='standard'
								select
								label='Service'
								value={form.service_type}
								onChange={(event) => setForm({ ...form, service_type: event.target.value })}
								size='small'
								fullWidth
								margin='normal'>
								{['Selling', 'Renting'].map((type) => (
									<MenuItem key={`property-form-service-menu-${type}`} value={type}>
										{type}
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								variant='standard'
								select
								label='Type'
								value={form.property_type}
								onChange={(event) => setForm({ ...form, property_type: event.target.value })}
								size='small'
								fullWidth
								margin='normal'>
								{['House', 'Apartment', 'Townhouse', 'Penthouse', 'Ruko'].map((type) => (
									<MenuItem key={`property-form-type-menu-${type}`} value={type}>
										{type}
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item md={12} xs={12}>
							<SearchLocationInput setAddress={setAddress} form={form} />
						</Grid>
						<Grid item md={6} xs={12} sx={{ mb: 2 }}>
							<FormControl variant='standard' fullWidth>
								<InputLabel>Zip Code</InputLabel>
								<Input type='number' value={form.zip_code} onChange={(event) => setForm({ ...form, zip_code: event.target.value })} margin='normal' />
							</FormControl>
						</Grid>
						<Grid item md={6} xs={12} sx={{ mb: 2 }}>
							<FormControl variant='standard' fullWidth>
								<InputLabel>Size</InputLabel>
								<Input type='number' value={form.size} onChange={(event) => setForm({ ...form, size: event.target.value })} margin='normal' />
							</FormControl>
						</Grid>
						<Grid item md={4} xs={12}>
							<FormControl variant='standard' fullWidth>
								<InputLabel>Bedrooms</InputLabel>
								<Input
									margin='normal'
									type='number'
									value={form.number_of_bedrooms}
									onChange={(event) => setForm({ ...form, number_of_bedrooms: event.target.value })}
									startAdornment={
										<InputAdornment position='start'>
											<HotelRoundedIcon />
										</InputAdornment>
									}
								/>
							</FormControl>
						</Grid>
						<Grid item md={4} xs={12}>
							<FormControl variant='standard' fullWidth>
								<InputLabel>Bathrooms</InputLabel>
								<Input
									margin='normal'
									type='number'
									value={form.number_of_bathrooms}
									onChange={(event) => setForm({ ...form, number_of_bathrooms: event.target.value })}
									startAdornment={
										<InputAdornment position='start'>
											<ShowerRoundedIcon />
										</InputAdornment>
									}
								/>
							</FormControl>
						</Grid>
						<Grid item md={4} xs={12}>
							<FormControl variant='standard' fullWidth>
								<InputLabel>Parking</InputLabel>
								<Input
									margin='normal'
									type='number'
									value={form.parking_space}
									onChange={(event) => setForm({ ...form, parking_space: event.target.value })}
									startAdornment={
										<InputAdornment position='start'>
											<DirectionsCarFilledIcon />
										</InputAdornment>
									}
								/>
							</FormControl>
						</Grid>
						<Grid item md={6} xs={12} sx={{ mt: 2 }}>
							<FormControl variant='standard' fullWidth>
								<InputLabel>Price</InputLabel>
								<Input
									type='number'
									value={form.price}
									onChange={(event) => setForm({ ...form, price: event.target.value })}
									margin='normal'
									startAdornment={<InputAdornment position='start'>Rp</InputAdornment>}
								/>
							</FormControl>
						</Grid>
						<Grid item md={12} xs={12}>
							<TextField
								label={'Description'}
								value={form.description}
								onChange={(event) => setForm({ ...form, description: event.target.value })}
								size='small'
								margin='dense'
								multiline={true}
								rows={5}
								fullWidth
								helperText={1000 - form?.description?.length}
								variant='standard'
							/>
							<Button variant='contained' fullWidth onClick={getDescription}>
								Generate
							</Button>
							{loading && <LinearProgress color='inherit' />}
						</Grid>
						<Grid item md={12} xs={12} sx={{ mb: 2 }}>
							<Button variant='contained' sx={{ mr: 1 }} onClick={createUpdateListing}>
								{property ? 'Update' : 'Create'}
							</Button>
							<Button variant='contained' onClick={handleClose}>
								Cancel
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Drawer>
			<FormAlert open={openAlert} message={alert} onClose={closeAlert} severity={severity} />
		</>
	);
}
