import axios from 'axios';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

import TaskPanel from '../../../common/Task';

import { useSelector } from 'react-redux';
import { ListItemAvatar } from '@mui/material';

import format from 'date-fns/format';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';

export default function PropertyTasks() {
	const app = useSelector((state) => state.app.value);
	const property = useSelector((state) => state.property.value);

	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState(null);

	const selectTask = (task) => {
		setSelected({ ...task });
		setOpen(true);
	};

	const handleClose = () => {
		setSelected(null);
		setOpen(false);
	};

	return (
		<Box sx={{ width: '100%' }}>
			<List>
				<ListSubheader component='div'>Tasks</ListSubheader>
				{property.tasks.map((task, i) => {
					const agent = app.agents.find((user) => user.user_id === task.agent_id);
					const color = (() => {
						switch (task.status) {
							case 'Open':
								return 'primary';

							case 'Active':
								return 'primary';

							case 'Blocked':
								return 'error';

							case 'Overdue':
								return 'warning';

							case 'Closed':
								return 'success';

							case 'Canceled':
								return 'default';

							default:
								return;
						}
					})();

					return (
						<>
							<ListItem key={`listing-task-${i}`} sx={{ cursor: 'pointer' }} onClick={() => selectTask(task)}>
								<ListItemAvatar>
									<Avatar src={agent.picture} alt='agent' />
								</ListItemAvatar>
								<ListItemText
									primary={`TASK-${task.id} - ${task.summary}`}
									secondary={`${task.status} - Due ${formatDistanceToNowStrict(new Date(task.due_date), { addSuffix: true })} - ${format(new Date(task.due_date), 'PPpp')}`}
								/>
							</ListItem>
							<Divider />
						</>
					);
				})}
			</List>
			<TaskPanel open={open} onClose={handleClose} task={selected} />
		</Box>
	);
}
