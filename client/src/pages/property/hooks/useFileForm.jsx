import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setPropertyFiles } from '../../../state/reducers/propertyReducer';

export const useFileForm = () => {
	const property = useSelector((State) => State.property.value);
	const dispatch = useDispatch();

	const uploadFiles = (files) => {
		files.map(async (file) => {
			const formData = await new FormData();
			formData.append('file', file);
			formData.append('organization_id', property.details?.organization_id);
			formData.append('agent_id', property.details?.agent_id);

			try {
				const response = await axios.post(`/files/listing/${property.details?.id}`, formData);
				dispatch(setPropertyFiles(response.data));
			} catch (error) {
				console.error(error);
			}
		});
	};

	const getDownloadLink = async (link) => {
		const response = await axios.get(`/files/${link}`);
		return response.data;
	};

	return {
		uploadFiles,
		getDownloadLink
	};
};
