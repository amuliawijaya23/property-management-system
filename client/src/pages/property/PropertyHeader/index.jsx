import { useState } from 'react';
import { Grid, CardActions, Tooltip, Button, AvatarGroup, Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import AddWatcher from '../../../common/AddWatcher';

import { useSelector } from 'react-redux';

export default function PropertyHeader(props) {
	const app = useSelector((state) => state.app.value);
	const property = useSelector((state) => state.property.value);
	const seller = app.agents?.find((agent) => agent.user_id === property.details?.seller_id);

	const watchers = property.watchers.map((watcher) => watcher.user_id);
	const options = app.agents.filter((agent) => !watchers.includes(agent.user_id) && agent.user_id !== property.details.seller_id);

	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	return (
		<CardActions>
			<Grid container>
				<Grid item xs={6} container justifyContent='flex-start'>
					<Tooltip title={seller?.name}>
						<Avatar src={seller?.picture} alt='seller' />
					</Tooltip>
					<AvatarGroup sx={{ ml: 1 }}>
						{property.watchers.map((user) => {
							const watcher = app?.agents.find((agent) => agent?.user_id === user?.user_id);
							return (
								<Tooltip title={watcher?.name}>
									<Avatar src={watcher?.picture} alt='watcher' />
								</Tooltip>
							);
						})}
						<Tooltip title='Add Watcher'>
							<Avatar alt='add-watcher' sx={{ cursor: 'pointer' }} onClick={handleClickOpen}>
								<AddIcon />
							</Avatar>
						</Tooltip>
					</AvatarGroup>
					<AddWatcher open={open} onClose={handleClose} />
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
