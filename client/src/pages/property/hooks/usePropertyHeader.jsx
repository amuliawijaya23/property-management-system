import axios from 'axios';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePropertiesData } from '../../../state/reducers/app';
import { setPropertyDetails, setPropertyFiles } from '../../../state/reducers/propertyReducer';

const close = {
	watcher: false,
	agent: false,
	watchers: false,
	anchorEl: false,
	offer: false,
	transaction: false
};

export default function usePropertyHeader() {
	const property = useSelector((state) => state.property.value);
	const dispatch = useDispatch();

	const [state, setState] = useState(close);

	const [alert, setAlert] = useState('');
	const [openAlert, setOpenAlert] = useState(false);
	const [severity, setSeverity] = useState('error');

	const closeAlert = () => {
		setOpenAlert(false);
		setSeverity('error');
		setAlert('');
	};

	const handleClose = (input) => {
		setState(close);
	};

	const handleClickOpen = (assign) => (event) => {
		let newState = { ...close };
		newState[assign] = event?.currentTarget;
		setState({ ...newState });
	};

	const open = (assign) => {
		return Boolean(state[assign]);
	};

	const updateStatus = async (input) => {
		const newData = { ...property?.details, status: input };
		const response = await axios.put('/api/properties', newData);
		await dispatch(updatePropertiesData(response.data));
		await dispatch(setPropertyDetails({ ...newData }));
		handleClose();
	};

	const archiveOffer = async () => {
		const offer = property?.files?.find((f) => f?.is_offer && !f?.is_archived);
		if (offer) {
			const archivedOffer = { ...offer, is_archived: true };
			const files = await axios.put('/files/archive', archivedOffer);
			await dispatch(setPropertyFiles(files.data));
		}
	};

	const updateHandler = (e, input) => {
		const statusReq = property?.details?.service_type === 'Sale' ? 'Closed' : 'Active';
		switch (input) {
			case 'Offer Accepted':
				if (property?.files?.find((f) => f?.is_offer && !f?.is_archived)) {
					updateStatus('Offer Accepted');
					setSeverity('success');
					setAlert('Offer Accepted!');
					setOpenAlert(true);
				} else {
					setAlert('Please upload the accepted offer to proceed.');
					setSeverity('error');
					setOpenAlert(true);
					let newState = { ...close };
					newState.offer = e?.currentTarget;
					setState({ ...newState });
				}
				break;

			case 'Deposit Received':
				if (property?.transactions?.find((t) => t?.transaction_type === 'Deposit' && t?.status === statusReq)) {
					updateStatus('Deposit Received');
					setSeverity('success');
					setAlert('Deposit Received!');
					setOpenAlert(true);
				} else {
					setSeverity('error');
					setAlert(`No ${statusReq} Deposit Found! Either create one or update an existing transaction to proceed.`);
					setOpenAlert(true);
					let newState = { ...close };
					newState.transaction = e?.currentTarget;
					setState({ ...newState });
				}
				break;

			case 'Closed':
				if (property?.transactions?.find((t) => t?.transaction_type === property?.details?.service_type && t?.status === 'Closed')) {
					updateStatus('Closed');
					setSeverity('success');
					setAlert('Listing Closed!');
					setOpenAlert(true);
				} else {
					setSeverity('error');
					setAlert(`No ${statusReq} ${property?.details?.service_type} Found! Either create one or update an existing transaction to proceed.`);
					setOpenAlert(true);
					let newState = { ...close };
					newState.transaction = e?.currentTarget;
					setState({ ...newState });
				}
				break;

			case 'Contract Active':
				if (property?.transactions?.find((t) => t?.transaction_type === property?.details?.service_type && t?.status === 'Active')) {
					updateStatus('Contract Active');
					setSeverity('success');
					setAlert('Contract Active!!');
					setOpenAlert(true);
				} else {
					setSeverity('error');
					setAlert(`No ${statusReq} ${property?.details?.service_type} Found! Either create one or update an existing transaction to proceed.`);
					setOpenAlert(true);
					let newState = { ...close };
					newState.transaction = e?.currentTarget;
					setState({ ...newState });
				}
				break;

			case 'Reset to Open':
				archiveOffer();
				updateStatus('Open');
				break;

			default:
				updateStatus(input);
				break;
		}
	};

	const status = property?.details?.status;
	const service = property?.details?.service_type;
	const stepOptions = (() => {
		switch (service) {
			case 'Sale':
				return ['Open', 'Offer Accepted', 'Deposit Received', 'Closing', 'Closed', 'Takedown', 'Under Construction', 'Need Maintenance', 'Reset to Open'];

			case 'Lease':
				return ['Open', 'Offer Accepted', 'Deposit Received', 'Closing', 'Contract Active', 'Contract Canceled', 'Under Construction', 'Need Maintenance', 'Reset to Open'];

			default:
				return [];
		}
	})();

	const step = stepOptions?.indexOf(status) + 1;
	const updateOptions = service === 'Sale' ? stepOptions?.slice(step, step + 1).concat(stepOptions.slice(5)) : stepOptions?.slice(step, step + 1).concat(stepOptions.slice(6));

	return {
		state,
		updateOptions,
		alert,
		setAlert,
		setOpenAlert,
		setSeverity,
		openAlert,
		severity,
		closeAlert,
		open,
		handleClose,
		handleClickOpen,
		updateHandler
	};
}
