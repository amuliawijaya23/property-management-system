import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { setPropertyWatchers } from '../../../state/reducers/propertyReducer';

export default function useRemoveWatcher() {
	const dispatch = useDispatch();

	const removeWatcher = async (watcher) => {
		const watchers = await axios.put(`/api/watchers/remove`, watcher);
		await dispatch(setPropertyWatchers(watchers.data));
	};

	return {
		removeWatcher
	};
}
