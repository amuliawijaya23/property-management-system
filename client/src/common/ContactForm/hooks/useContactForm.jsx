import axios from 'axios';

import { useState, useMemo, useEffect, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { updateContactsData } from '../../../state/reducers/app';

export default function useContactForm(contact) {
	const user = useSelector((state) => state.user.value);
	const dispatch = useDispatch();

	const initialForm = useMemo(
		() => ({
			agent_id: user?.sub,
			first_name: '',
			last_name: '',
			email: '',
			address: '',
			mobile: false,
			home: false,
			office: false
		}),
		[user?.sub]
	);

	const [form, setForm] = useState(initialForm);

	const setEditForm = useCallback(() => {
		let contactForm = { ...initialForm };
		Object.keys(contactForm).forEach((key) => {
			if (contact[key]) {
				contactForm[key] = contact[key];
			}
		});
		setForm({ ...contactForm, id: contact?.id, organization_id: contact?.organization_id });
	}, [contact, initialForm]);

	useEffect(() => {
		if (contact?.id) {
			setEditForm();
		}
	}, [contact?.id, setEditForm]);

	const handleCloseReset = () => {
		setForm(initialForm);
	};

	const setAddress = (input) => {
		let data = { ...form };
		data.address = input;
		setForm({ ...data });
	};

	const setValue = (input, field) => {
		let data = { ...form };
		data[field] = input;
		setForm({ ...data });
	};

	const setInput = (event, field) => {
		let data = { ...form };
		data[field] = event.target.value;
		setForm({ ...data });
	};

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
		form,
		setValue,
		setInput,
		createContact,
		updateContact,
		handleCloseReset,
		setAddress
	};
}
