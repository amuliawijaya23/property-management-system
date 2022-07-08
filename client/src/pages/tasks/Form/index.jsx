import { useState } from 'react';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import DateTimeSelector from './DateTimeSelector';

const steps = ['Enter Task Information', 'Enter Task Tracking'];

export default function TasksForm() {
	const [form, setForm] = useState({
		summary: '',
		notes: '',
		category: '',
		due_date: ''
	});

	const [activeStep, setActiveStep] = useState(0);

	const handleReset = () => {
		setActiveStep(0);
	};

	const setTextField = (field) => (event) => {
		let data = { ...form };
		data[field] = event.target.value;
		setForm({ ...data });
	};

	const setAddress = (input) => {
		let data = { ...form };
		data.address = input;
		setForm({ ...data });
	};

	return (
		<Box sx={{ width: '100%', padding: '1rem' }}>
			<Stepper activeStep={activeStep} orientation='vertical' className='contact-form'>
				{steps?.map((step, i) => {
					switch (i) {
						case 0:
							return (
								<Step key={`step-${i}`}>
									<StepLabel>{step}</StepLabel>
									<DateTimeSelector setTextField={setTextField} form={form} setActiveStep={setActiveStep} />
								</Step>
							);
						case 1:
							return (
								<Step key={`step-${i}`}>
									<StepLabel>{step}</StepLabel>
									<></>
								</Step>
							);
						default:
							return <></>;
					}
				})}
			</Stepper>
			{activeStep === steps.length && (
				<Paper square elevation={0} sx={{ p: 3 }}>
					<Typography>Create New Contact?</Typography>
					<Button sx={{ mt: 1, mr: 1 }} variant='contained'>
						Submit
					</Button>
					<Button onClick={handleReset} sx={{ mt: 1, mr: 1 }} variant='contained'>
						Reset
					</Button>
				</Paper>
			)}
		</Box>
	);
}
