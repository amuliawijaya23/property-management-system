import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import NumberFormat from 'react-number-format';

import { useSelector } from 'react-redux';

export const TotalLease = (props) => {
	const dashboard = useSelector((state) => state.dashboard.value);
	const sum = dashboard?.lease?.current;
	const pastSum = dashboard?.lease?.past;
	const delta = sum - pastSum;
	const count = dashboard?.lease?.count;
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
							Lease
						</Typography>
						{sum > 0 && (
							<>
								<Typography color='textPrimary' variant='h6'>
									<NumberFormat
										value={sum}
										thousandSeparator={'.'}
										decimalScale={2}
										fixedDecimalScale={true}
										decimalSeparator={','}
										displayType='text'
										prefix='Rp '
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
							<CurrencyExchangeIcon />
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
						color={delta < 0 ? 'error' : 'success'}
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
