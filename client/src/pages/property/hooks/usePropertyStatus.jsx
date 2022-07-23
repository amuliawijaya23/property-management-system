import axios from 'axios';
import { useSelector } from 'react-redux';
export default function usePropertyStatus() {
	const property = useSelector((state) => state.property.value);

	const getListingOffer = async () => {
		try {
			const result = await axios.get(`/files/offer/${property?.details?.id}`);
			return result.data;
		} catch (error) {
			console.error(error.response ? error.response.body : error);
		}
	};

	// const getListingDeposit = async () => {
	// 	try {
	// 		const result = await axios.get(`/api/transactions/deposit/${property?.details?.id}`);
	// 		return result.data;
	// 	} catch (error) {
	// 		console.error(error.response ? error.response.body : error);
	// 	}
	// };

	return {
		getListingOffer
	};
}
