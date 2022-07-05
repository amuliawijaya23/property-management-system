import * as React from 'react';

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HomeIcon from '@mui/icons-material/Home';
import ContactsIcon from '@mui/icons-material/Contacts';

import { useNavigate } from 'react-router-dom';

const actions = [
	{ icon: <HomeIcon />, name: 'Properties' },
	{ icon: <AssignmentIcon />, name: 'Tasks' },
	{ icon: <ContactsIcon />, name: 'Contacts' }
];

export default function BasicSpeedDial(props) {
	const navigate = useNavigate();

	return (
		<SpeedDial ariaLabel='SpeedDial basic example' sx={{ position: 'fixed', right: 15, bottom: 15 }} icon={<SpeedDialIcon />}>
			{actions.map((action) => (
				<SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={() => navigate(`/${action.name.toLocaleLowerCase()}/new`)} />
			))}
		</SpeedDial>
	);
}
