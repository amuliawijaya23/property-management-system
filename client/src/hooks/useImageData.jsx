import { useReducer, useEffect } from "react";

import axios from "axios";

import reducer, { SET_PROPERTY_IMAGES } from '../reducers/image';

export default function useImageData() {

  const [state, dispatch] = useReducer(reducer, {
    images: []
  });

  const uploadImages = (images) => {

    images.images.map((image) => {
      const formData = new FormData();
      formData.append('image', image);

      delete images.images;
      Object.keys(images).forEach((key) => {
        formData.append(key, images[key]);
      });
      return axios.post('app/images/listing', formData)
        .then((response) => {
          dispatch({
            type: SET_PROPERTY_IMAGES,
            value: {
              images: [...response.data]
            }
          });
        })
        .catch(e => console.error(e));
    });
  };

  return {
    state,
    uploadImages
  };
}

  
