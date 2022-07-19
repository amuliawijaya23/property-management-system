import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { updateTransactionsData } from '../../../state/reducers/app';
import { setPropertyTransactions } from '../../../state/reducers/propertyReducer';

export default function useTransactionsForm() {
	const user = useSelector((state) => state.user.value);
	const property = useSelector((state) => state.property.value);
	const dispatch = useDispatch();

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
		createTransaction,
		updateTransaction
	};
}
