import { TableRow, TableCell, Checkbox, Typography, Avatar, Tooltip, Chip } from '@mui/material';
import { useSelector } from 'react-redux';
import format from 'date-fns/format';
import NumberFormat from 'react-number-format';

export default function TransactionRow({ row, index, isItemSelected, labelId, handleClick, handleOpen }) {
	const user = useSelector((state) => state.user.value);
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
		<TableRow id={`transaction-row-${index}`} aria-checked={isItemSelected} tabIndex={-1} key={row.id} selected={isItemSelected}>
			{user.role === 'Master' && (
				<TableCell padding='checkbox'>
					<Checkbox color='primary' checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} onClick={(event) => handleClick(event, row.id)} />
				</TableCell>
			)}
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
		</TableRow>
	);
}
