import { TableCell, Typography, Avatar, Tooltip, Chip } from '@mui/material';
import { useSelector } from 'react-redux';
import format from 'date-fns/format';
import NumberFormat from 'react-number-format';

export default function TransactionRow({ row, labelId, handleOpen }) {
	const app = useSelector((state) => state.app.value);
	const color = (() => {
		switch (row?.status) {
			case 'Open':
				return 'primary';

			case 'Pending Confirmation':
				return 'warning';

			case 'Completed':
				return 'success';

			case 'Canceled':
				return 'error';

			default:
				return 'default';
		}
	})();

	return (
		<>
			<TableCell component='th' id={labelId} scope='row'>
				<Typography variant='button' sx={{ cursor: 'pointer' }} onClick={() => handleOpen(app?.transactions.find((transaction) => transaction.id === row.id))}>
					TRX-{row.id}
				</Typography>
			</TableCell>
			<TableCell align='left'>
				{
					<Tooltip title={row?.agent?.name}>
						<Avatar src={row?.agent?.picture} />
					</Tooltip>
				}
			</TableCell>
			<TableCell align='left'>{row.type}</TableCell>
			<TableCell align='left'>{format(new Date(row.start_date), 'PPp')}</TableCell>
			<TableCell align='left'>{format(new Date(row.end_date), 'PPp')}</TableCell>
			<TableCell align='left'>
				<Chip label={row.status} color={color} />
			</TableCell>
			<TableCell align='left'>
				{
					<NumberFormat
						value={row.amount}
						thousandSeparator={'.'}
						decimalScale={2}
						fixedDecimalScale={true}
						decimalSeparator={','}
						displayType='text'
						prefix='Rp '
						renderText={(value) => <>{value}</>}
					/>
				}
			</TableCell>
		</>
	);
}
