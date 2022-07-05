import { useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';

export default function ContactFormInformation(props) {
	const [error, setError] = useState('');

	const handleNext = () => {
		let validate = true;
		Object.keys(props.form)
			.slice(0, 3)
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

	const textFields = Object.keys(props.form)
		.slice(0, 3)
		.map((field) => (
			<TextField
				key={`form-${field}`}
				required={error && !props.form[field] ? true : false}
				error={error && !props.form[field] ? true : false}
				helperText={error && !props.form[field] ? 'Required' : ''}
				id={`form-${field}`}
				label={field[0].toUpperCase() + field.split('_').join(' ').substring(1)}
				value={props.form[field]}
				onChange={props.setTextField(field)}
				size='small'
				margin='dense'
				fullWidth
			/>
		));

	return (
		<StepContent className='listing-form__details'>
			{textFields}
			<Box sx={{ mb: 2 }}>
				<div>
					<Button variant='contained' onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
						Next
					</Button>
				</div>
			</Box>
		</StepContent>
	);
}
