import { AvatarGroup, Avatar, Tooltip, Typography } from '@mui/material';

import { useSelector } from 'react-redux';

export default function SelectAgent(props) {
	const { selected, agent, assignAgent } = props;

	const selectedStyle = (() => {
		if (selected) {
			return { border: 'solid 2px' };
		} else {
			return {};
		}
	})();

	return (
		<Tooltip title={agent.name}>
			<Avatar alt='agent' src={agent.picture} onClick={() => assignAgent(agent.user_id)} sx={{ cursor: 'pointer' }} style={selectedStyle} />
		</Tooltip>
	);
}
