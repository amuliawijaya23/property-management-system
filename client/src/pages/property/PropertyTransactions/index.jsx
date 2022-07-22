import { useState } from 'react';

import { Box, Table, TableBody, TableCell, TableHead, TableRow, Chip, Avatar, Button, Alert, Tooltip, Divider } from '@mui/material';
import TransactionForm from '../../../common/TransactionForm';
import FormAlert from '../../../common/FormAlert';

import { useSelector } from 'react-redux';

import format from 'date-fns/format';

export default function PropertyTransactions() {
	const app = useSelector((state) => state.app.value);
	const property = useSelector((state) => state.property.value);

	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState(null);
	const [alert, setAlert] = useState({ open: false, message: '', severity: 'error' });

	const closeAlert = () => {
		setAlert({ open: false, message: '', severity: 'error' });
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setSelected(null);
		setOpen(false);
	};

	const handleSelect = (input) => {
		setSelected(input);
		setOpen(true);
	};

	const rows = property?.transactions?.map((transaction, i) => {
		const agent = app?.agents?.find((agent) => agent?.user_id === transaction?.agent_id);
		return {
			id: transaction?.id,
			agent: agent,
			transaction_type: transaction?.transaction_type,
			service_type: transaction?.service_type,
			start_date: transaction?.start_date,
			end_date: transaction?.end_date,
			status: transaction?.status
		};
	});

	return (
		<Box width={'100%'} sx={{ overflow: 'auto', minHeight: 300 }}>
			<Button onClick={handleOpen}>Add Transaction</Button>
			<Table sx={{ minWidth: 650 }} aria-labelledby='dense table'>
				<TableHead>
					<TableRow>
						<TableCell>ID</TableCell>
						<TableCell>Agent</TableCell>
						<TableCell>Type</TableCell>
						<TableCell>Start Date</TableCell>
						<TableCell>End Date</TableCell>
						<TableCell>Status</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, i) => {
						const currentTransaction = property?.transactions?.find((transaction) => transaction.id === row.id);
						const color = (() => {
							switch (row?.status) {
								case 'Open':
									return 'primary';

								case 'Pending Confirmation':
									return 'warning';

								case 'Active':
									return 'secondary';

								case 'Closed':
									return 'success';

								case 'Canceled':
									return 'error';

								default:
									return 'default';
							}
						})();

						return (
							<TableRow key={`property-transaction-${i}`} sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }} hover onClick={() => handleSelect(currentTransaction)}>
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
								<TableCell>{format(new Date(row.end_date), 'Ppp')}</TableCell>
								<TableCell>
									<Chip label={row.status} color={color} />
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
			{open && <TransactionForm open={open} onClose={handleClose} listingId={property?.details?.id} transaction={selected} alert={alert} setAlert={setAlert} />}
			{alert?.open && <FormAlert open={alert?.open} message={alert?.message} severity={alert?.severity} onClose={closeAlert} />}
		</Box>
	);
}
