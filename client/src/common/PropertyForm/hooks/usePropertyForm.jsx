import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updatePropertiesData } from '../../../state/reducers/app';
import { setPropertyDetails } from '../../../state/reducers/propertyReducer';
import { useNavigate } from 'react-router-dom';

export default function usePropertyForm() {
	const user = useSelector((state) => state.user.value);
	const app = useSelector((state) => state.app.value);
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
		const listing = {
			...form,
			organization_id: user.org_id
		};

		try {
			const response = await axios.post('/api/listings', listing);
			const properties = [...app.properties];
			properties.push(response.data[0]);
			await dispatch(updatePropertiesData(properties));

			navigate(`/property/${response.data[0].id}`);
		} catch (error) {
			console.error(error);
		}
	};

	const updateProperty = async (form) => {
		try {
			const response = await axios.put(`/api/listing`, form);
			let properties = [...app.properties];
			const index = properties.map((property) => property.id).indexOf(response.data[0].id);
			properties[index] = response.data[0];
			await dispatch(updatePropertiesData(properties));
			await dispatch(setPropertyDetails(response.data[0]));
		} catch (error) {
			console.error(error);
		}
	};

	return {
		generateDescription,
		addProperty,
		updateProperty
	};
}
