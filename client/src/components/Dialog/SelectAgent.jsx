import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

import { useSelector } from 'react-redux';

export default function SelectAgent(props) {
	const { onClose, selectedValue, open } = props;

	const app = useSelector((state) => state.app.value);
	const property = useSelector((state) => state.property.value);

	const handleClose = () => props.onClose(selectedValue);
	const handleListItemClick = (value) => onClose(value);

	return (
		<Dialog onClose={handleClose} open={open}>
			<DialogTitle>Add Watcher</DialogTitle>
			<List sx={{ pt: 0 }}>
				{props.options.map((agent) => (
					<ListItem
						button
						onClick={() => handleListItemClick(agent)}
						key={'agent'}>
						<ListItemAvatar>
							<Avatar src={agent.picture} alt='watcher' />
						</ListItemAvatar>
						<ListItemText primary={agent.name} />
					</ListItem>
				))}
			</List>
		</Dialog>
	);
}
