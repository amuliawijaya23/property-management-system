import { useState } from 'react';
import { Box, Grid } from '@mui/material';
import { TotalStream } from './TotalStream';
import { TotalSale } from './TotalSale';
import { TotalLease } from './TotalLease';
import { TransactionGraph } from './TransactionGraph';
import { TransactionGraphType } from './TransactionGraphType';
import { DashboardLayout } from './dashboard-layout';
import { TransactionsBySale } from './TransactionsBySale';
import { TransactionsByLease } from './TransactionsByLease';
import { DashboardToolbar } from './DashboardToolbar';
import TransactionForm from '../../common/TransactionForm';
import FormAlert from '../../common/FormAlert';

export default function Dashboard() {
	const [open, setOpen] = useState(false);
	const [transaction, setTransaction] = useState(null);
	const [alert, setAlert] = useState({
		open: false,
		message: '',
		severity: 'error'
	});

	const closeAlert = () => {
		setAlert({ open: false, message: '', severity: 'error' });
	};

	const handleClickOpen = (input) => {
		setTransaction(input);
		setOpen(true);
	};

	const handleClose = () => {
		setTransaction(null);
		setOpen(false);
	};

	return (
		<>
			<Box
				component='main'
				sx={{
					width: '100vw',
					px: 2,
					py: 6,
					mt: 5
				}}>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<DashboardToolbar />
					</Grid>
					<Grid item xs={12} md={4}>
						<TotalStream />
					</Grid>
					<Grid item xs={12} md={4}>
						<TotalSale />
					</Grid>
					<Grid item xs={12} md={4}>
						<TotalLease />
					</Grid>
					<Grid item lg={4} md={6} xl={3} xs={12}>
						<TransactionGraphType sx={{ height: '100%' }} />
					</Grid>
					<Grid item lg={8} md={12} xl={9} xs={12}>
						<TransactionGraph />
					</Grid>
					<Grid item xs={12} md={6}>
						<TransactionsBySale sx={{ height: '100%' }} handleOpen={handleClickOpen} />
					</Grid>
					<Grid item xs={12} md={6}>
						<TransactionsByLease sx={{ height: '100%' }} handleOpen={handleClickOpen} />
					</Grid>
				</Grid>
				{open && <TransactionForm open={open} onClose={handleClose} transaction={transaction} setTransaction={setTransaction} alert={alert} setAlert={setAlert} />}
			</Box>
			{alert?.open && <FormAlert open={alert?.open} message={alert?.message} severity={alert?.severity} onClose={closeAlert} />}
		</>
	);
}

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
