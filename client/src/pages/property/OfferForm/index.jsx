import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Grid, Box, Paper, List, ListItem, ListItemAvatar, Avatar, ListItemText, DialogTitle, Dialog, Typography, Button } from '@mui/material';
import { CloudUpload as CloudUploadIcon, FileUpload as FileUploadIcon, Clear as ClearIcon, Image as ImageIcon } from '@mui/icons-material';

import { useSelector } from 'react-redux';

import useOfferForm from '../hooks/useOfferForm';

const fileIcon = (input) => {
	switch (input) {
		case 'xlsx' || 'xls' || 'xlsm':
			return '/fileIcons/xls.png';

		case 'docx' || 'doc' || 'docm':
			return '/fileIcons/doc.png';

		case 'csv':
			return '/fileIcons/csv.png';

		case 'pdf':
			return '/fileIcons/pdf.png';

		case 'ppt' || 'pptx':
			return '/fileIcons/ppt.png';

		case 'zip':
			return '/fileIcons/zip.png';

		case 'txt':
			return '/fileIcons/txt.png';

		default:
			return '/fileIcons/file.png';
	}
};

export default function OfferForm({ onClose, open, setAlert, setOpenAlert, setSeverity }) {
	const { offer, onDrop, removeFile, submitOffer } = useOfferForm();

	const property = useSelector((state) => state.property.value);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	const onCancel = () => {
		removeFile();
		onClose();
	};

	const submitHandler = () => {
		submitOffer();
		setSeverity('success');
		setAlert('Offer Accepted');
		setOpenAlert(true);
		onClose();
	};

	return (
		<Dialog onClose={onCancel} open={open}>
			<Grid container sx={{ width: 400 }}>
				<Grid item xs={12} textAlign='start' sx={{ px: 1, py: 0.5 }}>
					<Typography variant='caption'>{offer ? 'Do you want to use this file as offer?' : 'Browse or drop the offer below.'}</Typography>
				</Grid>
				<Grid item xs={12}>
					<List>
						{offer && (
							<ListItem key={`file-offer`}>
								<ListItemAvatar>
									<Avatar sx={{ py: 0.5, px: 0.5 }} src={fileIcon(offer?.name?.split('.')[offer?.name.split('.')?.length - 1])} title='file' />
								</ListItemAvatar>
								<ListItemText primary={offer.name} />
								<ClearIcon onClick={() => removeFile()} sx={{ cursor: 'pointer' }} />
							</ListItem>
						)}
					</List>
				</Grid>
				<Grid item xs={12}>
					<Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', py: 0.5, px: 1 }}>
						{!offer && (
							<Paper {...getRootProps()} sx={{ border: 'dotted 1px', height: 75, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
								<input {...getInputProps()} />
								{isDragActive ? <FileUploadIcon fontSize='large' /> : <CloudUploadIcon fontSize='large' />}
							</Paper>
						)}
						{offer && (
							<div>
								<Button variant='contained' sx={{ mr: 1 }} onClick={submitHandler}>
									Upload
								</Button>
								<Button variant='contained' onClick={onCancel}>
									Cancel
								</Button>
							</div>
						)}
					</Box>
				</Grid>
			</Grid>
		</Dialog>
	);
}
