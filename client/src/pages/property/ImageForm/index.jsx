import './styles.scss';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';

import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import ImageIcon from '@mui/icons-material/Image';
import ClearIcon from '@mui/icons-material/Clear';
import Typography from '@mui/material/Typography';

import { useSelector } from 'react-redux';

import useImageForm from '../hooks/useImageForm';

export default function ImageForm(props) {
	const { onClose, open } = props;

	const { uploadImages } = useImageForm();

	const property = useSelector((state) => state.property.value);
	const [media, setMedia] = useState([]);

	const onDrop = useCallback((acceptedFiles) => {
		if (acceptedFiles[0].type === 'image/jpeg' || acceptedFiles[0].type === 'image/png') {
			setMedia(acceptedFiles);
		}
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	const removeFile = (file) => {
		const currentMedia = [...media];
		const newMedia = currentMedia.filter((image) => image.name !== file.name);
		setMedia(newMedia);
	};

	const onCancel = () => {
		setMedia([]);
		onClose();
	};

	const saveImages = () => {
		const images = {
			images: media,
			organization_id: property?.details?.organization_id,
			seller_id: property?.details?.seller_id
		};
		uploadImages(images, property?.details?.id);
		onCancel();
	};

	return (
		<Dialog onClose={onCancel} open={open} className='image-form'>
			<List sx={{ pt: 0 }} className='image-form__list'>
				{media.map((image, i) => (
					<ListItem button key={`image-${i}`}>
						<ImageIcon />
						<ListItemText primary={image.name} />
						<ClearIcon onClick={() => removeFile(image)} sx={{ cursor: 'pointer' }} />
					</ListItem>
				))}
			</List>
			<div className='image-form__submit'>
				{media?.length < 1 && (
					<>
						<Typography variant='body2' component='span'>
							You can upload images up to 5mb each.
						</Typography>
						<div {...getRootProps()} className='image-form__submit-dropzone'>
							<input {...getInputProps()} />
							{isDragActive ? <FileUploadIcon fontSize='large' /> : <CloudUploadIcon fontSize='large' />}
						</div>
					</>
				)}
				{media?.length >= 1 && (
					<div className='image-form__submit-confirm'>
						<Button variant='contained' sx={{ mr: 1 }} onClick={saveImages}>
							Upload
						</Button>
						<Button variant='contained' onClick={onCancel}>
							Cancel
						</Button>
					</div>
				)}
			</div>
		</Dialog>
	);
}
