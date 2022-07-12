import { useState, useEffect, useCallback } from 'react';
import { Box, Drawer, Grid, Button, TextField, MenuItem, Input, InputLabel, InputAdornment, FormControl, Tooltip, Avatar, Typography, Paper } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import HotelRoundedIcon from '@mui/icons-material/HotelRounded';
import ShowerRoundedIcon from '@mui/icons-material/ShowerRounded';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';

export default function PropertyUpdate(props) {
	const { open, onClose } = props;

	const app = useSelector((state) => state.app.value);
	const property = useSelector((state) => state.property.value);
	const seller = app.agents?.find((agent) => agent.user_id === property.details?.seller_id);

	const [propertyForm, setPropertyForm] = useState({});
	// const options = app.agents.filter((agent) => !watchers.includes(agent.user_id) && agent.user_id !== property.details.seller_id);

	const setImage = (input) => {
		let data = { ...propertyForm };
		data.thumbnailImage = input;
		setPropertyForm({ ...data });
	};

	const onDrop = useCallback((acceptedFiles) => {
		setImage(acceptedFiles[0]);
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	const onRemove = () => {
		setImage(null);
	};

	useEffect(() => {
		setPropertyForm({
			title: property?.details?.title,
			address: property?.details?.address,
			service_type: property?.details?.service_type,
			property_type: property?.details?.property_type,
			description: property?.details.description,
			number_of_bedrooms: property?.details?.number_of_bedrooms,
			number_of_bathrooms: property?.details?.number_of_bathrooms,
			parking_space: property?.details?.parking_space,
			status: property?.details?.status
		});
	}, [property]);

	return (
		<Drawer anchor='right' open={open} onClose={onClose} PaperProps={{ sx: { width: '65%' } }}>
			<Box sx={{ padding: 3, minHeight: '95%' }}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						{propertyForm.thumbnailImage && (
							<Paper>
								<HighlightOffIcon className='listing-form__image-remove' onClick={onRemove} />
								<img src={URL.createObjectURL(propertyForm.thumbnailImage)} alt='thumbnail' />
							</Paper>
						)}
						{!propertyForm.thumbnailImage && (
							<Paper {...getRootProps()} sx={{ border: 'dotted 1px' }}>
								<input {...getInputProps()} />
								{isDragActive ? <FileUploadIcon sx={{ fontSize: '3rem' }} /> : <CloudUploadIcon sx={{ fontSize: '3rem' }} />}
							</Paper>
						)}
					</Grid>
					<Grid item md={12} xs={12}>
						<FormControl variant='standard' fullWidth>
							<Input
								value={propertyForm.title}
								onChange={(event) => setPropertyForm({ ...propertyForm, title: event.target.value })}
								id='property-form-title'
								startAdornment={<InputAdornment position='start'>LIST-{property.details.id}</InputAdornment>}
							/>
						</FormControl>
					</Grid>
					<Grid item md={12} xs={12}>
						<TextField
							variant='standard'
							select
							label='Status'
							value={propertyForm.status}
							onChange={(event) => setPropertyForm({ ...propertyForm, status: event.target.value })}
							size='small'
							fullWidth
							margin='normal'>
							{['Open', 'Offer Accepted', 'Deposit Received', 'Completion', 'Closed'].map((type) => (
								<MenuItem key={`property-form-status-menu-${type}`} value={type}>
									{type}
								</MenuItem>
							))}
						</TextField>
					</Grid>
					<Grid item md={12} xs={12}>
						<Typography variant='h7' component='div'>
							Assignee:
						</Typography>
						<Tooltip title={seller?.name}>
							<Avatar src={seller?.picture} alt='seller' sx={{ mt: 1 }} />
						</Tooltip>
					</Grid>
					<Grid item md={6} xs={12}>
						<TextField
							variant='standard'
							select
							label='Service'
							value={propertyForm.service_type}
							onChange={(event) => setPropertyForm({ ...propertyForm, service_type: event.target.value })}
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
							value={propertyForm.property_type}
							onChange={(event) => setPropertyForm({ ...propertyForm, property_type: event.target.value })}
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
					<Grid item md={4} xs={12}>
						<FormControl variant='standard' fullWidth>
							<Input
								type='number'
								value={propertyForm.number_of_bedrooms}
								onChange={(event) => setPropertyForm({ ...propertyForm, number_of_bedrooms: event.target.value })}
								id='property-form-bedrooms'
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
							<Input
								type='number'
								value={propertyForm.number_of_bathrooms}
								onChange={(event) => setPropertyForm({ ...propertyForm, number_of_bathrooms: event.target.value })}
								id='property-form-bathrooms'
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
							<Input
								type='number'
								value={propertyForm.parking_space}
								onChange={(event) => setPropertyForm({ ...propertyForm, parking_space: event.target.value })}
								id='property-form-parking'
								startAdornment={
									<InputAdornment position='start'>
										<DirectionsCarFilledIcon />
									</InputAdornment>
								}
							/>
						</FormControl>
					</Grid>
					<Grid item md={12} xs={12}>
						<FormControl variant='standard' fullWidth>
							<InputLabel>Address</InputLabel>
							<Input value={propertyForm.address} id='property-form-address' />
						</FormControl>
					</Grid>
					<Grid item md={12} xs={12}>
						<TextField
							label={'Description'}
							value={propertyForm.description}
							onChange={(event) => setPropertyForm({ ...propertyForm, description: event.target.value })}
							size='small'
							margin='dense'
							multiline={true}
							rows={5}
							fullWidth
							variant='standard'
						/>
					</Grid>
					<Grid item md={12} xs={12}>
						<Button variant='contained' sx={{ mr: 1 }}>
							Update
						</Button>
						<Button variant='contained'>Cancel</Button>
					</Grid>
				</Grid>
			</Box>
		</Drawer>
	);
}
