import { useCallback } from 'react';
import Box from '@mui/material/Box';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { useDropzone } from 'react-dropzone';

export default function ListingFormImage(props) {
	const onDrop = useCallback((acceptedFiles) => {
		props.setImage(acceptedFiles[0]);
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	const onRemove = () => {
		props.setImage(null);
	};

	const handleNext = () => {
		if (props.form.thumbnailImage) {
			props.setActiveStep((prev) => prev + 1);
		}
	};

	return (
		<StepContent className='listing-form__image'>
			{props.form.thumbnailImage && (
				<div className='listing-form__image-preview'>
					<HighlightOffIcon className='listing-form__image-remove' onClick={onRemove} />
					<img src={URL.createObjectURL(props.form.thumbnailImage)} alt='thumbnail' />
				</div>
			)}
			{!props.form.thumbnailImage && (
				<div {...getRootProps()} className='listing-form__image-dropzone'>
					<input {...getInputProps()} />
					{isDragActive ? <p>Drop image here...</p> : <p>Drop or click to select image</p>}
				</div>
			)}
			<Box sx={{ mb: 2 }}>
				<div>
					<Button variant='contained' onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
						Next
					</Button>
				</div>
			</Box>
		</StepContent>
	);
}
