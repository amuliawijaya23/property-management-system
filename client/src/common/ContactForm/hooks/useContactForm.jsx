import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { updateContactsData } from '../../../state/reducers/app';

export default function useContactForm() {
	const user = useSelector((state) => state.user.value);
	const dispatch = useDispatch();

	const createContact = async (contact) => {
		try {
			let data = { organization_id: user.org_id };

			Object.keys(contact).forEach((key) => {
				if (contact[key]) {
					data[key] = contact[key];
				}
			});

			const response = await axios.post('/api/contacts', data);
			dispatch(updateContactsData(response.data));
		} catch (error) {
			error.response ? console.error(error.response.body) : console.error(error);
		}
	};

	const updateContact = async (contact) => {
		let data = { organization_id: user.org_id };

		Object.keys(contact).forEach((key) => {
			if (contact[key]) {
				data[key] = contact[key];
			}
		});

		try {
			const response = await axios.put('/api/contacts', data);
			dispatch(updateContactsData(response.data));
		} catch (error) {
			error.response ? console.error(error.response.body) : console.error(error);
		}
	};

	return {
		createContact,
		updateContact
	};
}
