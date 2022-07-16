import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { updateTransactionsData } from '../../../state/reducers/app';
import { setPropertyTransactions } from '../../../state/reducers/propertyReducer';
import { useNavigate } from 'react-router-dom';

export default function useTransactionsForm() {
	const app = useSelector((state) => state.app.value);
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
			let transactions = [...app.transactions];
			const transactionIndex = transactions.map((transaction) => transaction.id).indexOf(response.data[0].id);
			let propTrans = [...property.transactions];
			const propTransIndex = propTrans.map((transaction) => transaction.id).indexOf(response.data[0].id);

			transactions[transactionIndex] = response.data[0];
			propTrans[propTransIndex] = response.data[0];
			dispatch(updateTransactionsData(transactions));
			dispatch(setPropertyTransactions(propTrans));
		} catch (error) {
			console.error(error);
		}
	};

	return {
		createTransaction,
		updateTransaction
	};
}
