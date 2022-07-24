import { Avatar, Tooltip } from '@mui/material';

export default function SelectAgent(props) {
	const { selected, agent, assignAgent, table } = props;

	const selectedStyle = (() => {
		if (selected) {
			return { transform: 'scale(1.25)', border: 'solid 1px #424242' };
		} else {
			return {};
		}
	})();

	const clickHandler = () => {
		assignAgent(table ? agent : agent?.user_id);
	};

	return (
		<Tooltip title={agent?.name}>
			<Avatar alt='agent' src={agent?.picture} onClick={clickHandler} sx={{ cursor: 'pointer' }} style={selectedStyle} />
		</Tooltip>
	);
}
