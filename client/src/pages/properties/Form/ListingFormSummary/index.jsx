import Box from '@mui/material/Box';
import { useState } from 'react';

import TextField from '@mui/material/TextField';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';

export default function ListingFormSummary(props) {
	const [error, setError] = useState('');

	const handleNext = () => {
		let validate = true;
		Object.keys(props.form)
			.slice(1, 3)
			.forEach((key) => {
				if (!props.form[key]) {
					setError('Missing required field(s)');
					validate = false;
				}
			});

		if (validate) {
			props.setActiveStep((prev) => prev + 1);
		}
	};

	const handleBack = () => {
		props.setActiveStep((prev) => prev - 1);
	};

	const stringField = Object.keys(props.form)
		.slice(1, 3)
		.map((field) => (
			<TextField
				key={`form-${field}`}
				required={error && !props.form[field] ? true : false}
				error={error && !props.form[field] ? true : false}
				helperText={error && !props.form[field] ? 'Required' : field === 'description' ? 1000 - props.form[field].length : ''}
				label={field[0].toUpperCase() + field.substring(1)}
				id={`form-${field}`}
				value={props.form[field]}
				onChange={props.setTextField(field)}
				size='small'
				margin='dense'
				multiline={field === 'description'}
				rows={7}
				fullWidth
			/>
		));

	return (
		<StepContent className='listing-form__summary'>
			{stringField}
			<Box sx={{ mb: 2 }}>
				<div>
					<Button onClick={() => props.getRandomDesc()} variant='contained' sx={{ mt: 1, mr: 1 }}>
						Generate Description
					</Button>
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
