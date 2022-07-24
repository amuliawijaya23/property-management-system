import { useState } from 'react';
import { Box, Grid } from '@mui/material';
import { TotalStream } from './TotalStream';
import { TotalSale } from './TotalSale';
import { TotalLease } from './TotalLease';
import { TransactionGraph } from './TransactionGraph';
import { TransactionGraphType } from './TransactionGraphType';
import { DashboardLayout } from './dashboard-layout';
import { TransactionTable } from './TransactionTable';
import { DashboardToolbar } from './DashboardToolbar';
import AgileBoard from './AgileBoard';
import TransactionForm from '../../common/TransactionForm';
import FormAlert from '../../common/FormAlert';

import useVisualMode from '../../hooks/useVisualMode';
import { TASKS, TRANSACTIONS } from '../../helpers/modes';

export default function Dashboard() {
	const [open, setOpen] = useState(false);
	const [transaction, setTransaction] = useState(null);
	const [alert, setAlert] = useState({
		open: false,
		message: '',
		severity: 'error'
	});

	const { mode, transition } = useVisualMode(TRANSACTIONS);

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

	const modeHandler = () => {
		mode === TRANSACTIONS ? transition(TASKS) : transition(TRANSACTIONS);
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
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<DashboardToolbar mode={mode} modeHandler={modeHandler} />
					</Grid>
					{mode === TRANSACTIONS && (
						<>
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
							<Grid item xs={12} md={12}>
								<TransactionTable handleOpen={handleClickOpen} />
							</Grid>
						</>
					)}
					{mode === TASKS && (
						<Grid item xs={12}>
							<AgileBoard />
						</Grid>
					)}
				</Grid>
			</Box>
			{open && <TransactionForm open={open} onClose={handleClose} transaction={transaction} setTransaction={setTransaction} alert={alert} setAlert={setAlert} />}
			{alert?.open && <FormAlert open={alert?.open} message={alert?.message} severity={alert?.severity} onClose={closeAlert} />}
		</>
	);
}

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
