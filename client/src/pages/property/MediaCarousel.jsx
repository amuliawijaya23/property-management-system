import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import Box from '@mui/material/Box';
import ImagePanel from './ImagePanel';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FileUploadIcon from '@mui/icons-material/FileUpload';

import useImageForm from '../hooks/useImageForm';

import { useSelector } from 'react-redux';

import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { height } from '@mui/system';

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

	// const currentImages = [{ link: property?.details?.cover_image_url }];
	// const imagePanel = [...currentImages, ...property?.images].map((image, i) => <ImagePanel key={`image-${i}`} value={value} index={i} link={image.link} />);

	// const imageTabs = property.images.map((image, i) => (
	// 	<Tab
	// 		key={`thumbnail-${i}`}
	// 		className='property-item__media'
	// 		sx={{ m: 0 }}
	// 		aria-controls={`full-width-tabpanel-${i}`}
	// 		id={`full-width-tab-${i}`}
	// 		label={<img src={image.link} alt='property-gallery' />}
	// 	/>
	// ));

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
				<ImageListItem>
					<img src={property?.details?.cover_image_url} alt='cover' />
				</ImageListItem>
				{property.images.map((image, i) => (
					<ImageListItem key={`image-item-${i}`}>
						<img src={image.link} alt='property' loading='lazy' />
					</ImageListItem>
				))}
			</ImageList>
		</Box>
	);
}
