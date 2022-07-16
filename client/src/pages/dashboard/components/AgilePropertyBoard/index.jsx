import { useState } from 'react';
import { Box, Container, Grid, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, Chip, Paper, Button, ListItemIcon, Card, CardHeader } from '@mui/material';

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
					<Card sx={{ height: '100%', width: '100%' }}>
						<CardHeader title={<Chip sx={{ width: 140 }} label={'CLOSED'} color={'success'} />} />
						<List sx={{ width: '100%', height: 400, overflow: 'auto' }} dense component='div' role='list'>
							{dashboard?.properties
								.filter((property) => property?.status === 'Closed')
								.map((property, i) => {
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
											{i !== dashboard?.properties.length - 1 && <Divider />}
										</>
									);
								})}
						</List>
					</Card>
				</Grid>
				<Grid item xs={12} md={9}>
					<Card sx={{ height: '100%', width: '100%' }}>
						<List></List>
					</Card>
				</Grid>
				<Grid item xs={12} md={3}>
					<Card sx={{ height: '100%' }}>
						<CardHeader title={<Chip sx={{ width: 140 }} label={'OPEN'} color={'primary'} />} />
						<List sx={{ width: '100%', height: 400, overflow: 'auto' }} dense component='div' role='list'>
							{dashboard?.properties
								.filter((property) => property?.status === 'Open')
								.map((property, i) => {
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
											{i !== dashboard?.properties.length - 1 && <Divider />}
										</>
									);
								})}
						</List>
					</Card>
				</Grid>
				<Grid item xs={12} md={3}>
					<Card sx={{ height: '100%' }}>
						<CardHeader title={<Chip sx={{ width: 140 }} label={'OFFER ACCEPTED'} color={'warning'} />} />
						<List sx={{ width: '100%', height: 400, overflow: 'auto' }} dense component='div' role='list'>
							{dashboard?.properties
								.filter((property) => property?.status === 'Offer Accepted')
								.map((property, i) => {
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
											{i !== dashboard?.properties.length - 1 && <Divider />}
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
							{dashboard?.properties
								.filter((property) => property?.status === 'Deposit Received')
								.map((property, i) => {
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
											{i !== dashboard?.properties.length - 1 && <Divider />}
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
							{dashboard?.properties
								.filter((property) => property?.status === 'Completion')
								.map((property, i) => {
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
											{i !== dashboard?.properties.length - 1 && <Divider />}
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
