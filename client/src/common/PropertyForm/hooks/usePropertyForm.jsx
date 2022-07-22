import axios from 'axios';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePropertiesData } from '../../../state/reducers/app';
import { setPropertyDetails } from '../../../state/reducers/propertyReducer';
import { useNavigate } from 'react-router-dom';

export default function usePropertyForm(edit) {
	const user = useSelector((state) => state.user.value);
	const property = useSelector((state) => state.property.value);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState({});

	const initialForm = useMemo(
		() => ({
			agent_id: user?.sub,
			title: '',
			address: '',
			postal_code: '',
			service_type: '',
			property_type: '',
			description: '',
			size: false,
			number_of_bedrooms: false,
			number_of_bathrooms: false,
			parking_space: false,
			valuation: false,
			market_valuation: false,
			organization_id: user?.org_id
		}),
		[user?.sub, user?.org_id]
	);

	const setEditForm = useCallback(() => {
		let propertyForm = { ...initialForm };
		Object.keys(propertyForm).forEach((key) => {
			if (property?.details[key]) {
				propertyForm[key] = property?.details[key];
			}
		});
		setForm({ ...propertyForm, id: property?.details?.id, organization_id: property?.details?.organization_id });
	}, [initialForm, property?.details]);

	useEffect(() => {
		if (edit) {
			setEditForm();
		} else {
			setForm(initialForm);
		}
	}, [setEditForm, initialForm, edit]);

	const handleCloseReset = () => {
		property?.details?.id ? setForm({ ...property?.details }) : setForm(initialForm);
	};

	const setAddress = (input) => {
		let data = { ...form };
		data.address = input;
		setForm({ ...data });
	};

	const setValue = (input, value) => {
		let data = { ...form };
		data[value] = input;
		setForm({ ...data });
	};

	const setInput = (event, field) => {
		let data = { ...form };
		data[field] = event?.target?.value;
		setForm({ ...data });
	};

	const generateDescription = async () => {
		setLoading(true);
		try {
			let listing = { ...form };
			const { data } = await axios.post('/gp/description', listing);
			const text = data;
			const description = text.replace(/[\r\n]/, '');
			listing.description = description;
			await setForm({ ...listing });
			setLoading(false);
		} catch (error) {
			console.error(error);
		}
	};

	const createUpdateListing = async () => {
		const listing = { ...form, organization_id: user.org_id };
		if (property?.details?.id) {
			try {
				const response = await axios.put(`/api/properties`, listing);
				await dispatch(updatePropertiesData(response.data));
				await dispatch(setPropertyDetails({ ...form }));
			} catch (error) {
				console.error(error);
			}
		} else {
			try {
				const response = await axios.post('/api/listings', listing);
				await dispatch(updatePropertiesData(response.data));
				await dispatch(setPropertyDetails({ ...form }));
				navigate(`/property/${response.data[0].id}`);
			} catch (error) {
				console.error(error);
			}
		}
	};

	return {
		form,
		loading,
		setInput,
		setValue,
		setAddress,
		generateDescription,
		createUpdateListing,
		handleCloseReset
	};
}
