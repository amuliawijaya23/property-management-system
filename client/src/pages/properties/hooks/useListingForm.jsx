import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updatePropertiesData } from '../../../state/reducers/app';
import { useNavigate } from 'react-router-dom';

export default function useListingForm() {
	const user = useSelector((state) => state.user.value);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const generateDescription = async (form) => {
		try {
			const data = { ...form };
			const response = await axios.post('/gp/description', data);
			const text = response.data;
			const description = text.replace(/[\r\n]/, '');
			return description;
		} catch (error) {
			console.error(error);
		}
	};

	const addProperty = async (form) => {
		const formData = new FormData();
		formData.append('seller_id', user.sub);
		formData.append('organization_id', user.org_id);

		Object.keys(form).forEach((key) => {
			formData.append(key, form[key]);
		});

		try {
			const response = await axios.post('/api/listings', formData);
			await dispatch(updatePropertiesData(response.data));
			navigate(`/property/${response.data.length}`);
		} catch (error) {
			console.error(error);
		}
	};

	return {
		generateDescription,
		addProperty
	};
}
