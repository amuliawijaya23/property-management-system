import { Box, Button, Card, CardContent, CardHeader, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { Chart as ChartJS, registerables, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

import useVisualMode from '../../../hooks/useVisualMode';
import { LINE, BAR } from '../../../helpers/modes';

ChartJS.register(...registerables, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const TransactionGraph = () => {
	const dashboard = useSelector((state) => state.dashboard.value);

	const salesData = dashboard?.graph?.sales?.map((d) => parseInt(d.sum));
	const leaseData = dashboard?.graph?.leases?.map((d) => parseInt(d.sum));

	const pastSalesData = dashboard?.graph?.pastSales?.map((d) => parseInt(d.sum));
	const pastLeasesData = dashboard?.graph?.leases?.map((d) => parseInt(d.sum));

	const { mode, transition } = useVisualMode(BAR);

	const clickHandler = () => {
		mode === BAR ? transition(LINE) : transition(BAR);
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		interaction: {
			mode: 'index',
			intersect: false
		},
		stacked: false,
		scales: {
			y: {
				type: 'linear',
				display: true,
				position: 'left'
			}
		}
	};

	const labels = dashboard?.graph?.label;
	const data = {
		labels,
		datasets: [
			{
				label: 'Sale',
				barPercentage: 0.5,
				barThickness: 12,
				borderRadius: 4,
				categoryPercentage: 0.5,
				maxBarThickness: 10,
				data: salesData,
				borderColor: '#673ab7',
				backgroundColor: '#673ab7',
				yAxisID: 'y'
			},
			{
				label: 'Lease',
				barPercentage: 0.5,
				barThickness: 12,
				borderRadius: 4,
				categoryPercentage: 0.5,
				maxBarThickness: 10,
				data: leaseData,
				borderColor: '#2196f3',
				backgroundColor: '#2196f3',
				yAxisID: 'y'
			},
			{
				label: 'Past Sales',
				barPercentage: 0.5,
				barThickness: 12,
				borderRadius: 4,
				categoryPercentage: 0.5,
				maxBarThickness: 10,
				data: pastSalesData,
				borderColor: '#d1c4e9',
				backgroundColor: '#d1c4e9',
				hidden: true,
				yAxisID: 'y'
			},
			{
				label: 'Past Leases',
				barPercentage: 0.5,
				barThickness: 12,
				borderRadius: 4,
				categoryPercentage: 0.5,
				maxBarThickness: 10,
				data: pastLeasesData,
				borderColor: '#bbdefb',
				backgroundColor: '#bbdefb',
				hidden: true,
				yAxisID: 'y'
			}
		]
	};

	return (
		<Card sx={{ height: '100%' }}>
			<CardHeader title='Transactions By Date' titleTypographyProps={{ variant: 'captions' }} action={<Button onClick={clickHandler}>{mode === BAR ? 'LINE' : 'BAR'}</Button>} />
			<Divider />
			<CardContent>
				<Box>
					{mode === BAR && <Bar data={data} options={options} style={{ minHeight: 400 }} />}
					{mode === LINE && <Line options={options} data={data} style={{ minHeight: 400 }} />}
				</Box>
			</CardContent>
		</Card>
	);
};
