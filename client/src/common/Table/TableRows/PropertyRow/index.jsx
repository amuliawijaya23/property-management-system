import { TableRow, TableCell, Checkbox, LinearProgress, Avatar, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import NumberFormat from 'react-number-format';

const steps = ['Open', 'Offer Accepted', 'Deposit Received', 'Closing', 'Closed'];

export default function PropertyRow({ row, index, isItemSelected, labelId, handleClick }) {
	const user = useSelector((state) => state.user.value);

	const stepIndex = steps.indexOf(row.status);
	const progress = (() => (stepIndex === 0 ? 0 : (stepIndex + 1) * 20))();

	const color = (() => {
		switch (row?.status) {
			case 'Open':
				return 'primary';

			case 'Closing':
				return 'info';

			case 'Offer Accepted':
				return 'warning';

			case 'Deposit Received':
				return 'secondary';

			case 'Closed':
				return 'success';

			case 'Contract Active':
				return 'secondary';

			case 'Contract Canceled':
				return 'default';

			default:
				return 'default';
		}
	})();

	return (
		<TableRow key={`property-row-${index}`} id={`property-row-${index}`} aria-checked={isItemSelected} tabIndex={-1} selected={isItemSelected}>
			{user.role === 'Master' && (
				<TableCell padding='checkbox'>
					<Checkbox color='primary' checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} onClick={handleClick} />
				</TableCell>
			)}
			<TableCell component='th' id={labelId} scope='row' padding='checkbox'>
				<Link to={`/property/${row.id}`}>LIST-{row.id}</Link>
			</TableCell>
			<TableCell align='left'>
				<Tooltip title={row?.agent?.name}>
					<Avatar src={row?.agent?.picture} />
				</Tooltip>
			</TableCell>
			<TableCell align='left' width={175}>
				{row?.status}
				<LinearProgress variant='determinate' value={progress} color={color} />
			</TableCell>
			<TableCell align='left'>{formatDistanceToNowStrict(new Date(row?.updated_at), { addSuffix: true })}</TableCell>
			<TableCell align='left'>{formatDistanceToNowStrict(new Date(row?.created_at), { addSuffix: true })}</TableCell>
			<TableCell align='left' width={150}>
				<NumberFormat isNumericString displayType='text' value={row?.valuation} thousandSeparator='.' decimalSeparator=',' decimalScale={2} fixedDecimalScale={true} prefix='Rp ' />
			</TableCell>
			<TableCell align='left'>{row?.address}</TableCell>
			<TableCell align='left'>{row?.title}</TableCell>
			<TableCell align='left'>{row?.number_of_bedrooms}</TableCell>
			<TableCell align='left'>{row?.number_of_bathrooms}</TableCell>
			<TableCell align='left'>{row?.parking_space}</TableCell>
		</TableRow>
	);
}
