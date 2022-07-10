import { useState } from 'react';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import StepContent from '@mui/material/StepContent';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';

import TaskFormInformation from './TaskFormInformation';
import useTaskForm from '../hooks/useTaskForm';

import { useSelector } from 'react-redux';

const steps = ['Enter Task Information', 'Enter Task Tracking'];

export default function TasksForm() {
	const app = useSelector((state) => state.app.value);
	const [form, setForm] = useState({
		summary: '',
		notes: '',
		category: '',
		due_date: new Date(),
		agent_id: '',
		listing_id: false
	});

	const { createTask } = useTaskForm();

	const [activeStep, setActiveStep] = useState(0);

	const handleReset = () => {
		setActiveStep(0);
	};
	const setTextField = (field) => (event) => {
		let data = { ...form };
		data[field] = event.target.value;
		setForm({ ...data });
	};

	const setDueDate = (input) => {
		let data = { ...form };
		data.due_date = input;
		setForm({ ...data });
	};

	const assignAgent = (input) => {
		let data = { ...form };
		data.agent_id = input;
		setForm({ ...data });
	};

	const assignListing = (input) => {
		let data = { ...form };
		data.listing_id = input;
		setForm({ ...data });
	};

	const onSubmit = () => {
		let data = { ...form };
		createTask(data);
	};

	return (
		<Box sx={{ width: '100%', padding: '1rem' }}>
			<Stepper activeStep={activeStep} orientation='vertical' className='task-form'>
				{steps?.map((step, i) => {
					switch (i) {
						case 0:
							return (
								<Step key={`step-${i}`}>
									<StepLabel>{step}</StepLabel>
									<TaskFormInformation setTextField={setTextField} form={form} setActiveStep={setActiveStep} setDueDate={setDueDate} assignAgent={assignAgent} />
								</Step>
							);
						case 1:
							return (
								<Step key={`step-${i}`}>
									<StepLabel>{step}</StepLabel>
									<StepContent></StepContent>
								</Step>
							);
						default:
							return <></>;
					}
				})}
			</Stepper>
			{activeStep === steps.length && (
				<Paper square elevation={0} sx={{ p: 3 }}>
					<Typography>Create New Task?</Typography>
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
