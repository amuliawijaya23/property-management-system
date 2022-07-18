import { Card, Button, Grid, Paper, AvatarGroup, Avatar, CardActions, CardHeader } from '@mui/material/';
import SelectAgent from '../../../common/SelectAgent';

import { useSelector, useDispatch } from 'react-redux';

import { useDashboardData } from '../hooks/useDashboardData';

export const DashboardToolbar = () => {
	const { selectAgent } = useDashboardData();
	const app = useSelector((state) => state.app.value);
	const dashboard = useSelector((state) => state.dashboard.value);
	const agent = app?.agents?.find((agent) => agent?.user_id === dashboard?.user);

	return (
		<Card sx={{ py: 1, px: 1 }}>
			<CardHeader title={`${dashboard?.user ? agent?.name.split(' - ')[0] : 'Team'}'s Dashboard`} titleTypographyProps={{ component: 'div', variant: 'captions' }} />
			<CardActions>
				<AvatarGroup spacing={'medium'} sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
					{app?.agents?.map((agent) => (
						<SelectAgent agent={agent} assignAgent={selectAgent} selected={agent?.user_id === dashboard?.user} />
					))}
				</AvatarGroup>
			</CardActions>
			<CardActions>
				<Button>Transactions</Button>
				<Button>Agile Board</Button>
			</CardActions>
		</Card>
	);
};
