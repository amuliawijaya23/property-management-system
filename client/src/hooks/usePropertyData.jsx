import { useEffect } from 'react';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';

import {
	setPropertyData,
	setPropertyImages
} from '../state/reducers/propertyReducer';
import { updatePropertiesData } from '../state/reducers/app';
import { setTableData } from '../state/reducers/tableReducer';

import { Routes, Route, useNavigate, Link, useParams } from 'react-router-dom';

export default function usePropertyData() {
	const user = useSelector((state) => state.user.value);
	const property = useSelector((state) => state.property.value);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { id } = useParams();

	useEffect(() => {
		const getPropertyData = async (id) => {
			try {
				const [details, images, messages, watchers] = await Promise.all([
					axios.get(`/api/listing/${id}`),
					axios.get(`/images/listing/${id}`),
					axios.get(`/message/${id}`),
					axios.get(`/api/watchers/${id}`)
				]);

				dispatch(
					setPropertyData({
						details: details.data,
						images: images.data,
						messages: messages.data,
						watchers: watchers.data
					})
				);
			} catch (error) {
				console.error(error);
			}
		};

		if (id) {
			getPropertyData(parseInt(id));
		}
	}, [id, dispatch]);

	const sendMessage = async (message) => {
		try {
			const response = await axios.post('/message', { ...message });
			dispatch(setPropertyData({ ...property, messages: response.data }));
		} catch (error) {
			console.error(error);
		}
	};

	const uploadImages = (images, id) => {
		images.images.map(async (image) => {
			const formData = new FormData();
			formData.append('image', image);
			delete images.images;
			Object.keys(images).forEach((key) => {
				formData.append(key, images[key]);
			});
			try {
				const response = await axios.post(`/images/listing/${id}`, formData);
				dispatch(setPropertyData({ ...property, images: response.data }));
			} catch (error) {
				console.error(error);
			}
		});
	};

	const getPropertyDescription = async (listing) => {
		try {
			const response = await axios.post('/gp/description', listing);

			return response.data;
		} catch (error) {
			console.error(error);
		}
	};

	const addProperty = async (listing) => {
		const formData = new FormData();
		formData.append('seller_id', user.sub);
		formData.append('organization_id', user.org_id);

		Object.keys(listing).forEach((key) => {
			formData.append(key, listing[key]);
		});

		try {
			const response = await axios.post('/api/listings', formData);
			dispatch(updatePropertiesData(response.data));
			// dispatch(setTableData(response.data));
			navigate(`/property/${response.data.length}`);
		} catch (error) {
			console.error(error);
		}
	};

	return {
		sendMessage,
		getPropertyDescription,
		uploadImages,
		addProperty
	};
}
