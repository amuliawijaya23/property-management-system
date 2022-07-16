import { TableRow, TableCell, Checkbox, Typography, Avatar, Tooltip, Chip } from '@mui/material';
import { useSelector } from 'react-redux';
import format from 'date-fns/format';

export default function TaskRow({ row, index, isItemSelected, labelId, handleClick, handleOpen }) {
	const user = useSelector((state) => state.user.value);
	const app = useSelector((state) => state.app.value);
	const color = (() => {
		switch (row?.status) {
			case 'Open':
				return 'primary';

			case 'Canceled':
				return 'error';

			case 'Completed':
				return 'success';

			case 'Blocked':
				return 'warning';

			default:
				return 'default';
		}
	})();

	return (
		<TableRow id={`task-row-${index}`} aria-checked={isItemSelected} tabIndex={-1} key={row?.id} selected={isItemSelected}>
			{user.role === 'Master' && (
				<TableCell padding='checkbox'>
					<Checkbox color='primary' checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} onClick={handleClick} />
				</TableCell>
			)}
			<TableCell component='th' id={labelId} scope='row'>
				<Typography variant='button' sx={{ cursor: 'pointer' }} onClick={() => handleOpen(app?.tasks.find((task) => task?.id === row?.id))}>
					TASK-{row?.id}
				</Typography>
			</TableCell>
			<TableCell align='left'>
				{
					<Tooltip title={row?.agent?.name}>
						<Avatar src={row?.agent?.picture} />
					</Tooltip>
				}
			</TableCell>
			<TableCell align='left'>{row?.summary.length < 40 ? row.summary : `${row?.summary?.substring(0, 40)}...`}</TableCell>
			<TableCell align='left'>{row?.category}</TableCell>
			<TableCell align='left'>{format(new Date(row?.due_date), 'PPp')}</TableCell>
			<TableCell align='left'>
				<Chip label={row?.status} color={color} />
			</TableCell>
		</TableRow>
	);
}
