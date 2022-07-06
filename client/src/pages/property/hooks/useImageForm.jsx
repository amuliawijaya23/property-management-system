import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setPropertyData, setPropertyImages } from '../../../state/reducers/propertyReducer';

export default function useImageForm(props) {
	const property = useSelector((state) => state.property.value);

	const dispatch = useDispatch();

	const uploadImages = (images, id) => {
		images.images.map(async (image) => {
			const formData = new FormData();
			formData.append('image', image);
			delete images.images;
			Object.keys(images).forEach((key) => {
				formData.append(key, images[key]);
			});
			try {
				const response = await axios.post(`/images/listing/${id}`, formData);
				dispatch(setPropertyData({ ...property, images: response.data }));
			} catch (error) {
				console.error(error);
			}
		});
	};

	return {
		uploadImages
	};
}
