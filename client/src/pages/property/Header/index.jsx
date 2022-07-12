import './styles.scss';
import CardActions from '@mui/material/CardActions';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';

import { useSelector } from 'react-redux';

export default function PropertyHeader(props) {
	const app = useSelector((state) => state.app.value);
	const property = useSelector((state) => state.property.value);
	const seller = app.agents?.find((agent) => agent.user_id === property.details?.seller_id);

	const watchers = property.watchers.map((watcher) => watcher.user_id);
	const options = app.agents.filter((agent) => !watchers.includes(agent.user_id) && agent.user_id !== property.details.seller_id);

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
				</AvatarGroup>
			</div>
			<div className='property-item__actions-section'>
				<Button variant='text' size='large' onClick={props.handleClickOpen}>
					Update
				</Button>
			</div>
		</CardActions>
	);
}
