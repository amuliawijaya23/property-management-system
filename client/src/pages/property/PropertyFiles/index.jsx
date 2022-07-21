import axios from 'axios';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { Card, CardHeader, CardContent, CardActions, Grid, Paper, Box, Dialog, Button, Divider, List, ListItem, ListItemText, Typography, ListItemAvatar, Alert, Avatar } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Confirm from '../Confirm';

import { useSelector, useDispatch } from 'react-redux';
import { setPropertyFiles } from '../../../state/reducers/propertyReducer';

import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';

const style = {
	display: 'flex',
	width: '100%',
	justifyContent: 'center',
	alignItems: 'center',
	height: '5.5rem',
	border: 'dotted 1px',
	cursor: 'pointer'
};

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

export default function PropertyFiles() {
	const property = useSelector((state) => state.property.value);
	const [selected, setSelected] = useState(null);
	const [download, setDownload] = useState('');
	const [open, setOpen] = useState(false);
	const [confirm, setConfirm] = useState(false);

	const dispatch = useDispatch();

	const onDrop = useCallback(
		(acceptedFiles) => {
			acceptedFiles.map(async (file) => {
				const formData = await new FormData();
				formData.append('file', file);
				formData.append('organization_id', property.details?.organization_id);
				formData.append('agent_id', property.details?.agent_id);

				try {
					const response = await axios.post(`/files/listing/${property.details?.id}`, formData);
					dispatch(setPropertyFiles(response.data));
				} catch (error) {
					console.error(error);
				}
			});
		},
		[dispatch, property?.details?.id, property?.details?.agent_id, property?.details?.organization_id]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	const handleClose = () => {
		setOpen(false);
	};

	const fileClick = (input) => {
		setSelected(input);
		setConfirm(true);
	};

	const onDownload = (link) => {
		axios.get(`/files/${link}`).then(async (res) => {
			await setDownload(res.data);
			setOpen(true);
			setConfirm(false);
			setSelected(null);
		});
	};

	return (
		<Box sx={{ width: '100%', minHeight: 300 }}>
			<Grid container spacing={1}>
				<Grid item xs={12}>
					<Typography variant='body2' component='span'>
						You can upload files up to 5mb each.
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Paper sx={style} {...getRootProps()}>
						<input {...getInputProps()} />
						{isDragActive ? <FileUploadIcon fontSize='large' /> : <CloudUploadIcon fontSize='large' />}
					</Paper>
				</Grid>
				<Grid item xs={12}>
					<List sx={{ mt: 2 }}>
						{property.files.length < 1 && <Alert severity={'info'}>No files found, browse or drop a file above. </Alert>}
						{property.files.map((file, i) => {
							return (
								<ListItem key={`property-task-${i}`} divider={i < property?.files?.length - 1} button sx={{ justifyContent: 'space-between', mb: 1 }} onClick={() => fileClick(file)}>
									<ListItemAvatar>
										<Avatar sx={{ py: 0.5, px: 0.5 }} src={fileIcon(file?.name?.split('.')[file?.name.split('.').length - 1])} alt='file' />
									</ListItemAvatar>
									<ListItemText primary={file?.name} secondary={`Last Updated ${formatDistanceToNowStrict(new Date(file?.updated_at), { addSuffix: true })}`} />
								</ListItem>
							);
						})}
					</List>
				</Grid>
			</Grid>
			<Dialog open={confirm} onClose={() => setConfirm(false)}>
				<Card sx={{ width: 400 }}>
					<CardContent>
						<List>
							<ListItem>
								<ListItemAvatar>
									<Avatar sx={{ py: 0.5, px: 0.5 }} src={fileIcon(selected?.name?.split('.')[selected?.name.split('.').length - 1])} alt='file' />
								</ListItemAvatar>
								<ListItemText primary={selected?.name} />
							</ListItem>
						</List>
					</CardContent>
					<CardActions sx={{ display: 'center', justifyContent: 'center' }}>
						<Button sx={{ width: 115 }} variant='contained' onClick={() => onDownload(selected?.id)}>
							Download
							<DownloadIcon />
						</Button>
						<Button sx={{ width: 115 }} variant='contained'>
							Delete
							<DeleteIcon />
						</Button>
					</CardActions>
				</Card>
			</Dialog>
			<Confirm open={open} onClose={handleClose} download={download} />
		</Box>
	);
}
