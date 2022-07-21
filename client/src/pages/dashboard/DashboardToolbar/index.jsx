import { Grid, Card, Button, AvatarGroup, CardActions, CardHeader, FormControl, Select, InputLabel, MenuItem, TextField } from '@mui/material/';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import SelectAgent from '../../../common/SelectAgent';

import { useSelector } from 'react-redux';

import { useDashboardData } from '../hooks/useDashboardData';

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
						{app?.agents?.map((agent, i) => (
							<SelectAgent key={`select-agent-dashboard-${i}`} agent={agent} assignAgent={selectAgent} selected={agent?.user_id === dashboard?.user} />
						))}
					</CardActions>
				</Grid>
				<Grid item container alignItems='center'>
					<Grid item xs={4.5} sx={{ px: 2 }}>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DesktopDatePicker label='Start' inputFormat='MM/dd/yyyy' value={range?.start} onChange={setStart} renderInput={(params) => <TextField variant='standard' {...params} fullWidth />} />
						</LocalizationProvider>
					</Grid>
					<Grid item xs={4.5} sx={{ px: 2 }}>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DesktopDatePicker label='End' inputFormat='MM/dd/yyyy' value={range?.end} onChange={setEnd} renderInput={(params) => <TextField variant='standard' {...params} fullWidth />} />
						</LocalizationProvider>
					</Grid>
					<Grid item xs={3} sx={{ px: 1 }}>
						<FormControl margin='dense'>
							<InputLabel id='select-label'>Past Data</InputLabel>
							<Select variant='standard' labelId='select-label' value={distance} label='Past Data' onChange={selectDistance} sx={{ minWidth: 100 }}>
								<MenuItem value={1}>1 year</MenuItem>
								<MenuItem value={2}>2 years</MenuItem>
								<MenuItem value={3}>3 years</MenuItem>
								<MenuItem value={4}>4 years</MenuItem>
								<MenuItem value={5}>5 years</MenuItem>
							</Select>
						</FormControl>
					</Grid>
				</Grid>
			</Grid>
		</Card>
	);
};
