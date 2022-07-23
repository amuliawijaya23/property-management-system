import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HomeIcon from '@mui/icons-material/Home';
import ContactsIcon from '@mui/icons-material/Contacts';
import HelpIcon from '@mui/icons-material/Help';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaidIcon from '@mui/icons-material/Paid';

import { useNavigate } from 'react-router-dom';

const drawerItems = ['Dashboard', 'Properties', 'Transactions', 'Tasks', 'Contacts', 'Outreach'];

export default function DrawerList(props) {
	const navigate = useNavigate();

	const clickHandlers = (i) => {
		const path = ['/', '/properties', '/transactions', '/tasks', '/contacts', '/outreach'];
		navigate(path[i]);
	};

	return (
		<Box sx={{ width: 250 }} role='presentation' onClick={props.toggleDrawer(false)} onKeyDown={props.toggleDrawer(false)}>
			<List>
				{drawerItems.map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton onClick={() => clickHandlers(index)}>
							<ListItemIcon>
								{text === 'Dashboard' && <DashboardIcon />}
								{text === 'Properties' && <HomeIcon />}
								{text === 'Transactions' && <PaidIcon />}
								{text === 'Tasks' && <AssignmentIcon />}
								{text === 'Contacts' && <ContactsIcon />}
								{text === 'Outreach' && <MailIcon />}
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
							<ListItemIcon>{index % 2 === 0 ? <PersonIcon /> : <HelpIcon />}</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);
}
