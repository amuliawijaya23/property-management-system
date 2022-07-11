import { useState } from 'react';

import Box from '@mui/material/Box';

import Divider from '@mui/material/Divider';

import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';

import { useSelector } from 'react-redux';
import { ListItemAvatar } from '@mui/material';

import format from 'date-fns/format';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';

export default function PropertyTasks() {
	const app = useSelector((state) => state.app.value);
	const property = useSelector((state) => state.property.value);

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
			</List>
		</Box>
	);
}
