import { useState, useEffect, useMemo } from 'react';
import { Box, Drawer, Grid, Button, TextField, MenuItem, Input, InputLabel, InputAdornment, FormControl, Autocomplete, LinearProgress } from '@mui/material';

import HotelRoundedIcon from '@mui/icons-material/HotelRounded';
import ShowerRoundedIcon from '@mui/icons-material/ShowerRounded';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';

import SearchLocationInput from '../SearchLocationInput';

import usePropertyForm from './hooks/usePropertyForm';
import FormAlert from '../FormAlert';

import NumberFormat from 'react-number-format';

import { useSelector } from 'react-redux';

export default function PropertyForm(props) {
	const { generateDescription, addProperty, updateProperty } = usePropertyForm();
	const { open, onClose, property } = props;
	const user = useSelector((state) => state?.user?.value);
	const app = useSelector((state) => state.app.value);

	const initialForm = useMemo(
		() => ({
			agent_id: user?.sub,
			title: '',
			address: '',
			postal_code: '',
			service_type: 'Sale',
			property_type: '',
			description: '',
			size: false,
			number_of_bedrooms: false,
			number_of_bathrooms: false,
			parking_space: false,
			valuation: false,
			market_valuation: false
		}),
		[user?.sub]
	);

	const [form, setForm] = useState(initialForm);
	const [alert, setAlert] = useState('');
	const [openAlert, setOpenAlert] = useState(false);
	const [severity, setSeverity] = useState('info');
	const [loading, setLoading] = useState(false);

	const agent = app?.agents?.find((a) => a?.user_id === form?.agent_id);

	useEffect(() => {
		if (property) {
			let propertyForm = { ...initialForm };
			Object.keys(propertyForm).forEach((key) => {
				if (property[key]) {
					propertyForm[key] = property[key];
				}
			});

			setForm({ ...propertyForm, id: property?.id, organization_id: property?.organization_id });
		}
	}, [property, initialForm]);

	const handleClose = () => {
		property ? setForm({ ...property }) : setForm(initialForm);
		onClose();
	};

	const closeAlert = () => {
		setAlert('');
		setOpenAlert(false);
		setSeverity('info');
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
							<Autocomplete
								sx={{ mb: 2, mt: 2 }}
								value={agent?.name || ''}
								onChange={(event, newValue) => {
									const agent = app?.agents?.find((a) => a?.name === newValue);
									let newForm = { ...form };
									newForm.agent_id = agent?.user_id;
									setForm(newForm);
								}}
								options={app?.agents?.filter((agent) => agent?.user_id !== property?.agent_id).map((option) => option?.name)}
								freeSolo
								renderInput={(params) => <TextField {...params} variant='standard' label='Agents' placeholder='Search Agents' />}
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField variant='standard' select label='Service' value={form.service_type} onChange={(event) => setForm({ ...form, service_type: event.target.value })} size='small' fullWidth>
								{['Sale', 'Lease'].map((type) => (
									<MenuItem key={`property-form-service-menu-${type}`} value={type}>
										{type}
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField variant='standard' select label='Type' value={form.property_type} onChange={(event) => setForm({ ...form, property_type: event.target.value })} size='small' fullWidth>
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
								<InputLabel>Postal Code</InputLabel>
								<Input type='text' value={form.zip_code} onChange={(event) => setForm({ ...form, postal_code: event.target.value })} />
							</FormControl>
						</Grid>
						<Grid item md={6} xs={12} sx={{ mb: 2 }}>
							<FormControl variant='standard' fullWidth>
								<InputLabel>Size</InputLabel>
								<Input type='number' value={form.size} onChange={(event) => setForm({ ...form, size: event.target.value })} />
							</FormControl>
						</Grid>
						<Grid item md={4} xs={12}>
							<FormControl variant='standard' fullWidth>
								<InputLabel>Bedrooms</InputLabel>
								<Input
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
								<InputLabel>Valuation</InputLabel>
								<NumberFormat
									type='text'
									value={form.valuation}
									customInput={Input}
									variant='standard'
									thousandSeparator=','
									decimalSeparator='.'
									decimalScale={2}
									fixedDecimalScale={true}
									prefix='$ '
									autoComplete='off'
									onValueChange={(values) => {
										const { floatValue } = values;
										setForm({ ...form, valuation: floatValue });
									}}
								/>
							</FormControl>
						</Grid>
						<Grid item md={6} xs={12} sx={{ mt: 2 }}>
							<FormControl variant='standard' fullWidth>
								<InputLabel>Market Valuation</InputLabel>
								<NumberFormat
									type='text'
									value={form.market_valuation}
									customInput={Input}
									variant='standard'
									thousandSeparator={','}
									decimalSeparator={'.'}
									decimalScale={2}
									fixedDecimalScale={true}
									prefix='$ '
									autoComplete='off'
									onValueChange={(values) => {
										const { floatValue } = values;
										setForm({ ...form, market_valuation: floatValue });
									}}
								/>
							</FormControl>
						</Grid>
						<Grid item md={12} xs={12}>
							<TextField
								label={'Description'}
								value={form.description}
								onChange={(event) => setForm({ ...form, description: event.target.value })}
								size='small'
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
