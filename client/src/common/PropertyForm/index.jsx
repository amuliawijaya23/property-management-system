import { useState } from 'react';
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
	const { open, onClose, edit } = props;
	const { form, loading, setInput, setValue, setAddress, generateDescription, createUpdateListing, handleCloseReset } = usePropertyForm(edit);
	const app = useSelector((state) => state.app.value);
	const agent = app?.agents?.find((a) => a?.user_id === form?.agent_id);

	const [alert, setAlert] = useState({
		open: false,
		message: '',
		severity: 'error'
	});

	const closeAlert = () => {
		setAlert({
			open: false,
			message: '',
			severity: 'error'
		});
	};

	const handleClose = () => {
		handleCloseReset();
		onClose();
	};

	const getDescripton = async () => {
		let valid = true;
		Object.keys(form).forEach((key) => {
			if (!form[key] && key !== 'description' && key !== 'market_valuation' && key !== 'valuation') {
				valid = false;
				setAlert({
					...alert,
					open: true,
					message: `${key[0].toUpperCase() + key.split('_').join(' ').substring(1)} is Required`
				});
				return;
			}
		});

		if (valid) {
			await generateDescription();
			setAlert({
				open: true,
				message: 'New Description Generated',
				severity: 'success'
			});
		}
	};

	const onSubmit = async () => {
		let valid = true;
		Object.keys(form)
			.slice(0, 12)
			.forEach((key) => {
				if (!form[key]) {
					valid = false;
					setAlert({ ...alert, open: true, message: `${key[0].toUpperCase() + key.split('_').join(' ').substring(1)} is Required` });
				}
			});
		if (form.description.length > 1000) {
			valid = false;
			setAlert({ ...alert, open: true, message: 'Description exceeds character limit' });
			handleClose();
		}
		if (valid) {
			await createUpdateListing();
			edit ? setAlert({ open: true, message: 'Listing Updated', severity: 'success' }) : setAlert({ open: true, message: 'Listing Created', severity: 'success' });
			handleClose();
		}
	};

	return (
		<>
			<Drawer anchor='right' open={open} onClose={handleClose} PaperProps={{ sx: { width: '65%' } }}>
				<Box sx={{ padding: 3, minHeight: '95%' }}>
					<Grid container spacing={3}>
						<Grid item md={12} xs={12}>
							<FormControl variant='standard' fullWidth>
								<InputLabel>Title</InputLabel>
								<Input value={form.title} onChange={(event) => setInput(event, 'title')} id='property-form-title' />
							</FormControl>
						</Grid>
						<Grid item md={12} xs={12}>
							<Autocomplete
								sx={{ mb: 2, mt: 2 }}
								value={agent?.name || ''}
								onChange={(event, newValue) => {
									const agent = app?.agents?.find((a) => a?.name === newValue);
									setValue(agent?.user_id, 'agent_id');
								}}
								options={app?.agents?.map((option) => option?.name)}
								freeSolo
								renderInput={(params) => <TextField {...params} variant='standard' label='Agents' placeholder='Search Agents' />}
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField variant='standard' select label='Service' value={form.service_type} onChange={(event) => setInput(event, 'service_type')} size='small' fullWidth>
								{['Sale', 'Lease'].map((type) => (
									<MenuItem key={`property-form-service-menu-${type}`} value={type}>
										{type}
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField variant='standard' select label='Type' value={form.property_type} onChange={(event) => setInput(event, 'property_type')} size='small' fullWidth>
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
								<Input type='text' value={form.postal_code} onChange={(event) => setInput(event, 'postal_code')} />
							</FormControl>
						</Grid>
						<Grid item md={6} xs={12} sx={{ mb: 2 }}>
							<FormControl variant='standard' fullWidth>
								<InputLabel>Size</InputLabel>
								<Input type='number' value={form.size} onChange={(event) => setInput(event, 'size')} />
							</FormControl>
						</Grid>
						<Grid item md={4} xs={12}>
							<FormControl variant='standard' fullWidth>
								<InputLabel>Bedrooms</InputLabel>
								<Input
									type='number'
									value={form.number_of_bedrooms}
									onChange={(event) => setInput(event, 'number_of_bedrooms')}
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
									onChange={(event) => setInput(event, 'number_of_bathrooms')}
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
									onChange={(event) => setInput(event, 'parking_space')}
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
										setValue(floatValue, 'valuation');
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
										setValue(floatValue, 'market_valuation');
									}}
								/>
							</FormControl>
						</Grid>
						<Grid item md={12} xs={12}>
							<TextField
								label={'Description'}
								value={form.description}
								onChange={(event) => setInput({ ...form, description: event.target.value })}
								size='small'
								multiline={true}
								rows={5}
								fullWidth
								helperText={1000 - form?.description?.length}
								variant='standard'
							/>
							<Button variant='contained' fullWidth onClick={getDescripton}>
								Generate
							</Button>
							{loading && <LinearProgress color='inherit' />}
						</Grid>
						<Grid item md={12} xs={12} sx={{ mb: 2 }}>
							<Button variant='contained' sx={{ mr: 1 }} onClick={onSubmit}>
								{edit ? 'Update' : 'Create'}
							</Button>
							<Button variant='contained' onClick={handleClose}>
								Cancel
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Drawer>
			<FormAlert open={alert?.open} message={alert?.message} severity={alert?.severity} onClose={closeAlert} />
		</>
	);
}
