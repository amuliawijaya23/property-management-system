// import { formatDistanceToNow, subHours } from 'date-fns';
import { Box, Button, Card, CardContent, CardHeader, Divider, IconButton, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useSelector } from 'react-redux';

import formatDistanceToNowStrict from 'date-fns/esm/formatDistanceToNowStrict';

export const AllTransactions = (props) => {
	const dashboard = useSelector((state) => state.dashboard.value);
	const app = useSelector((state) => state.app.value);

	let transactions = dashboard?.stream?.currentTransactions;

	if (dashboard?.user) {
		transactions = transactions.filter((t) => t?.agent_id === dashboard?.user);
	}

	return (
		<Card {...props} sx={{ minHeight: '100%' }}>
			<CardHeader subtitle={`${transactions?.length} in total`} title='All' subheaderTypographyProps={{ variant: 'captions' }} titleTypographyProps={{ variant: 'captions' }} />
			<Divider />
			<CardContent sx={{ height: 400, overflow: 'auto' }}>
				<List sx={{ display: 'flex', flexDirection: 'column' }}>
					{transactions?.map((transaction, i) => (
						<ListItem divider={i < transactions?.length - 1} key={`TRX-${transaction.id}`} button>
							<ListItemAvatar>
								<Avatar src={app?.agents?.find((agent) => agent?.user_id === transaction?.agent_id)?.picture} alt='agent' />
							</ListItemAvatar>
							<ListItemText
								primary={`LIST-${transaction?.listing_id} - TRX-${transaction?.id} - ${transaction?.notes}`}
								secondary={`Updated ${formatDistanceToNowStrict(new Date(transaction?.updated_at), { addSuffix: true })}`}
							/>
							<IconButton edge='end' size='small'>
								<MoreVertIcon />
							</IconButton>
						</ListItem>
					))}
					{transactions.length < 1 && (
						<ListItem>
							<ListItemText primary={'No Transaction Found'} />
						</ListItem>
					)}
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
	);
};
