import { TableCell, Typography, Avatar, Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';

export default function ContactRow({ row, labelId, handleOpen }) {
	const app = useSelector((state) => state.app.value);

	return (
		<>
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
		</>
	);
}
