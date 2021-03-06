import { useDropzone } from 'react-dropzone';
import { Grid, Box, Paper, List, ListItem, ListItemAvatar, Avatar, ListItemText, Dialog, Typography, Button } from '@mui/material';
import { CloudUpload as CloudUploadIcon, FileUpload as FileUploadIcon, Clear as ClearIcon } from '@mui/icons-material';

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
	const fileType = offer?.name?.split('.')[offer?.name.split('.')?.length - 1];

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
			<Grid container justifyContent='center' alignItems='center' sx={{ maxWidth: 400 }}>
				<Grid item xs={12} textAlign='start' sx={{ px: 1, py: 0.5 }}>
					<Typography textAlign='center' variant='body1'>
						{offer ? 'Do you want to use this file as offer?' : 'Browse or drop the offer below.'}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<List>
						{offer && (
							<ListItem key={`file-offer`}>
								<ListItemAvatar>
									<Avatar sx={{ py: 0.5, px: 0.5 }} src={fileIcon(fileType)} title='file' />
								</ListItemAvatar>
								<ListItemText primary={offer.name.length < 15 ? offer?.name : `${offer?.name.slice(0, 15)}..${fileType}`} />
								<ClearIcon onClick={() => removeFile()} sx={{ cursor: 'pointer' }} />
							</ListItem>
						)}
					</List>
				</Grid>
				<Grid item xs={12} sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<Box sx={{ width: '100%', display: 'flex', justifySelf: 'center', alignSelf: 'center', py: 0.5, px: 0.5 }}>
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
