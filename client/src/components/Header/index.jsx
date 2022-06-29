import { useState } from 'react';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import DrawerList from './DrawerList';
import NavAppBar from './NavAppBar';

export default function Header(props) {
	const [anchorEl, setAnchorEl] = useState(false);

	const toggleDrawer = (anchor) => (event) => {
		if (
			event &&
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}
		setAnchorEl(anchor);
	};

	return (
		<header className='App__header'>
			<NavAppBar
				className='App__bar'
				openDrawer={toggleDrawer(true)}
				logout={props.logout}
				loginWithRedirect={props.loginWithRedirect}
			/>
			<SwipeableDrawer
				anchor='left'
				open={anchorEl}
				onClose={toggleDrawer(false)}
				onOpen={toggleDrawer(true)}>
				<DrawerList toggleDrawer={toggleDrawer} />
			</SwipeableDrawer>
		</header>
	);
}
