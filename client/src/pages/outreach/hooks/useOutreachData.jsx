import axios from 'axios';

export default function useOutreachData() {
	const generateColdEmail = async (type) => {
		try {
			const response = await axios.post('/gp/email', { service: type });
			return response.data;
		} catch (error) {
			console.error(error);
		}
	};

	const sendColdEmail = async (email) => {
		try {
			const response = await axios.post('/sg/send', email);
			return response.data;
		} catch (error) {
			console.error(error);
		}
	};

	return {
		generateColdEmail,
		sendColdEmail
	};
}
