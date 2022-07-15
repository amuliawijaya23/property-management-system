import axios from 'axios';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { Grid, Paper, Box, Button, Divider, List, ListItem, ListItemText, Typography, ListItemAvatar, Alert } from '@mui/material';

import ArticleIcon from '@mui/icons-material/Article';
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

export default function PropertyFiles() {
	const property = useSelector((state) => state.property.value);
	const [download, setDownload] = useState('');
	const [open, setOpen] = useState(false);

	const dispatch = useDispatch();

	const onDrop = useCallback((acceptedFiles) => {
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
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	const handleClose = () => {
		setOpen(false);
		setTimeout(() => {
			setDownload('');
		}, 500);
	};

	const onDownload = (link) => {
		axios.get(`/files/${link}`).then(async (res) => {
			await setDownload(res.data);
			setOpen(true);
		});
	};

	return (
		<Box sx={{ width: '100%' }}>
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
						{property.files.map((file) => {
							return (
								<>
									<ListItem button sx={{ justifyContent: 'space-between', mb: 1 }} onClick={() => onDownload(file.id)}>
										<ListItemAvatar>
											<ArticleIcon sx={{ mr: 1, fontSize: '2rem' }} />
										</ListItemAvatar>
										<ListItemText primary={file.id.split('__')[1]} secondary={`Last Updated ${formatDistanceToNowStrict(new Date(file.updated_at), { addSuffix: true })}`} />
										<Button variant='contained'>
											<DeleteIcon />
										</Button>
									</ListItem>
									<Divider />
								</>
							);
						})}
					</List>
				</Grid>
			</Grid>
			<Confirm open={open} onClose={handleClose} download={download} />
		</Box>
	);
}
