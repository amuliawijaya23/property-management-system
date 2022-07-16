import { useEffect, useState, useCallback } from 'react';

import { Card, Box, CardActions, CardContent, CardHeader, Divider, IconButton, Button, Grid } from '@mui/material';
import styled from '@mui/material/styles/styled';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import PropertyHeader from './PropertyHeader';
import PropertyImages from './PropertyImages';
import Collapsable from './Collapsable';
import PropertyStatus from './PropertyStatus';
import PropertyMessages from './PropertyMessages';
import PropertyFiles from './PropertyFiles';
import PropertyTasks from './PropertyTasks';
import PropertyForm from '../../common/PropertyForm';
import PageNotFound from '../../PageNotFound';

import usePropertyData from './hooks/usePropertyData';

import { useSelector } from 'react-redux';

import useVisualMode from '../../hooks/useVisualMode';
import { COMMENTS, FILES, TASKS, MEDIA, LOADING, ERROR } from '../../helpers/modes';

import format from 'date-fns/format';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';

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

export default function Property() {
	const { mode, transition } = useVisualMode(COMMENTS);
	const property = useSelector((state) => state.property.value);
	const [expanded, setExpanded] = useState(false);
	const [open, setOpen] = useState(false);
	const dateUpdated = property?.details?.updated_at ? new Date(property?.details?.updated_at) : new Date();
	const dateCreated = property?.details?.created_at ? new Date(property?.details?.created_at) : new Date();

	usePropertyData();

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			{!property.valid && <PageNotFound />}
			{property?.details?.id && (
				<Grid xs={12} md={10} container sx={{ mt: 2, mb: 2 }}>
					<Card sx={{ width: '100%' }}>
						<Grid container>
							<Grid item xs={12}>
								<PropertyHeader handleClickOpen={handleClickOpen} />
								<Divider />
							</Grid>
							<Grid item xs={6}>
								<CardHeader
									title={`LIST-${property?.details?.id} ${property.details?.title}`}
									subheader={
										<>
											{`Updated ${formatDistanceToNowStrict(dateUpdated, { addSuffix: true })}`}
											<br />
											{`Created ${format(dateCreated, 'PPp')}`}
										</>
									}
									titleTypographyProps={{ variant: 'h7' }}
								/>
							</Grid>
							<Grid item xs={6}>
								<Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
									<ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label='show more' sx={{ MediaRecorder: '0.5rem' }}>
										<ExpandMoreIcon />
									</ExpandMore>
								</Box>
							</Grid>
							<Grid item xs={12}>
								<Collapsable expanded={expanded} />
							</Grid>
							<Grid item xs={12}>
								<PropertyStatus />
							</Grid>
							<Grid item xs={12}>
								<CardActions sx={{ mt: 5 }}>
									<Button onClick={() => transition(COMMENTS)}>Comments</Button>
									<Button onClick={() => transition(TASKS)}>Tasks</Button>
									<Button onClick={() => transition(FILES)}>Files</Button>
									<Button onClick={() => transition(MEDIA)}>Media</Button>
								</CardActions>
								<Divider />
							</Grid>
							<Grid item xs={12}>
								<CardContent>
									{mode === COMMENTS && <PropertyMessages />}
									{mode === FILES && <PropertyFiles />}
									{mode === TASKS && <PropertyTasks />}
									{mode === MEDIA && <PropertyImages />}
								</CardContent>
							</Grid>
						</Grid>
					</Card>
					<PropertyForm open={open} onClose={handleClose} property={property.details} />
				</Grid>
			)}
			{/* {!isPropertyValid && <PageNotFound />} */}
		</>
	);
}
