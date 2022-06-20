import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';

import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import PersonIcon from '@mui/icons-material/Person';

export default function DrawerList(props) {

  const clickHandlers = (i) => {
    const mode = ['DASHBOARD', 'LISTINGS', 'FORM'];
    props.modeHandler(mode[i]);
  };

  return (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={props.toggleDrawer(false)}
      onKeyDown={props.toggleDrawer(false)}
    >
      <List>
        {['Dashboard', 'Listings', 'New Listing'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => clickHandlers(index)}
            >
              <ListItemIcon>
                {text === 'Dashboard' && <DashboardIcon />}
                {text === 'Listings' && <HomeIcon />}
                {text === 'New Listing' && <AddBusinessIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Agents', 'Contact Us'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <PersonIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}