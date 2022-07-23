import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

import { useSelector } from 'react-redux';

const colours = ['#673ab7', '#2196f3', '#e53935', '#26a69a', '#607d8b'];

export const TransactionGraphType = (props) => {
	const dashboard = useSelector((state) => state.dashboard.value);
	const theme = useTheme();
	const stream = dashboard?.stream?.current;
	const sale = dashboard?.sale?.current;
	const lease = dashboard?.lease?.current;

	const current = {
		data: [sale, lease],
		labels: ['Sale', 'Lease']
	};

	const data = {
		datasets: [
			{
				data: current?.data,
				backgroundColor: colours,
				borderWidth: 2,
				borderColor: '#FFFFFF',
				hoverBorderColor: '#FFFFFF'
			}
		],
		labels: current?.labels
	};

	const options = {
		animation: false,
		cutoutPercentage: 80,
		layout: { padding: 0 },
		legend: {
			display: false
		},
		maintainAspectRatio: false,
		responsive: true,
		tooltips: {
			backgroundColor: theme.palette.background.paper,
			bodyFontColor: theme.palette.text.secondary,
			borderColor: theme.palette.divider,
			borderWidth: 1,
			enabled: true,
			footerFontColor: theme.palette.text.secondary,
			intersect: false,
			mode: 'index',
			titleFontColor: theme.palette.text.primary
		}
	};

	const types = current?.data.map((d, i) => ({
		value: ((parseInt(d) / parseInt(stream)) * 100).toFixed(1),
		icon: i === 0 ? MonetizationOnIcon : CurrencyExchangeIcon,
		color: colours[i]
	}));

	return (
		<Card {...props}>
			<CardHeader title='Transactions By Type' titleTypographyProps={{ variant: 'captions' }} />
			<Divider />
			<CardContent sx={{ height: 350 }}>
				<Box
					sx={{
						height: '100%',
						position: 'relative',
						py: 1,
						mt: 2
					}}>
					{(!isNaN(current?.data[0]) || !isNaN(current?.data[1])) && <Doughnut data={data} options={options} />}
					{!current?.data[0] && !current?.data[1] && (
						<Typography component='div' color='textPrimary' variant='h6' sx={{ textAlign: 'center', mb: 10 }}>
							No Data Found
						</Typography>
					)}
				</Box>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						pt: 1
					}}>
					{types.map(({ color, icon: Icon, value }, index) => (
						<Box
							key={`dashboard-graph-type-${index}`}
							sx={{
								display: 'flex',
								flexDirection: 'column',
								textAlign: 'center',
								justifyContent: 'center',
								alignItems: 'center',
								p: 1
							}}>
							<Icon color='action' />
							<Typography style={{ color }} variant='body1'>
								{isNaN(value) ? 'No Data' : `${value}%`}
							</Typography>
						</Box>
					))}
				</Box>
				{/* )} */}
			</CardContent>
		</Card>
	);
};
