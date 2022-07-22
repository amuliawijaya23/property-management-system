import { useState } from 'react';
import Box from '@mui/material/Box';
import EnhancedTable from '../../common/Table';
import FormAlert from '../../common/FormAlert';

import TransactionForm from '../../common/TransactionForm';
import useTransactionsData from './hooks/useTransactionsData';

export default function Transactions() {
	useTransactionsData();
	const [open, setOpen] = useState(false);
	const [transaction, setTransaction] = useState(null);
	const [alert, setAlert] = useState({ open: false, message: '', severity: 'error' });

	const closeAlert = () => {
		setAlert({ open: false, message: '', severity: 'error' });
	};

	const handleClose = () => {
		setTransaction(null);
		setOpen(false);
	};

	const handleOpen = (input) => {
		setTransaction(input);
		setOpen(true);
	};

	return (
		<Box width={'100%'} mt={10} mb={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<EnhancedTable handleOpen={handleOpen} defaultOrder='asc' defaultOrderBy='end_date' />
			{open && <TransactionForm open={open} onClose={handleClose} transaction={transaction} alert={alert} setAlert={setAlert} setTransaction={setTransaction} />}
			{alert?.open && <FormAlert open={alert?.open} message={alert?.message} severity={alert?.severity} onClose={closeAlert} />}
		</Box>
	);
}
