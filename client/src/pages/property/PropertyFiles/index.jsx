import axios from 'axios';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import {
	Popover,
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Grid,
	Paper,
	Box,
	Dialog,
	Button,
	Divider,
	List,
	ListItem,
	ListItemText,
	Typography,
	ListItemAvatar,
	ListItemIcon,
	Alert,
	IconButton,
	Avatar
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
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
	const [download, setDownload] = useState('');
	const [confirm, setConfirm] = useState(null);

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
		setConfirm(null);
		setTimeout(() => {
			setDownload('');
		}, 250);
	};

	const onDownload = async (event, link) => {
		setConfirm(event?.currentTarget);
		const response = await axios.get(`/files/${link}`);
		setDownload(response?.data);
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
						{property?.files?.length < 1 && <Alert severity={'info'}>No files found, browse or drop a file above. </Alert>}
						{property?.files?.map((file, i) => {
							return (
								<ListItem key={`property-task-${i}`} divider={i < property?.files?.length - 1} sx={{ justifyContent: 'space-between', mb: 1 }}>
									<ListItemAvatar>
										<Avatar sx={{ py: 0.5, px: 0.5 }} src={fileIcon(file?.name?.split('.')[file?.name.split('.').length - 1])} alt='file' />
									</ListItemAvatar>
									<ListItemText primary={file?.name} secondary={`Last Updated ${formatDistanceToNowStrict(new Date(file?.updated_at), { addSuffix: true })}`} />
									<ListItemIcon>
										<IconButton onClick={(event) => onDownload(event, file?.id)}>
											<MoreVertIcon />
										</IconButton>
									</ListItemIcon>
								</ListItem>
							);
						})}
					</List>
				</Grid>
			</Grid>
			<Popover
				sx={{ minWidth: 250 }}
				id={'update-status'}
				anchorEl={confirm}
				open={Boolean(confirm)}
				onClose={() => setConfirm(null)}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left'
				}}>
				<List>
					<a href={download} download={true} target={'_blank'} rel={'noreferrer'} onClick={handleClose} style={{ textDecoration: 'none', color: 'black' }}>
						<ListItem button>
							<ListItemIcon>
								<DownloadIcon />
							</ListItemIcon>
							<ListItemText primary='Download' />
						</ListItem>
					</a>
					<ListItem button>
						<ListItemIcon>
							<DeleteIcon />
						</ListItemIcon>
						<ListItemText primary='Delete' />
					</ListItem>
				</List>
			</Popover>
		</Box>
	);
}
