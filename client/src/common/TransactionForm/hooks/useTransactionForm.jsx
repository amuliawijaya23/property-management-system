import axios from 'axios';
import { useState, useMemo, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTransactionsData } from '../../../state/reducers/app';
import { setPropertyTransactions } from '../../../state/reducers/propertyReducer';

export default function useTransactionsForm(transaction) {
	const user = useSelector((state) => state.user.value);
	const property = useSelector((state) => state.property.value);
	const listingId = property?.details?.id;
	const dispatch = useDispatch();

	const [form, setForm] = useState({});

	const initialForm = useMemo(
		() => ({
			agent_id: user?.sub,
			transaction_type: '',
			start_date: new Date(),
			end_date: null,
			notes: '',
			status: 'Pending',
			transaction_value: false,
			listing_id: listingId ? listingId : '',
			market_value: false || null
		}),
		[listingId, user?.sub]
	);

	const setEditForm = useCallback(() => {
		let transactionForm = { ...initialForm };
		Object.keys(transactionForm).forEach((key) => {
			if (transaction[key]) {
				transactionForm[key] = transaction[key];
			}
		});
		setForm({ ...transactionForm, id: transaction?.id, organization_id: transaction?.organization_id });
	}, [transaction, initialForm]);

	useEffect(() => {
		if (transaction?.id) {
			setEditForm();
		} else {
			setForm(initialForm);
		}
	}, [setEditForm, initialForm, transaction]);

	const handleCloseReset = () => {
		setForm(initialForm);
	};

	const setStartDate = (input) => {
		let data = { ...form };
		data.start_date = input;
		setForm({ ...data });
	};

	const setEndDate = (input) => {
		let data = { ...form };
		data.end_date = input;
		setForm({ ...data });
	};

	const setInput = (event, field) => {
		let data = { ...form };
		data[field] = event.target.value;
		setForm({ ...data });
	};

	const setValue = (input, field) => {
		let data = { ...form };
		data[field] = input;
		setForm({ ...data });
	};

	const createTransaction = async (transaction) => {
		const transactionData = { ...transaction, organization_id: user.org_id };
		try {
			const response = await axios.post('/api/transactions', transactionData);
			dispatch(updateTransactionsData(response.data));

			if (property?.details?.id) {
				const response = await axios.get(`/api/transactions/listing/${property.details.id}`);
				dispatch(setPropertyTransactions(response.data));
			}
		} catch (error) {
			console.error(error);
		}
	};

	const updateTransaction = async (transaction) => {
		const transactionData = { ...transaction, organization_id: user.org_id };
		try {
			const response = await axios.put('/api/transactions', transactionData);
			dispatch(updateTransactionsData(response.data));

			if (property?.details?.id) {
				const response = await axios.get(`/api/transactions/listing/${property.details.id}`);
				dispatch(setPropertyTransactions(response.data));
			}
		} catch (error) {
			console.error(error);
		}
	};

	return {
		form,
		createTransaction,
		updateTransaction,
		setInput,
		setValue,
		setStartDate,
		setEndDate,
		handleCloseReset
	};
}
