import { useState } from 'react';
import { Box, Grid, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, Chip, Button, Card, CardHeader, CardActions, CardContent } from '@mui/material';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import { useSelector, useDispatch } from 'react-redux';

import formatDistanceToNowStrict from 'date-fns/esm/formatDistanceToNowStrict';
import { format } from 'date-fns';

export default function AgileBoard() {
	const app = useSelector((state) => state.app.value);
	const dashboard = useSelector((state) => state.dashboard.value);

	const [open, setOpen] = useState([]);
	const [accepted, setAccepted] = useState([]);
	const [deposit, setDeposit] = useState([]);
	const [complete, setComplete] = useState([]);
	const [closed, setClosed] = useState([]);

	return (
		<>
			<Grid container spacing={2}>
				<Grid item xs={12} md={8}>
					<Card sx={{ height: '100%' }}>
						<CardHeader title={'Properties'} titleTypographyProps={{ variant: 'h5' }} action={<Button>Lease</Button>} />
						<CardActions>
							<Button>Open</Button>
							<Button>Offer Accepted</Button>
							<Button>Deposit Received</Button>
							<Button>Closing</Button>
						</CardActions>
						<CardContent>
							<List sx={{ width: '100%', height: 300, overflow: 'auto' }} dense component='div' role='list' disablePadding>
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
				<Grid item xs={12} md={4}>
					<Card sx={{ height: '100%' }}>
						<CardHeader title={'Tasks'} titleTypographyProps={{ variant: 'h5' }} />
						<CardActions>
							<Button>Open</Button>
							<Button>Overdue</Button>
							<Button>Blocked</Button>
							<Button>Completed</Button>
						</CardActions>
						<CardContent>
							<List sx={{ width: '100%', height: 300, overflow: 'auto' }} dense component='div' role='list' disablePadding>
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
			</Grid>
		</>
	);
}
