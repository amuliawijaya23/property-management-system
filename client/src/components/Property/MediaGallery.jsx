import '../Form/styles.scss';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ImageIcon from '@mui/icons-material/Image';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ClearIcon from '@mui/icons-material/Clear';

import { useSelector } from 'react-redux';

import { useParams, useNavigate, Link } from 'react-router-dom';

import usePropertyData from '../../hooks/usePropertyData';

export default function MediaGallery(props) {
	const property = useSelector((state) => state.property.value);
	const { uploadImages } = usePropertyData();
	const [media, setMedia] = useState([]);

	const onDrop = useCallback((acceptedFiles) => {
		if (
			acceptedFiles[0].type === 'image/jpeg' ||
			acceptedFiles[0].type === 'image/png'
		) {
			setMedia(acceptedFiles);
		}
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	const saveHandler = () => {
		const images = {
			images: media,
			organization_id: property?.details?.organization_id,
			seller_id: property?.details?.seller_id
		};
		uploadImages(images, property?.details?.id);
		setMedia([]);
	};

	const removeFile = (file) => {
		const currentMedia = [...media];
		const newMedia = currentMedia.filter((image) => image.name !== file.name);
		setMedia(newMedia);
	};

	const selectedImages = media.map((image, i) => {
		if (media[0]) {
			return (
				<ImageListItem key={`imageList-${i}`}>
					<img
						src={URL.createObjectURL(image)}
						srcSet={URL.createObjectURL(image)}
						alt={`preview-${i}`}
					/>
				</ImageListItem>
			);
		}
		return <></>;
	});

	const currentImages = property?.images?.map((image, i) => {
		if (property?.images[0]) {
			return (
				<ImageListItem key={`currentImage-${i}`}>
					<label htmlFor='img'></label>
					<img src={image.link} srcSet={image.link} alt={`preview-${i}`} />
				</ImageListItem>
			);
		}
		return <></>;
	});

	return (
		<Box className='image-form'>
			<div className='image-form__manager'>
				<div className='image-form__manager-actions'>
					<Typography variant='h6' component='div'>
						Media Gallery
					</Typography>
					<div>
						{media.length > 0 && (
							<Button variant='text' onClick={saveHandler}>
								Save
							</Button>
						)}
					</div>
				</div>
				<div className='image-form__manager-gallery'>
					<ImageList
						className='image-form__manager-gallery--images'
						sx={{ width: '100%' }}
						cols={4}>
						<ImageListItem>
							<img
								src={property?.details?.cover_image_url}
								srcSet={property?.details?.cover_image_url}
								alt={`cover`}
							/>
						</ImageListItem>
						{property?.images?.length > 0 && currentImages}
						{media?.length > 0 && selectedImages}
					</ImageList>
				</div>
				<Typography
					variant='body2'
					component={'span'}
					alignSelf={'start'}
					ml={2}>
					You can upload JPEG or PNG files of up to 5 mb each.
				</Typography>
				{media?.length < 1 && (
					<div {...getRootProps()} className='image-form__manager-dropzone'>
						<input {...getInputProps()} />
						{isDragActive ? (
							<FileUploadIcon fontSize='large' />
						) : (
							<CloudUploadIcon fontSize='large' />
						)}
					</div>
				)}
				{media?.length > 0 && (
					<div className='image-form__manager-list'>
						{media.map((image, i) => (
							<div key={`file-${i}`} className='image-form__manager-file'>
								<div className='image-form__manager-file--name'>
									<ImageIcon />
									{image.name}
								</div>
								<ClearIcon
									onClick={() => removeFile(image)}
									sx={{ cursor: 'pointer' }}
								/>
							</div>
						))}
					</div>
				)}
			</div>
		</Box>
	);
}
