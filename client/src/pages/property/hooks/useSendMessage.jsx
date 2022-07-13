import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setPropertyData } from '../../../state/reducers/propertyReducer';

export default function useSendMessage() {
	const property = useSelector((state) => state.property.value);
	const dispatch = useDispatch();

	const sendMessage = async (message) => {
		try {
			const response = await axios.post('/message', { ...message });
			dispatch(setPropertyData({ ...property, messages: response.data }));
		} catch (error) {
			console.error(error);
		}
	};

	return {
		sendMessage
	};
}
