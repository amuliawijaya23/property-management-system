import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';

import { useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';

export default function Messages(props) {
	const app = useSelector((state) => state.app.value);
	const user = useSelector((state) => state.user.value);
	const sender = app.agents?.find((agent) => agent.user_id === props.message.sender_id);

	const direction = user.sub === props.message.sender_id ? 'row' : 'row-reverse';

	const alignment = user.sub === props.message.sender_id ? 'flex-start' : 'flex-end';

	const textAlign = user.sub === props.message.sender_id ? 'start' : 'end';

	return (
		<div>
			<ListItem className='message-component'>
				<section
					className='message-component__avatar'
					style={{
						flexDirection: `${direction}`,
						textAlign: `${textAlign}`
					}}>
					<ListItemAvatar>
						<Avatar alt='agent' src={sender?.picture} />
					</ListItemAvatar>
					<ListItemText sx={{ mr: 2 }} primary={sender?.name} secondary={props?.message?.created_at} />
				</section>
				<section className='message-component__content' style={{ alignItems: `${alignment}` }}>
					{ReactHtmlParser(props.message?.message)}
				</section>
			</ListItem>
		</div>
	);
}
