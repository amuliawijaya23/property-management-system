import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { setPropertyWatchers } from '../../../state/reducers/propertyReducer';

export default function useAddWatcher() {
	const property = useSelector((state) => state.property.value);
	const dispatch = useDispatch();

	const addWatcher = async (user) => {
		const watcher = {
			user_id: user,
			listing_id: property?.details?.id
		};
		const watchers = await axios.post(`/api/watchers`, watcher);
		await dispatch(setPropertyWatchers(watchers.data));
	};

	return {
		addWatcher
	};
}
