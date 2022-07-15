import { useState } from 'react';
import { Grid, CardActions, Tooltip, Button, AvatarGroup, Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import AddWatcher from '../../../common/AddWatcher';
import AssignAgent from '../../../common/AssignAgent';
import PropertyWatchers from '../PropertyWatchers';

import { useSelector } from 'react-redux';

export default function PropertyHeader(props) {
	const app = useSelector((state) => state.app.value);
	const property = useSelector((state) => state.property.value);
	const agent = app.agents?.find((agent) => agent.user_id === property.details?.agent_id);
	const watchers = property?.watchers?.map((watcher) => watcher.user_id);

	const options = app.agents.filter((agent) => !watchers.includes(agent.user_id) && agent.user_id !== property.details.agent_id);

	const close = {
		watcher: false,
		agent: false,
		watchers: false
	};

	const [open, setOpen] = useState(close);

	const handleClose = (input) => {
		setOpen(close);
	};

	const handleClickOpen = (assign) => {
		let state = { ...open };
		state[assign] = true;
		setOpen(state);
	};

	return (
		<CardActions>
			<Grid container>
				<Grid item xs={6} container justifyContent='flex-start'>
					<Tooltip title={agent?.name}>
						<Avatar src={agent?.picture} alt='agent' onClick={() => handleClickOpen('agent')} sx={{ cursor: 'pointer' }} />
					</Tooltip>
					<AvatarGroup sx={{ ml: 1, cursor: 'pointer' }}>
						{property.watchers
							.filter((watcher) => watcher.user_id !== property?.details?.agent_id)
							.map((user) => {
								const watcher = app?.agents.find((agent) => agent?.user_id === user?.user_id);
								return (
									<Tooltip title={watcher?.name}>
										<Avatar src={watcher?.picture} alt='watcher' onClick={() => handleClickOpen('watchers')} />
									</Tooltip>
								);
							})}
						{options.length > 0 && (
							<Tooltip title='Add Watcher'>
								<Avatar alt='add-watcher' sx={{ cursor: 'pointer' }} onClick={() => handleClickOpen('watcher')}>
									<AddIcon />
								</Avatar>
							</Tooltip>
						)}
					</AvatarGroup>
					<AddWatcher open={open.watcher} onClose={handleClose} />
					<AssignAgent open={open.agent} onClose={handleClose} />
					<PropertyWatchers open={open.watchers} onClose={handleClose} />
				</Grid>
				<Grid item xs={6} container justifyContent='flex-end'>
					<Button variant='text' size='large' onClick={props.handleClickOpen}>
						Update
					</Button>
				</Grid>
			</Grid>
		</CardActions>
	);
}
