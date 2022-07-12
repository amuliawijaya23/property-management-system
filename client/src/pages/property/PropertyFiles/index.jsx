import axios from 'axios';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Confirm from '../Confirm';

import { useSelector, useDispatch } from 'react-redux';
import { setPropertyFiles } from '../../../state/reducers/propertyReducer';
import { ListItemAvatar } from '@mui/material';

import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';

export default function PropertyFiles() {
	const property = useSelector((state) => state.property.value);
	const [download, setDownload] = useState('');
	const [files, setFiles] = useState([]);
	const [open, setOpen] = useState(false);

	const dispatch = useDispatch();

	const onDrop = useCallback((acceptedFiles) => {
		acceptedFiles.map(async (file) => {
			const formData = await new FormData();
			formData.append('file', file);
			formData.append('organization_id', property.details?.organization_id);
			formData.append('agent_id', property.details?.seller_id);

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

	const removeFile = (selected) => {
		const currentFiles = [...files];
		const newFiles = currentFiles.filter((file) => file.name !== selected.name);
		setFiles(newFiles);
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Typography variant='body2' component='span'>
				You can upload files up to 5mb each.
			</Typography>
			<div {...getRootProps()} className='property-item__dropzone'>
				<input {...getInputProps()} />
				{isDragActive ? <FileUploadIcon fontSize='large' /> : <CloudUploadIcon fontSize='large' />}
			</div>
			<List sx={{ mt: 2 }}>
				{property.files.map((file) => {
					return (
						<>
							<ListItem button sx={{ justifyContent: 'space-between', mb: 1 }} onClick={() => onDownload(file.id)}>
								<ListItemAvatar>
									<ArticleIcon sx={{ mr: 1, fontSize: '2rem' }} />
								</ListItemAvatar>
								<ListItemText primary={file.id.split('__')[1]} secondary={`Last Updated ${formatDistanceToNowStrict(new Date(file.updated_at), { addSuffix: true })}`} />
								{/* <Button variant='contained' sx={{ mr: 1 }}>
									<DownloadIcon onClick={() => onDownload(file.id)} />
								</Button> */}
								{/* <Button variant='contained'>
									<DeleteIcon />
								</Button> */}
							</ListItem>
							<Divider />
						</>
					);
				})}
			</List>
			<Confirm open={open} onClose={handleClose} download={download} />
		</Box>
	);
}
