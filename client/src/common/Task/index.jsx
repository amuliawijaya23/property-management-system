import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import { Link } from 'react-router-dom';

export default function TaskPanel(props) {
	const { open, onClose, task } = props;

	return (
		<Drawer anchor='right' open={open} onClose={onClose} PaperProps={{ sx: { width: '75%' } }}>
			<Box sx={{ padding: 2 }}>
				<Typography variant='h6' component='h5'>
					TASK-{task?.id} - {task?.summary}
				</Typography>
			</Box>
		</Drawer>
	);
}
