import axios from "axios";


export default function useCommunicationsData() {


  const getColdEmail = async(type) => {
    try {
      const response = await axios.post('/gp/email', {service: type});
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  return {
    getColdEmail
  };
}