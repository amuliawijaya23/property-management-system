import {
	Box,
	Modal,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Avatar,
	IconButton,
	ListSubheader
} from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useSelector } from 'react-redux';
import useRemoveWatcher from '../hooks/useRemoveWatcher';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4
};

export default function PropertyWatchers(props) {
	const user = useSelector((state) => state.user.value);
	const app = useSelector((state) => state.app.value);
	const property = useSelector((state) => state.property.value);
	const { removeWatcher } = useRemoveWatcher();

	const { open, onClose } = props;

	const onRemove = (input) => {
		removeWatcher(input);
		onClose();
	};

	return (
		<Modal open={open} onClose={onClose}>
			<Box sx={style}>
				<List sx={{ width: '100%' }} dense>
					<ListSubheader>{property?.watchers?.length} Watchers</ListSubheader>
					{property?.watchers.map((watcher, i) => {
						const agent = app.agents.find((agent) => agent.user_id === watcher.user_id);
						return (
							<ListItem
								key={`select-watcher${i}`}
								secondaryAction={
									user.sub === watcher.user_id && (
										<IconButton edge='end' onClick={() => onRemove(watcher)}>
											<RemoveCircleOutlineIcon />
										</IconButton>
									)
								}>
								<ListItemAvatar>
									<Avatar src={agent?.picture} alt='agent' />
								</ListItemAvatar>
								<ListItemText primary={agent?.name.split('-')[0]} secondary={agent?.email} />
							</ListItem>
						);
					})}
				</List>
			</Box>
		</Modal>
	);
}
