import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HomeIcon from '@mui/icons-material/Home';
import ContactsIcon from '@mui/icons-material/Contacts';
import HelpIcon from '@mui/icons-material/Help';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

import { useNavigate } from 'react-router-dom';

const drawerItems = [
	'Dashboard',
	'Listings',
	'Tasks',
	'Contacts',
	'Communications'
];

export default function DrawerList(props) {
	const navigate = useNavigate();

	const clickHandlers = (i) => {
		const path = ['/', '/properties', '/tasks', '/contacts', '/communications'];
		navigate(path[i]);
	};

	return (
		<Box
			sx={{ width: 250 }}
			role='presentation'
			onClick={props.toggleDrawer(false)}
			onKeyDown={props.toggleDrawer(false)}>
			<List>
				{drawerItems.map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton onClick={() => clickHandlers(index)}>
							<ListItemIcon>
								{text === 'Dashboard' && <DashboardIcon />}
								{text === 'Listings' && <HomeIcon />}
								{text === 'Tasks' && <AssignmentIcon />}
								{text === 'Contacts' && <ContactsIcon />}
								{text === 'Communications' && <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{['Agents', 'Help'].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemIcon>
								{index % 2 === 0 ? <PersonIcon /> : <HelpIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);
}