import './styles.scss';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import ListingFormImage from './ListingFormImage';
import ListingFormDetails from './ListingFormDetails';
import ListingFormSummary from './ListingFormSummary';

import useListingForm from '../hooks/useListingForm';
const steps = ['Select a Cover Image', 'Enter Listing Details', 'Summarize Listing'];

export default function ListingForm() {
	const { generateDescription, addProperty } = useListingForm();
	const [form, setForm] = useState({
		thumbnailImage: null,
		title: '',
		description: '',
		address: '',
		service_type: '',
		property_type: '',
		zip_code: false,
		size: false,
		number_of_bedrooms: false,
		number_of_bathrooms: false,
		parking_space: false,
		price: false
	});

	const [activeStep, setActiveStep] = useState(0);

	const handleReset = () => {
		setActiveStep(0);
	};

	const setImage = (file) => {
		let data = { ...form };
		data.thumbnailImage = file;
		setForm({ ...data });
	};

	const setTextField = (field, newValue) => (event) => {
		let data = { ...form };
		data[field] = newValue ? newValue : event.target.value;
		setForm({ ...data });
	};

	const getRandomDesc = async () => {
		let data = { ...form };
		const result = await generateDescription(data);
		data.description = result;
		setForm({ ...data });
	};

	const setAddress = (input) => {
		let data = { ...form };
		data.address = input;
		setForm({ ...data });
	};

	return (
		<Box sx={{ width: '100%', padding: '1rem' }}>
			<Stepper activeStep={activeStep} orientation='vertical' className='listing-form'>
				{steps?.map((step, i) => {
					switch (i) {
						case 0:
							return (
								<Step key={`step-${i}`}>
									<StepLabel>{step}</StepLabel>
									<ListingFormImage setActiveStep={setActiveStep} form={form} setImage={setImage} />
								</Step>
							);
						case 1:
							return (
								<Step key={`step-${i}`}>
									<StepLabel>{step}</StepLabel>
									<ListingFormDetails setActiveStep={setActiveStep} form={form} setTextField={setTextField} setAddress={setAddress} />
								</Step>
							);
						case 2:
							return (
								<Step key={`step-${i}`}>
									<StepLabel>{step}</StepLabel>
									<ListingFormSummary setActiveStep={setActiveStep} form={form} setTextField={setTextField} getRandomDesc={getRandomDesc} />
								</Step>
							);
						default:
							return <></>;
					}
				})}
			</Stepper>
			{activeStep === steps.length && (
				<Paper square elevation={0} sx={{ p: 3 }}>
					<Typography>Create New Listing?</Typography>
					<Button onClick={() => addProperty({ ...form })} sx={{ mt: 1, mr: 1 }} variant='contained'>
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
