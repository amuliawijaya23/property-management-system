import { Box, Button, Card, CardContent, CardHeader, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { Chart as ChartJS, registerables, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

import useVisualMode from '../../../hooks/useVisualMode';
import { LINE, BAR } from '../../../helpers/modes';

ChartJS.register(...registerables, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const TransactionGraph = () => {
	const dashboard = useSelector((state) => state.dashboard.value);
	const currentData = dashboard?.graph?.current?.map((d) => parseInt(d.sum));
	const pastData = dashboard?.graph?.past?.map((d) => parseInt(d.sum));

	const { mode, transition } = useVisualMode(LINE);

	const clickHandler = () => {
		mode === BAR ? transition(LINE) : transition(BAR);
	};

	const options = {
		responsive: true,
		interaction: {
			mode: 'index',
			intersect: false
		},
		stacked: false,
		plugins: {
			title: {
				display: true,
				text: 'Chart.js Line Chart - Multi Axis'
			}
		},
		scales: {
			y: {
				type: 'linear',
				display: true,
				position: 'left'
			},
			y1: {
				type: 'linear',
				display: true,
				position: 'right',
				grid: {
					drawOnChartArea: false
				}
			}
		}
	};

	const labels = dashboard?.graph?.label;
	const data = {
		labels,
		datasets: [
			{
				label: 'Current',
				barPercentage: 0.5,
				barThickness: 12,
				borderRadius: 4,
				categoryPercentage: 0.5,
				maxBarThickness: 10,
				data: [...currentData],
				borderColor: '#2196f3',
				backgroundColor: '#2196f3',
				yAxisID: 'y'
			},
			{
				label: 'Past',
				barPercentage: 0.5,
				barThickness: 12,
				borderRadius: 4,
				categoryPercentage: 0.5,
				maxBarThickness: 10,
				data: [...pastData],
				borderColor: '#607d8b',
				backgroundColor: '#607d8b',
				yAxisID: 'y1'
			}
		]
	};

	return (
		<Card>
			<CardHeader title='Transactions By Date' titleTypographyProps={{ variant: 'captions' }} action={<Button onClick={clickHandler}>{mode === BAR ? 'LINE' : 'BAR'}</Button>} />
			<Divider />
			<CardContent>
				<Box
					sx={{
						height: 500,
						position: 'relative'
					}}>
					{mode === BAR && <Bar data={data} options={options} />}
					{mode === LINE && <Line options={options} data={data} />}
				</Box>
			</CardContent>
		</Card>
	);
};
