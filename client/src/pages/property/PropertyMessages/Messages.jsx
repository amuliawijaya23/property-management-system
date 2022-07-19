import { Grid, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';

import { useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';

export default function Messages({ message }) {
	const app = useSelector((state) => state?.app?.value);
	const sender = app.agents?.find((agent) => agent?.user_id === message?.sender_id);

	return (
		<ListItem>
			<Grid container spacing={1}>
				<Grid item container justifyContent='flex-start' alignItems='center'>
					<ListItemAvatar>
						<Avatar alt='agent' src={sender?.picture} />
					</ListItemAvatar>
					<ListItemText sx={{ mr: 2 }} primary={sender?.name} secondary={formatDistanceToNowStrict(new Date(message?.created_at), { addSuffix: true })} />
				</Grid>
				<Grid item xs={12}>
					{ReactHtmlParser(message?.message)}
				</Grid>
			</Grid>
		</ListItem>
	);
}
