import { Grid, Card, Button, AvatarGroup, CardActions, CardHeader, FormControl, Select, InputLabel, MenuItem } from '@mui/material/';
import SelectAgent from '../../../common/SelectAgent';

import { useSelector } from 'react-redux';

import { useDashboardData } from '../hooks/useDashboardData';
import DateTimeSelector from '../../../common/DateTimeSelector';

export const DashboardToolbar = () => {
	const { range, distance, selectDistance, setStart, setEnd, selectAgent } = useDashboardData();
	const app = useSelector((state) => state.app.value);
	const dashboard = useSelector((state) => state.dashboard.value);
	const agent = app?.agents?.find((agent) => agent?.user_id === dashboard?.user);

	return (
		<Card sx={{ py: 1, px: 1 }}>
			<Grid container>
				<Grid item xs={12}>
					<CardActions>
						{/* <Button>Transactions</Button> */}
						{/* <Button>Agile Board</Button> */}
					</CardActions>
				</Grid>
				<Grid item xs={12}>
					<CardHeader title={`${dashboard?.user ? agent?.name.split(' - ')[0] : 'Team'}'s Dashboard`} titleTypographyProps={{ component: 'div', variant: 'h7' }} />
				</Grid>
				<Grid item xs={12} md={12}>
					<CardActions>
						{/* <AvatarGroup spacing={'medium'} sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }} > */}
						{app?.agents?.map((agent, i) => (
							<SelectAgent key={`select-agent-dashboard-${i}`} agent={agent} assignAgent={selectAgent} selected={agent?.user_id === dashboard?.user} />
						))}
						{/* </AvatarGroup> */}
					</CardActions>
				</Grid>
				<Grid item container alignItems='center'>
					<Grid item xs={4.5} sx={{ px: 2 }}>
						<DateTimeSelector form={range} setDate={setStart} type={'start'} />
					</Grid>
					<Grid item xs={4.5} sx={{ px: 2 }}>
						<DateTimeSelector form={range} setDate={setEnd} type={'end'} />
					</Grid>
					<Grid item xs={3} sx={{ px: 1, mb: 2 }}>
						<FormControl margin='dense'>
							<InputLabel id='select-label'>Past Data</InputLabel>
							<Select variant='standard' labelId='select-label' value={distance} label='Past Data' onChange={selectDistance}>
								<MenuItem value={1}>a year ago</MenuItem>
								<MenuItem value={2}>2 years ago</MenuItem>
								<MenuItem value={3}>3 years ago</MenuItem>
								<MenuItem value={3}>4 years ago</MenuItem>
							</Select>
						</FormControl>
					</Grid>
				</Grid>
			</Grid>
		</Card>
	);
};
