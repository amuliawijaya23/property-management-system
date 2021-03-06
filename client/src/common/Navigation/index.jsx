import { useState } from 'react';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import DrawerList from './DrawerList';
import NavBar from './NavBar';

export default function Navigation({ logout }) {
	const [anchorEl, setAnchorEl] = useState(false);

	const toggleDrawer = (anchor) => (event) => {
		if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		setAnchorEl(anchor);
	};

	return (
		<>
			<NavBar openDrawer={toggleDrawer(true)} logout={logout} />
			<SwipeableDrawer anchor='left' open={anchorEl} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
				<DrawerList toggleDrawer={toggleDrawer} />
			</SwipeableDrawer>
		</>
	);
}
