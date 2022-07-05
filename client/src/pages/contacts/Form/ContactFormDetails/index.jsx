import { useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import SearchLocationInput from '../../../../common/SearchLocationInput';

export default function ContactFormDetails(props) {
	const [error, setError] = useState('');

	const handleNext = () => {
		props.setActiveStep((prev) => prev + 1);
	};

	const handleBack = () => {
		props.setActiveStep((prev) => prev - 1);
	};

	const numberFields = Object.keys(props.form)
		.slice(4, 7)
		.map((field) => (
			<TextField
				key={`form-${field}`}
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
			<SearchLocationInput error={error} setAddress={props.setAddress} form={props.form} />
			{numberFields}
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
