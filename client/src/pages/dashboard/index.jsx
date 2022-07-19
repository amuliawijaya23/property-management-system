import { Box, Grid } from '@mui/material';

import { TotalStream } from './TotalStream';
import { TotalSale } from './TotalSale';
import { TotalLease } from './TotalLease';
import { TransactionGraph } from './TransactionGraph';
import { TransactionGraphType } from './TransactionGraphType';
import { DashboardLayout } from './dashboard-layout';
import { TransactionsBySale } from './TransactionsBySale';
import { TransactionsByLease } from './TransactionsByLease';
import { AllTransactions } from './AllTransactions';

import { DashboardToolbar } from './DashboardToolbar';

export default function Dashboard() {
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
					<Grid item xs={12} md={4}>
						<AllTransactions sx={{ height: '100%' }} />
					</Grid>
					<Grid item xs={12} md={4}>
						<TransactionsBySale sx={{ height: '100%' }} />
					</Grid>
					<Grid item xs={12} md={4}>
						<TransactionsByLease sx={{ height: '100%' }} />
					</Grid>
				</Grid>
			</Box>
		</>
	);
}

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
