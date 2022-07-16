import { TableRow, TableCell, Checkbox, Typography, Avatar, Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';

export default function ContactRow({ row, index, isItemSelected, labelId, handleClick, handleOpen }) {
	const user = useSelector((state) => state.user.value);
	const app = useSelector((state) => state.app.value);

	return (
		<TableRow id={`contact-row-${index}`} aria-checked={isItemSelected} tabIndex={-1} key={row.id} selected={isItemSelected}>
			{user.role === 'Master' && (
				<TableCell padding='checkbox'>
					<Checkbox color='primary' checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} onClick={handleClick} />
				</TableCell>
			)}
			<TableCell component='th' id={labelId} scope='row'>
				<Typography variant='button' sx={{ cursor: 'pointer' }} onClick={() => handleOpen(app?.contacts.find((contact) => contact.id === row.id))}>
					CON-{row.id}
				</Typography>
			</TableCell>
			<TableCell align='left'>
				{
					<Tooltip title={row?.agent?.name}>
						<Avatar src={row?.agent?.picture} />
					</Tooltip>
				}
			</TableCell>
			<TableCell align='left'>{row?.name?.length < 40 ? row.name : `${row.name.substring(0, 40)}...`}</TableCell>
			<TableCell align='left'>{row?.email}</TableCell>
			<TableCell align='left'>{row?.mobile}</TableCell>
		</TableRow>
	);
}
