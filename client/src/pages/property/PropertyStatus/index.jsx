import { Stepper, Step, StepLabel } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

import usePropertyStatus from '../hooks/usePropertyStatus';

import { useSelector } from 'react-redux';

const inProgress = () => <RadioButtonCheckedIcon sx={{ fontSize: 30 }} />;
const Done = () => <CheckCircleIcon sx={{ fontSize: 30 }} />;
const Blocked = () => <RadioButtonUncheckedIcon sx={{ fontSize: 30 }} />;

export default function PropertyStatus() {
	const { getListingOffer } = usePropertyStatus();
	const property = useSelector((state) => state?.property?.value);
	const steps = (() => {
		switch (property?.details?.service_type) {
			case 'Sale':
				return ['Open', 'Offer Accepted', 'Deposit Received', 'Closing', 'Closed', 'Contract Canceled'];

			case 'Lease':
				return ['Open', 'Offer Accepted', 'Deposit Received', 'Closing', 'Contract Active', 'Contract Canceled'];

			default:
				return [];
		}
	})();

	const onStepSelect = (step) => {
		const status = property?.details?.status;
		const statusIndex = steps?.indexOf(status);
		const index = steps.indexOf(step);

		if (statusIndex >= index) {
			switch (step) {
				case 'Offer Accepted':
					getListingOffer();
					break;
				case 'Deposit Received':
					break;
				case 'Closing':
					break;
				case 'Closed':
					break;
				default:
					break;
			}
		}
	};

	const status = steps.indexOf(property?.details?.status);

	return (
		<>
			<Stepper activeStep={status} alternativeLabel sx={{ mt: 5 }}>
				{steps.slice(0, 5).map((label, i) => {
					const stepStyles = (() => {
						if (i === status && i === 0) {
							return {
								icon: inProgress,
								color: '#4caf50'
							};
						}
						if (i === status) {
							return {
								icon: inProgress,
								color: '#0091ea'
							};
						} else if (i < status) {
							return {
								icon: Done,
								color: '#4caf50'
							};
						} else if (i > status) {
							return {
								icon: Blocked,
								color: '#bdbdbd'
							};
						}
					})();
					const stepProps = {};
					const labelProps = {};
					return (
						<Step sx={{ cursor: 'pointer', color: stepStyles?.color }} key={label} {...stepProps}>
							<StepLabel StepIconComponent={stepStyles?.icon} {...labelProps} onClick={() => onStepSelect(label)}>
								{label}
							</StepLabel>
						</Step>
					);
				})}
			</Stepper>
		</>
	);
}
