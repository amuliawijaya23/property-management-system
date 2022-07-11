import { useState } from 'react';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import SearchLocationInput from '../../../../common/SearchLocationInput';

export default function ListingFormDetails(props) {
	const [error, setError] = useState('');

	const handleNext = () => {
		let validate = true;
		Object.keys(props.form)
			.slice(3, 12)
			.forEach((key) => {
				if (!props.form[key]) {
					setError(`Missing required field(s)`);
					validate = false;
					return;
				}
			});

		if (validate) {
			props.setActiveStep((prev) => prev + 1);
		}
	};

	const handleBack = () => {
		props.setActiveStep((prev) => prev - 1);
	};

	const numberField = Object.keys(props.form)
		.slice(6, 12)
		.map((field) => (
			<TextField
				key={`form-${field}`}
				required={error && !props.form[field] ? true : false}
				error={error && !props.form[field] ? true : false}
				helperText={error && !props.form[field] ? 'Required' : ''}
				id={`form-${field}`}
				label={field[0].toUpperCase() + field.split('_').join(' ').substring(1)}
				type='number'
				value={props.form[field]}
				onChange={props.setTextField(field)}
				size='small'
				margin='dense'
				InputLabelProps={{
					shrink: true
				}}
				fullWidth
			/>
		));

	return (
		<StepContent className='listing-form__details'>
			<TextField
				required={error && !props.form.service_type ? true : false}
				error={error && !props.form.service_type ? true : false}
				helperText={error && !props.form.service_type ? 'Required' : ''}
				id='form-service-type'
				select
				label='Service Type'
				value={props.form.service_type}
				onChange={props.setTextField('service_type')}
				size='small'
				fullWidth
				margin='normal'>
				{['Renting', 'Selling'].map((option) => (
					<MenuItem key={option} value={option}>
						{option}
					</MenuItem>
				))}
			</TextField>
			<TextField
				required={error && !props.form.property_type ? true : false}
				error={error && !props.form.property_type ? true : false}
				helperText={error && !props.form.property_type ? 'Required' : ''}
				id='form-property-type'
				select
				label='Property Type'
				value={props.form.property_type}
				onChange={props.setTextField('property_type')}
				size='small'
				fullWidth
				margin='normal'>
				{['House', 'Apartment', 'Townhouse', 'Penthouse', 'Ruko'].map((option) => (
					<MenuItem key={option} value={option}>
						{option}
					</MenuItem>
				))}
			</TextField>
			<SearchLocationInput error={error} setAddress={props.setAddress} form={props.form} />
			{numberField}
			<Box sx={{ mb: 2 }}>
				<div>
					<Button variant='contained' onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
						Next
					</Button>
					<Button variant='contained' onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
						Back
					</Button>
				</div>
			</Box>
		</StepContent>
	);
}
