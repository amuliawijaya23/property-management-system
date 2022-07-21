import axios from 'axios';
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePropertiesData } from '../../../state/reducers/app';
import { setPropertyDetails, setPropertyFiles } from '../../../state/reducers/propertyReducer';

export default function useOfferForm() {
	const property = useSelector((state) => state.property.value);
	const dispatch = useDispatch();
	const [offer, setOffer] = useState(null);

	const onDrop = useCallback((acceptedFiles) => {
		if (acceptedFiles[0].type !== 'image/jpeg' && acceptedFiles[0].type !== 'image/png') {
			setOffer(acceptedFiles[0]);
		}
	}, []);

	const removeFile = () => {
		setOffer(null);
	};

	const submitOffer = async (id) => {
		const formData = new FormData();
		formData.append('file', offer);
		formData.append('organization_id', property?.details?.organization_id);
		formData.append('is_offer', true);
		formData.append('agent_id', property.details?.agent_id);
		try {
			const [file, propertyData] = await Promise.all([
				axios.post(`/files/listing/${property?.details?.id}`, formData),
				axios.put(`/api/properties`, { ...property?.details, status: 'Offer Accepted' })
			]);
			await dispatch(setPropertyFiles(file.data));
			await dispatch(updatePropertiesData(propertyData.data));
			await dispatch(setPropertyDetails({ ...property?.details, status: 'Offer Accepted' }));
		} catch (error) {
			console.error(error);
		}
	};

	return {
		offer,
		setOffer,
		onDrop,
		submitOffer,
		removeFile
	};
}
