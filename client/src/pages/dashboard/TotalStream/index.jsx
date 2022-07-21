import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MoneyIcon from '@mui/icons-material/Money';
import NumberFormat from 'react-number-format';

import { useSelector } from 'react-redux';

export const TotalStream = (props) => {
	const dashboard = useSelector((state) => state.dashboard.value);
	const sum = dashboard?.stream?.current;
	const pastSum = dashboard?.stream?.past;
	const delta = sum - pastSum;
	const count = dashboard?.stream?.count;
	const color = (() => {
		if (isNaN(sum)) {
			return 'error.main';
		} else {
			return delta > 0 || isNaN(delta) ? 'success.main' : 'warning.main';
		}
	})();

	return (
		<Card sx={{ height: 175 }} {...props}>
			<CardContent>
				<Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
					<Grid item>
						<Typography color='textSecondary' gutterBottom variant='overline'>
							Total
						</Typography>
						{sum > 0 && (
							<>
								<Typography color='textPrimary' variant='h6'>
									<NumberFormat
										value={sum}
										thousandSeparator={','}
										decimalScale={2}
										fixedDecimalScale={true}
										decimalSeparator={'.'}
										displayType='text'
										prefix='$ '
										renderText={(value) => <>{value}</>}
									/>
								</Typography>
								<Typography color='textSecondary' variant='caption'>
									From {count} {count > 1 ? 'Properties' : 'Property'}
								</Typography>
							</>
						)}
						{!sum && (
							<Typography color='textPrimary' variant='h6'>
								No Data Found
							</Typography>
						)}
					</Grid>
					<Grid item>
						<Avatar
							sx={{
								backgroundColor: color,
								height: 56,
								width: 56
							}}>
							<MoneyIcon />
						</Avatar>
					</Grid>
				</Grid>
				<Box
					sx={{
						pt: 2,
						display: 'flex',
						alignItems: 'center'
					}}>
					{delta >= 0 && <ArrowUpwardIcon color='success' />}
					{delta < 0 && <ArrowDownwardIcon color='error' />}
					<Typography
						color={color}
						sx={{
							mr: 1
						}}
						variant='body2'>
						{delta >= 0 && `${(delta / pastSum).toFixed(2) * 100}%`}
						{delta < 0 && `${(1 - delta / pastSum).toFixed(2) * 100}%`}
					</Typography>
					{!isNaN(pastSum) && (
						<Typography color='textSecondary' variant='caption'>
							From last year
						</Typography>
					)}
					{isNaN(pastSum) && (
						<Typography color='textSecondary' variant='caption'>
							No Data Found
						</Typography>
					)}
				</Box>
			</CardContent>
		</Card>
	);
};
