import { useState } from 'react';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { updateContactsData, updatePropertiesData, updateTasksData, updateTransactionsData } from '../../../state/reducers/app';
let cancelToken;

export default function useTableSearch() {
	const [search, setSearch] = useState('');
	const table = useSelector((state) => state.table.value);
	const dispatch = useDispatch();
	const dispatchMethod = (data) => {
		switch (table?.type) {
			case 'properties':
				dispatch(updatePropertiesData(data));
				break;

			case 'tasks':
				dispatch(updateTasksData(data));
				break;

			case 'transactions':
				dispatch(updateTransactionsData(data));
				break;

			case 'contacts':
				dispatch(updateContactsData(data));
				break;

			default:
				break;
		}
	};

	const searchData = async (input) => {
		const type = table?.type;
		if (typeof cancelToken !== typeof undefined) {
			cancelToken.cancel('Canceling previous search request');
		}

		cancelToken = axios.CancelToken.source();
		const reqData = { search: input };
		const { data } = await axios.post(`/api/${type}/search`, { ...reqData, cancelToken: cancelToken.token });
		await dispatchMethod(data);
	};

	return {
		search,
		setSearch,
		searchData
	};
}
