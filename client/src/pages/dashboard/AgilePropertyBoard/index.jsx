import { useState } from 'react';
import { Box, Container, Grid, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, Chip, Paper, Button, ListItemIcon, Card, CardHeader, CardContent } from '@mui/material';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import { useSelector, useDispatch } from 'react-redux';

import formatDistanceToNowStrict from 'date-fns/esm/formatDistanceToNowStrict';
import { format } from 'date-fns';

export default function AgilePropertyBoard() {
	const app = useSelector((state) => state.app.value);
	const dashboard = useSelector((state) => state.dashboard.value);
	const dispatch = useDispatch();

	const [open, setOpen] = useState([]);
	const [accepted, setAccepted] = useState([]);
	const [deposit, setDeposit] = useState([]);
	const [complete, setComplete] = useState([]);
	const [closed, setClosed] = useState([]);

	return (
		<>
			<Grid container spacing={3}>
				<Grid item xs={12} md={3}>
					<Card sx={{ height: '100%' }}>
						<CardHeader title={<Chip sx={{ width: 140 }} label={'OPEN'} color={'primary'} />} />
						<CardContent>
							<List sx={{ width: '100%', height: 400, overflow: 'auto' }} dense component='div' role='list' disablePadding>
								{app?.properties
									.filter((property) => property?.status === 'Open' && property?.agent_id === dashboard?.user)
									?.map((property, i) => {
										const agent = app?.agents?.find((agent) => agent?.user_id === property?.agent_id);
										return (
											<>
												<ListItem button dense inset role='listitem'>
													<ListItemAvatar>
														<Avatar src={agent?.picture} alt='agent' />
													</ListItemAvatar>
													<ListItemText
														primary={`LIST-${property?.id} ${property?.title.length > 25 ? `${property?.title.slice(0, 25).trim()}...` : property?.title}`}
														secondary={`Updated ${formatDistanceToNowStrict(new Date(property?.updated_at), { addSuffix: true })}`}
													/>
												</ListItem>
												{i !== app?.properties?.filter((p) => p?.status === 'Open' && property?.agent_id === dashboard?.user).length - 1 && <Divider />}
											</>
										);
									})}
							</List>
						</CardContent>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'flex-end',
								p: 2
							}}>
							<Button color='primary' endIcon={<ArrowRightIcon />} size='small' variant='text'>
								View all
							</Button>
						</Box>
					</Card>
				</Grid>
				<Grid item xs={12} md={3}>
					<Card sx={{ height: '100%' }}>
						<CardHeader title={<Chip sx={{ width: 140 }} label={'OFFER ACCEPTED'} color={'warning'} />} />
						<List sx={{ width: '100%', height: 400, overflow: 'auto' }} dense component='div' role='list'>
							{app?.properties
								.filter((property) => property?.status === 'Offer Accepted' && property?.agent_id === dashboard?.user)
								?.map((property, i) => {
									const agent = app?.agents?.find((agent) => agent?.user_id === property?.agent_id);
									return (
										<>
											<ListItem button dense inset role='listitem'>
												<ListItemAvatar>
													<Avatar src={agent?.picture} alt='agent' />
												</ListItemAvatar>
												<ListItemText
													primary={`LIST-${property?.id} ${property?.title.length > 25 ? `${property?.title.slice(0, 25).trim()}...` : property?.title}`}
													secondary={`Updated ${formatDistanceToNowStrict(new Date(property?.updated_at), { addSuffix: true })}`}
												/>
											</ListItem>
											{i !== app?.properties?.filter((p) => p?.status === 'Offer Accepted' && property?.agent_id === dashboard?.user).length - 1 && <Divider />}
										</>
									);
								})}
						</List>
					</Card>
				</Grid>
				<Grid item xs={12} md={3}>
					<Card sx={{ height: '100%' }}>
						<CardHeader title={<Chip sx={{ width: 140 }} label={'DEPOSIT RECEIVED'} color={'secondary'} />} />
						<List sx={{ width: '100%', height: 400, overflow: 'auto' }} dense component='div' role='list'>
							{app?.properties
								.filter((property) => property?.status === 'Deposit Received' && property?.agent_id === dashboard?.user)
								?.map((property, i) => {
									const agent = app?.agents?.find((agent) => agent?.user_id === property?.agent_id);
									return (
										<>
											<ListItem button dense inset role='listitem'>
												<ListItemAvatar>
													<Avatar src={agent?.picture} alt='agent' />
												</ListItemAvatar>
												<ListItemText
													primary={`LIST-${property?.id} ${property?.title.length > 25 ? `${property?.title.slice(0, 25).trim()}...` : property?.title}`}
													secondary={`Updated ${formatDistanceToNowStrict(new Date(property?.updated_at), { addSuffix: true })}`}
												/>
											</ListItem>
											{i !== app?.properties.filter((p) => p?.status === 'Deposit Received' && property?.agent_id === dashboard?.user).length - 1 && <Divider />}
										</>
									);
								})}
						</List>
					</Card>
				</Grid>
				<Grid item xs={12} md={3}>
					<Card sx={{ height: '100%', width: '100%' }}>
						<CardHeader title={<Chip sx={{ width: 140 }} label={'COMPLETION'} color={'info'} />} />
						<List sx={{ width: '100%', height: 400, overflow: 'auto' }} dense component='div' role='list'>
							{app?.properties
								.filter((property) => property?.status === 'Completion' && property?.agent_id === dashboard?.user)
								?.map((property, i) => {
									const agent = app?.agents?.find((agent) => agent?.user_id === property?.agent_id);
									return (
										<>
											<ListItem button dense inset role='listitem'>
												<ListItemAvatar>
													<Avatar src={agent?.picture} alt='agent' />
												</ListItemAvatar>
												<ListItemText
													primary={`LIST-${property?.id} ${property?.title.length > 25 ? `${property?.title.slice(0, 25).trim()}...` : property?.title}`}
													secondary={`Updated ${formatDistanceToNowStrict(new Date(property?.updated_at), { addSuffix: true })}`}
												/>
											</ListItem>
											{i !== app?.properties.filter((p) => p?.status === 'Completion' && property?.agent_id === dashboard?.user).length - 1 && <Divider />}
										</>
									);
								})}
						</List>
					</Card>
				</Grid>
			</Grid>
		</>
	);
}
