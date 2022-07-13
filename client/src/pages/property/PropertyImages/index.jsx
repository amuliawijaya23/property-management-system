import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { Grid, Paper, Box, ImageList, ImageListItem, Typography } from '@mui/material';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FileUploadIcon from '@mui/icons-material/FileUpload';

import useImageForm from '../hooks/useImageForm';

import { useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

const style = {
	display: 'flex',
	width: '100%',
	justifyContent: 'center',
	alignItems: 'center',
	height: '5.5rem',
	border: 'dotted 1px',
	cursor: 'pointer'
};

export default function PropertyImages(props) {
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
			<Grid container spacing={1}>
				<Grid item xs={12}>
					<Typography variant='body2' component='span'>
						You can upload images up to 5mb each.
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Paper {...getRootProps()} sx={style}>
						<input {...getInputProps()} />
						{isDragActive ? <FileUploadIcon fontSize='large' /> : <CloudUploadIcon fontSize='large' />}
					</Paper>
				</Grid>
				<Grid item xs={12}>
					<ImageList cols={3}>
						{property.images.map((image, i) => (
							<ImageListItem key={`image-item-${i}`}>
								<img src={image.link} alt='property' loading='lazy' />
							</ImageListItem>
						))}
					</ImageList>
				</Grid>
			</Grid>
		</Box>
	);
}
