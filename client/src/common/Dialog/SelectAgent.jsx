import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

export default function SelectAgent(props) {
	const { onClose, selectedValue, open } = props;

	const handleClose = () => props.onClose(selectedValue);
	const handleListItemClick = (value) => onClose(value);

	return (
		<Dialog onClose={handleClose} open={open}>
			<DialogTitle>Add Watcher</DialogTitle>
			<List sx={{ pt: 0 }}>
				{props.options.map((agent) => (
					<ListItem button onClick={() => handleListItemClick(agent)} key={'agent'}>
						<ListItemAvatar>
							<Avatar src={agent.picture} alt='watcher' />
						</ListItemAvatar>
						<ListItemText primary={agent.name.length < 30 ? agent.name : agent.name.substring(0, 30) + '...'} />
					</ListItem>
				))}
			</List>
		</Dialog>
	);
}
