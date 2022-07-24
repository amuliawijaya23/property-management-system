import { Button, Card, CardContent, CardHeader, Divider, Avatar, TableRow, TableCell, TableHead, Table, TableBody, Tooltip, Chip, Alert } from '@mui/material';

import { useSelector } from 'react-redux';
import format from 'date-fns/format';
import NumberFormat from 'react-number-format';
import useVisualMode from '../../../hooks/useVisualMode';
import { SALE, LEASE } from '../../../helpers/modes';

export const TransactionTable = ({ handleOpen }) => {
	const dashboard = useSelector((state) => state.dashboard.value);
	const app = useSelector((state) => state.app.value);
	const { mode, transition } = useVisualMode(SALE);

	const modeHandler = () => {
		mode === SALE ? transition(LEASE) : transition(SALE);
	};

	let transactions = (() => {
		switch (mode) {
			case SALE:
				return dashboard?.sale?.currentTransactions;

			case LEASE:
				return dashboard?.lease?.currentTransactions;

			default:
				return dashboard?.stream?.currentTransactions;
		}
	})();

	if (dashboard?.user) {
		transactions = transactions.filter((t) => t?.agent_id === dashboard?.user);
	}

	const rows = transactions?.map((transaction, i) => {
		const agent = app?.agents?.find((agent) => agent?.user_id === transaction?.agent_id);
		return {
			id: transaction?.id,
			agent: agent,
			transaction_type: transaction?.transaction_type,
			service_type: transaction?.service_type,
			start_date: transaction?.start_date,
			end_date: transaction?.end_date,
			status: transaction?.status,
			amount: transaction?.transaction_value
		};
	});

	return (
		<Card sx={{ minHeight: '100%' }}>
			<CardHeader
				title={`${transactions?.length} Transactions`}
				subheaderTypographyProps={{ variant: 'caption' }}
				titleTypographyProps={{ variant: 'captions' }}
				action={<Button onClick={modeHandler}>{mode === SALE ? 'Lease' : 'Sale'}</Button>}
			/>
			<Divider />
			<CardContent sx={{ height: 400, overflow: 'auto' }}>
				<Table sx={{ minWidth: 650 }} aria-labelledby='dense table'>
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Agent</TableCell>
							<TableCell>Type</TableCell>
							<TableCell>Start Date</TableCell>
							<TableCell>End Date</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Amount</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row, i) => {
							const currentTransaction = transactions?.find((transaction) => transaction.id === row.id);
							const color = (() => {
								switch (row?.status) {
									case 'Open':
										return 'primary';

									case 'Pending':
										return 'warning';

									case 'Active':
										return 'success';

									case 'Closed':
										return 'success';

									case 'Canceled':
										return 'error';

									default:
										return 'default';
								}
							})();

							return (
								<TableRow key={`property-transaction-${i}`} sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }} hover onClick={() => handleOpen(currentTransaction)}>
									<TableCell component='th' scope='row'>
										TRX-{row.id}
									</TableCell>
									<TableCell>
										<Tooltip title={row?.agent?.name}>
											<Avatar src={row?.agent?.picture} alt='agent' />
										</Tooltip>
									</TableCell>
									<TableCell>{row.transaction_type}</TableCell>
									<TableCell>{format(new Date(row.start_date), 'Ppp')}</TableCell>
									<TableCell>{row?.end_date ? format(new Date(row.end_date), 'Ppp') : 'None'}</TableCell>
									<TableCell>
										<Chip label={row.status} color={color} />
									</TableCell>
									<TableCell>
										<NumberFormat displayType='text' value={row?.amount} isNumericString thousandSeparator={','} decimalSeparator={'.'} decimalScale={2} fixedDecimalScale prefix='$ ' />
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
				{rows.length < 1 && (
					<Alert severity='info' sx={{ mt: 2 }}>
						No transaction found for this listing, click add transaction to create one.
					</Alert>
				)}
			</CardContent>
		</Card>
	);
};
