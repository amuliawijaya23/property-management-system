import axios from 'axios';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { setPropertyData } from '../../../state/reducers/propertyReducer';

import { useParams } from 'react-router-dom';

export default function usePropertyData() {
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
}
