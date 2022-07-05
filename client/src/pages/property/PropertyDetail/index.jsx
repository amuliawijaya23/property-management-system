import { useState, useEffect, useMemo, useCallback } from 'react';

import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import PropertyHeader from '../Header';
import ImageForm from '../ImageForm';
import MediaCarousel from './MediaCarousel';
import Collapsable from './Collapsable';
import Status from './Status';
import MessageBox from './MessageBox';

import { useSelector } from 'react-redux';

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
	const property = useSelector((state) => state.property.value);

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
				<CardContent sx={cardContentSx}>
					<Typography width={'100%'} variant='h5' component='div' paddingBottom={2} borderBottom={'solid 1px'}>
						Comments&nbsp;
						{property?.messages?.length > 0 && `(${property?.messages.length})`}
					</Typography>
					<MessageBox />
				</CardContent>
			</Card>
		</Box>
	);
}
