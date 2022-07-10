import { useState } from 'react';

import { Card, CardActions, CardContent, CardHeader, Divider, IconButton, Button } from '@mui/material';
import styled from '@mui/material/styles/styled';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import PropertyHeader from '../Header';
import MediaCarousel from './MediaCarousel';
import Collapsable from './Collapsable';
import Status from './Status';
import MessageBox from './MessageBox';
import PropertyFiles from './PropertyFiles';
import PropertyTasks from '../PropertyTasks';

import { useSelector } from 'react-redux';

import useVisualMode from '../../../hooks/useVisualMode';
import { COMMENTS, FILES, TASKS, MEDIA } from '../../../helpers/modes';

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

	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card sx={{ width: '85%', mt: 2, mb: 2 }}>
			<PropertyHeader />
			<Divider />
			<div className='property-item__header'>
				<CardHeader title={`LIST-${property?.details?.id} ${property.details?.title}`} subheader={property.details?.address} />
				<ExpandMore className='property-item__expandable' expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label='show more' sx={{ mr: '0.5rem' }}>
					<ExpandMoreIcon sx={{ fontSize: '2rem' }} />
				</ExpandMore>
			</div>
			<Collapsable expanded={expanded} />
			<Status />
			<CardActions sx={{ mt: 5 }}>
				<Button onClick={() => transition(COMMENTS)}>Comments</Button>
				<Button onClick={() => transition(TASKS)}>Tasks</Button>
				<Button onClick={() => transition(FILES)}>Files</Button>
				<Button onClick={() => transition(MEDIA)}>Media</Button>
			</CardActions>
			<Divider />
			<CardContent sx={cardContentSx}>
				{mode === COMMENTS && <MessageBox />}
				{mode === FILES && <PropertyFiles />}
				{mode === TASKS && <PropertyTasks />}
				{mode === MEDIA && <MediaCarousel />}
			</CardContent>
		</Card>
	);
}
