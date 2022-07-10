import { useEffect } from 'react';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';

import { setPropertyData, setPropertyImages } from '../../../state/reducers/propertyReducer';

import { setTableData } from '../../../state/reducers/tableReducer';

import { Routes, Route, useNavigate, Link, useParams } from 'react-router-dom';

export default function usePropertyData() {
	const user = useSelector((state) => state.user.value);
	const property = useSelector((state) => state.property.value);
	const dispatch = useDispatch();

	const { id } = useParams();

	useEffect(() => {
		const getPropertyData = async (id) => {
			try {
				const [details, images, messages, watchers, files, tasks] = await Promise.all([
					axios.get(`/api/listing/${id}`),
					axios.get(`/images/listing/${id}`),
					axios.get(`/message/${id}`),
					axios.get(`/api/watchers/${id}`),
					axios.get(`/files/listing/${id}`),
					axios.get(`/api/tasks/listing/${id}`)
				]);

				dispatch(
					setPropertyData({
						details: details.data,
						images: images.data,
						files: files.data,
						messages: messages.data,
						watchers: watchers.data,
						tasks: tasks.data
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

	return {
		sendMessage
	};
}
