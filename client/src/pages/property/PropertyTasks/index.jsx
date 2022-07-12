import { useState } from 'react';

import { Box, Divider, List, ListSubheader, ListItem, ListItemText, Chip, ListItemAvatar, Avatar, Button } from '@mui/material';
import TaskForm from '../../../common/TaskForm';

import { useSelector } from 'react-redux';

import format from 'date-fns/format';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';

export default function PropertyTasks() {
	const app = useSelector((state) => state.app.value);
	const property = useSelector((state) => state.property.value);

	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{ width: '100%' }}>
			<List>
				<ListSubheader component='div'>
					<Button onClick={handleOpen}>Add Task</Button>
				</ListSubheader>
				{property?.tasks?.map((task, i) => {
					const agent = app.agents.find((user) => user.user_id === task.agent_id);
					const color = (() => {
						switch (task.status) {
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
							<ListItem key={`listing-task-${i}`} button>
								<ListItemText
									primary={
										<>
											{task.category} - {task.summary}
										</>
									}
									secondary={
										<>
											<Chip label={task.status} color={color} sx={{ mr: 1 }} />
											Due {formatDistanceToNowStrict(new Date(task.due_date), { addSuffix: true })}, {format(new Date(task.due_date), 'PPpp')}
										</>
									}
								/>
								<ListItemAvatar>
									<Avatar src={agent.picture} alt='agent' />
								</ListItemAvatar>
							</ListItem>
							<Divider />
						</>
					);
				})}
				{property.tasks.length < 1 && (
					<ListItem>
						<ListItemText primary={`No task has been created for LIST-${property?.details?.id}`} secondary={'Click Add Task to create one!'} />
					</ListItem>
				)}
			</List>
			<TaskForm open={open} onClose={handleClose} listingId={property?.details?.id} />
		</Box>
	);
}
