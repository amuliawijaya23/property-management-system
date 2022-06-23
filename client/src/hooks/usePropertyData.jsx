import axios from "axios";

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setPropertyData } from "../state/reducers/propertyReducer";

export default function usePropertyData() {
  const dispatch = useDispatch();
  const property = useSelector((state) => state.property.value);
  
  const selectProperty = async(newProperty) => {
    try {
      const response = await Promise.all([
        axios.get(`app/images/listing/${newProperty.id}`),
        axios.get(`app/message/${newProperty.id}`)
      ]);
      const [images, messages] = response;
      dispatch(setPropertyData({
        details: newProperty,
        images: images.data,
        messages: messages.data
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const sendMessage  = async(message) => {
    try {
      const response = await axios.post('app/message', {...message});
      dispatch(setPropertyData({...property, messages: response.data}))
    } catch (error) {
      console.error(error);
    }
  };

  const uploadImages = (images) => {
    images.images.map(async(image) => {
      const formData = new FormData();
      formData.append('image', image);
      delete images.images;
      Object.keys(images).forEach((key) => {
        formData.append(key, images[key]);
      });
      try {
        const response = await axios.post('app/images/listing', formData);
        dispatch((setPropertyData({...property, images: response.data})));
      } catch (error) {
        console.error(error);
      };
    });
  };

  return {
    selectProperty,
    sendMessage,
    uploadImages
  };
}