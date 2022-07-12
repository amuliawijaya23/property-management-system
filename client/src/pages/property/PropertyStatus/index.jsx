import { useState } from 'react';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import { useSelector } from 'react-redux';

const steps = ['Open', 'Offer Accepted', 'Deposit Received', 'Completion', 'Closed'];

export default function PropertyStatus() {
	const property = useSelector((state) => state.property.value);
	const status = (() => (property?.details?.status === 'Closed' ? steps.indexOf(property?.details?.status) + 1 : steps.indexOf(property?.details?.status)))();

	const [activeStep, setActiveStep] = useState(status);

	return (
		<Stepper activeStep={status} alternativeLabel sx={{ mt: 5 }}>
			{steps.map((label, index) => {
				const stepProps = {};
				const labelProps = {};
				return (
					<Step key={label} {...stepProps}>
						<StepLabel {...labelProps}>{label}</StepLabel>
					</Step>
				);
			})}
		</Stepper>
	);
}
