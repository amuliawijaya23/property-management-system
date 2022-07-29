import {
	Box,
	Grid,
	CardActions,
	Tooltip,
	Button,
	AvatarGroup,
	Avatar,
	Popover,
	List,
	ListItem,
	ListItemText,
	Divider
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import AddWatcher from '../../../common/AddWatcher';
import AssignAgent from '../../../common/AssignAgent';
import PropertyWatchers from '../PropertyWatchers';
import OfferForm from '../OfferForm';
import TransactionForm from '../../../common/TransactionForm';
import FormAlert from '../../../common/FormAlert';

import usePropertyHeader from '../hooks/usePropertyHeader';

import { useSelector } from 'react-redux';

export default function PropertyHeader({ onOpen }) {
	const app = useSelector((state) => state.app.value);
	const property = useSelector((state) => state.property.value);
	const agent = app.agents?.find((agent) => agent.user_id === property.details?.agent_id);
	const watchers = property?.watchers?.map((watcher) => watcher.user_id);
	const options = app.agents.filter(
		(agent) => !watchers.includes(agent.user_id) && agent.user_id !== property.details.agent_id
	);
	const {
		state,
		updateOptions,
		handleClickOpen,
		handleClose,
		open,
		updateHandler,
		alert,
		severity,
		openAlert,
		setAlert,
		setSeverity,
		setOpenAlert,
		closeAlert
	} = usePropertyHeader();

	return (
		<CardActions>
			<Grid container>
				<Grid item xs={6} container justifyContent='flex-start'>
					<Tooltip title={agent?.name || ''}>
						<Avatar
							src={agent?.picture}
							alt='agent'
							onClick={handleClickOpen('agent')}
							sx={{ cursor: 'pointer' }}
						/>
					</Tooltip>
					<AvatarGroup sx={{ ml: 1, cursor: 'pointer' }}>
						{property.watchers
							.filter((watcher) => watcher.user_id !== property?.details?.agent_id)
							.map((user, i) => {
								const watcher = app?.agents.find((agent) => agent?.user_id === user?.user_id);
								return (
									<Tooltip key={`watcher-${i}`} title={watcher?.name || ''}>
										<Avatar
											src={watcher?.picture}
											alt='watcher'
											onClick={handleClickOpen('watchers')}
										/>
									</Tooltip>
								);
							})}
						{options.length > 0 && (
							<Tooltip title='Add Watcher'>
								<Avatar
									alt='add-watcher'
									sx={{ cursor: 'pointer' }}
									onClick={handleClickOpen('watcher')}>
									<AddIcon />
								</Avatar>
							</Tooltip>
						)}
					</AvatarGroup>
					<AddWatcher open={open('watcher')} onClose={handleClose} />
					<AssignAgent open={open('agent')} onClose={handleClose} />
					<PropertyWatchers open={open('watchers')} onClose={handleClose} />
				</Grid>
				<Grid item xs={6} container justifyContent='flex-end'>
					<Button variant='text' size='large' onClick={handleClickOpen('anchorEl')}>
						Update
					</Button>
					<Button variant='text' size='large' onClick={onOpen}>
						Edit
					</Button>
					<Popover
						sx={{ minWidth: 200 }}
						id={'update-status'}
						anchorEl={state?.anchorEl}
						open={open('anchorEl')}
						onClose={handleClose}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'left'
						}}>
						<List>
							{updateOptions?.map((name, i) => (
								<Box key={`status-menu-box-${i}`}>
									<ListItem
										key={`status-update-menu-${i}`}
										button
										onClick={(e) => updateHandler(e, name)}>
										<ListItemText primary={name} />
									</ListItem>
									{i !== updateOptions?.length - 1 && <Divider />}
								</Box>
							))}
						</List>
					</Popover>
				</Grid>
			</Grid>
			<OfferForm
				open={open('offer')}
				onClose={handleClose}
				setAlert={setAlert}
				setOpenAlert={setOpenAlert}
				setSeverity={setSeverity}
			/>
			<TransactionForm
				open={open('transaction')}
				onClose={handleClose}
				listingId={property?.details?.id}
				transaction={{ transaction_type: 'Deposit' }}
			/>
			<FormAlert open={openAlert} message={alert} onClose={closeAlert} severity={severity} />
		</CardActions>
	);
}
