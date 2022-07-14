import { Avatar, Tooltip } from '@mui/material';

export default function SelectAgent(props) {
	const { selected, agent, assignAgent } = props;

	const selectedStyle = (() => {
		if (selected) {
			return { transform: 'scale(1.2)', border: 'solid 1px lightGrey' };
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
