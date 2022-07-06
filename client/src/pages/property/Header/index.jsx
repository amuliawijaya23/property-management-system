import './styles.scss';
import { useState } from 'react';
import CardActions from '@mui/material/CardActions';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import AddIcon from '@mui/icons-material/Add';
import SelectAgent from '../../../common/Dialog/SelectAgent';

import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

export default function PropertyHeader() {
	const navigate = useNavigate();
	const app = useSelector((state) => state.app.value);
	const property = useSelector((state) => state.property.value);
	const seller = app.agents?.find((agent) => agent.user_id === property.details?.seller_id);

	const watchers = property.watchers.map((watcher) => watcher.user_id);
	const options = app.agents.filter((agent) => !watchers.includes(agent.user_id) && agent.user_id !== property.details.seller_id);

	const [open, setOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState(options[0]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (value) => {
		setOpen(false);
		setSelectedValue(value);
	};

	return (
		<CardActions className='property-header'>
			<div className='property-header__section'>
				<AvatarGroup>
					<Tooltip title={seller?.name}>
						<Avatar src={seller?.picture} alt='seller' />
					</Tooltip>
					{watchers.map((user) => {
						const watcher = app?.agents.find((agent) => agent?.user_id === user);
						return (
							<Tooltip title={watcher?.name}>
								<Avatar src={watcher?.picture} alt='watcher' />
							</Tooltip>
						);
					})}
					<Avatar className='list-panel__add-watcher'>
						<AddIcon onClick={handleClickOpen} />
					</Avatar>
					<SelectAgent selectedValue={selectedValue} open={open} onClose={handleClose} options={options} waatchers={watchers} />
				</AvatarGroup>
			</div>
			<div className='property-item__actions-section'>
				<Button variant='text' size='large'>
					Tasks
				</Button>
				<Button variant='text' size='large'>
					Edit
				</Button>
			</div>
		</CardActions>
	);
}
