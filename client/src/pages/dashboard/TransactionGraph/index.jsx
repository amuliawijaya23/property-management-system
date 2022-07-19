import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export const TransactionGraph = () => {
	const dashboard = useSelector((state) => state.dashboard.value);
	const currentData = dashboard?.graph?.current?.map((d) => parseInt(d.sum));
	const pastData = dashboard?.graph?.past?.map((d) => parseInt(d.sum));

	const theme = useTheme();

	const data = {
		datasets: [
			{
				backgroundColor: '#2196f3',
				barPercentage: 0.5,
				barThickness: 12,
				borderRadius: 4,
				categoryPercentage: 0.5,
				data: [...currentData],
				label: 'This year',
				maxBarThickness: 10
			},
			{
				backgroundColor: '#607d8b',
				barPercentage: 0.5,
				barThickness: 12,
				borderRadius: 4,
				categoryPercentage: 0.5,
				data: [...pastData],
				label: 'Last year',
				maxBarThickness: 10
			}
		],
		labels: dashboard?.graph?.label
	};

	const options = {
		animation: false,
		cornerRadius: 20,
		layout: { padding: 0 },
		legend: { display: false },
		maintainAspectRatio: false,
		responsive: true,
		xAxes: [
			{
				ticks: {
					fontColor: theme.palette.text.secondary
				},
				gridLines: {
					display: false,
					drawBorder: false
				}
			}
		],
		yAxes: [
			{
				ticks: {
					fontColor: theme.palette.text.secondary,
					beginAtZero: true,
					min: 0
				},
				gridLines: {
					borderDash: [2],
					borderDashOffset: [2],
					color: theme.palette.divider,
					drawBorder: false,
					zeroLineBorderDash: [2],
					zeroLineBorderDashOffset: [2],
					zeroLineColor: theme.palette.divider
				}
			}
		],
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

	return (
		<Card>
			<CardHeader title='Transactions By Date' titleTypographyProps={{ variant: 'captions' }} />
			<Divider />
			<CardContent>
				<Box
					sx={{
						height: 400,
						position: 'relative'
					}}>
					<Bar data={data} options={options} />
				</Box>
			</CardContent>
			<Divider />
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'flex-end',
					p: 2
				}}>
				<Button color='primary' endIcon={<ArrowRightIcon fontSize='small' />} size='small'>
					Overview
				</Button>
			</Box>
		</Card>
	);
};
