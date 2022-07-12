import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FileUploadIcon from '@mui/icons-material/FileUpload';

import useImageForm from '../hooks/useImageForm';

import { useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

export default function PropertyImages(props) {
	const app = useSelector((state) => state.app.value);
	const id = parseInt(useParams().id);
	const property = useSelector((state) => state.property.value);

	const { uploadImages } = useImageForm();

	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const onDrop = useCallback((acceptedFiles) => {
		const images = {
			images: acceptedFiles,
			organization_id: property.details?.organization_id,
			seller_id: property.details?.seller_id
		};
		uploadImages(images, property.details?.id);
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return (
		<Box width={'100%'}>
			<Typography variant='body2' component='span'>
				You can upload images up to 5mb each.
			</Typography>
			<div {...getRootProps()} className='property-item__dropzone'>
				<input {...getInputProps()} />
				{isDragActive ? <FileUploadIcon fontSize='large' /> : <CloudUploadIcon fontSize='large' />}
			</div>
			<ImageList cols={3}>
				{property.images.map((image, i) => (
					<ImageListItem key={`image-item-${i}`}>
						<img src={image.link} alt='property' loading='lazy' />
					</ImageListItem>
				))}
			</ImageList>
		</Box>
	);
}
