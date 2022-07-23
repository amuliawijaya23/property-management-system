import { Box, Button, Card, CardContent, CardHeader, Divider, IconButton, List, ListItem, ListItemAvatar, Avatar, ListItemText, Chip } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useSelector } from 'react-redux';

import format from 'date-fns/format';
import NumberFormat from 'react-number-format';

export const TransactionsByLease = (props) => {
	const dashboard = useSelector((state) => state.dashboard.value);
	const app = useSelector((state) => state.app.value);

	let transactions = dashboard?.lease?.currentTransactions;

	if (dashboard?.user) {
		transactions = transactions.filter((t) => t?.agent_id === dashboard?.user);
	}

	return (
		<Card {...props} sx={{ minHeight: '100%' }}>
			<CardHeader subtitle={`${transactions?.length} in total`} title='Lease' subheaderTypographyProps={{ variant: 'captions' }} titleTypographyProps={{ variant: 'captions' }} />
			<Divider />
			<CardContent sx={{ height: 400, overflow: 'auto' }}>
				<List sx={{ display: 'flex', flexDirection: 'column' }}>
					{transactions?.map((transaction, i) => {
						return (
							<ListItem divider={i < transactions?.length - 1} key={`TRX-${transaction.id}`} button>
								<ListItemAvatar>
									<Avatar src={app?.agents?.find((agent) => agent?.user_id === transaction?.agent_id)?.picture} alt='agent' />
								</ListItemAvatar>
								<ListItemText
									primary={`TRX-${transaction?.id}`}
									secondary={
										<>
											{`LIST-${transaction?.listing_id} - Date: ${format(new Date(transaction?.start_date), 'P')} - End Date: ${format(new Date(transaction?.end_date), 'P')} - `}
											<NumberFormat
												displayType='text'
												value={transaction?.transaction_value}
												thousandSeparator={','}
												decimalSeparator={'.'}
												decimalScale={2}
												fixedDecimalScale
												isNumericString
												prefix='$ '
											/>
										</>
									}
								/>
								<IconButton edge='end' size='small'>
									<MoreVertIcon />
								</IconButton>
							</ListItem>
						);
					})}
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
