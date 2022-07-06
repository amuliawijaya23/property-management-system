import { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';

import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';

import Button from '@mui/material/Button';

import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import PropertyHeader from '../Header';
import ImageForm from '../ImageForm';
import MediaCarousel from './MediaCarousel';
import Collapsable from './Collapsable';
import Status from './Status';
import MessageBox from './MessageBox';
import PropertyFiles from './PropertyFiles';

import { useSelector } from 'react-redux';

import useVisualMode from '../../../hooks/useVisualMode';
import { COMMENTS, FILES, TASKS } from '../../../helpers/modes';

const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest
	})
}));

const cardContentSx = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	mt: 5
};

export default function PropertyDetail() {
	const { mode, transition } = useVisualMode(COMMENTS);
	const property = useSelector((state) => state.property.value);

	const [download, setDownload] = useState('');

	const [expanded, setExpanded] = useState(false);
	const [uploadImage, setUploadImage] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const handleClose = () => {
		setUploadImage(false);
	};

	const handleOpen = () => {
		setUploadImage(true);
	};

	return (
		<Box className='property-item'>
			<Card sx={{ width: '95%', border: 'solid 1px' }}>
				<PropertyHeader />
				<MediaCarousel onOpen={handleOpen} />
				<ImageForm open={uploadImage} onClose={handleClose} />
				<div className='property-item__header'>
					<CardHeader title={property.details?.title} subheader={property.details?.address} />
					<ExpandMore className='property-item__expandable' expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label='show more' sx={{ mr: '0.5rem' }}>
						<ExpandMoreIcon sx={{ fontSize: '2rem' }} />
					</ExpandMore>
				</div>
				<Collapsable expanded={expanded} />
				<Status />
				<CardActions sx={{ mt: 5, borderBottom: 'solid 1px' }}>
					<Button onClick={() => transition(COMMENTS)}>Comments</Button>
					<Button onClick={() => transition(FILES)}>Files</Button>
					<Button>Tasks</Button>
				</CardActions>
				<CardContent sx={cardContentSx}>
					{mode === COMMENTS && <MessageBox />}
					{mode === FILES && <PropertyFiles />}
					{mode === TASKS && <></>}
				</CardContent>
			</Card>
		</Box>
	);
}
