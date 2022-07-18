import { useState } from 'react';
import Box from '@mui/material/Box';
import EnhancedTable from '../../common/Table';
import TransactionForm from '../../common/TransactionForm';
// import TaskForm from '../../common/TaskForm';
import useTransactionsData from './hooks/useTransactionsData';

export default function Transactions() {
	useTransactionsData();
	const [open, setOpen] = useState(false);
	const [transaction, setTransaction] = useState(null);

	const handleClose = () => {
		setTransaction(null);
		setOpen(false);
	};

	const handleOpen = (input) => {
		setTransaction(input);
		setOpen(true);
	};

	return (
		<Box width={'100%'} mt={2} mb={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<EnhancedTable handleOpen={handleOpen} defaultOrder='asc' defaultOrderBy='end_date' />
			<TransactionForm open={open} onClose={handleClose} transaction={transaction} />
		</Box>
	);
}
