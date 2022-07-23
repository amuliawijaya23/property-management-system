import { TableCell, LinearProgress, Avatar, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import NumberFormat from 'react-number-format';

const steps = ['Open', 'Offer Accepted', 'Deposit Received', 'Closing', 'Closed'];

export default function PropertyRow({ row, labelId }) {
	const stepIndex = steps.indexOf(row.status);
	const progress = (() => (stepIndex === 0 ? 0 : (stepIndex + 1) * 20))();

	const color = (() => {
		switch (row?.status) {
			case 'Open':
				return 'primary';

			case 'Offer Accepted':
				return 'warning';

			case 'Deposit Received':
				return 'secondary';

			case 'Closing':
				return 'info';

			case 'Closed':
				return 'success';

			case 'Contract Active':
				return 'sucess';

			case 'Contract Canceled':
				return 'error';

			default:
				return 'default';
		}
	})();

	return (
		<>
			<TableCell component='th' id={labelId} scope='row' padding='checkbox'>
				<Link to={`/property/${row.id}`}>LIST-{row.id}</Link>
			</TableCell>
			<TableCell align='left'>
				<Tooltip title={row?.agent?.name}>
					<Avatar src={row?.agent?.picture} />
				</Tooltip>
			</TableCell>
			<TableCell align='left'>{row?.service_type}</TableCell>
			<TableCell align='left' sx={{ minWidth: 175 }}>
				{row?.status}
				<LinearProgress variant='determinate' value={progress} color={color} />
			</TableCell>
			<TableCell align='left'>{formatDistanceToNowStrict(new Date(row?.updated_at), { addSuffix: true })}</TableCell>
			<TableCell align='left'>{formatDistanceToNowStrict(new Date(row?.created_at), { addSuffix: true })}</TableCell>
			<TableCell align='left' sx={{ minWidth: 175 }}>
				<NumberFormat isNumericString displayType='text' value={row?.valuation} thousandSeparator=',' decimalSeparator='.' decimalScale={2} fixedDecimalScale={true} prefix='$ ' />
			</TableCell>
			<TableCell align='left' sx={{ minWidth: 300 }}>
				{row?.address}
			</TableCell>
			<TableCell align='left' sx={{ minWidth: 300 }}>
				{row?.title}
			</TableCell>
			<TableCell align='left'>{row?.property_type}</TableCell>
			<TableCell align='left'>{row?.number_of_bedrooms}</TableCell>
			<TableCell align='left'>{row?.number_of_bathrooms}</TableCell>
			<TableCell align='left'>{row?.parking_space}</TableCell>
		</>
	);
}
