import { AppBar, Box, Toolbar, IconButton, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { useSelector } from 'react-redux';

export default function NavBar({ logout, openDrawer }) {
	const user = useSelector((state) => state.user.value);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='fixed'>
				<Toolbar>
					<IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }} onClick={openDrawer} disabled={!user.isAuthenticated}>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						ProperTee
					</Typography>
					{user?.isAuthenticated && (
						<Button onClick={() => logout({ returnTo: window.location.origin })} color='inherit'>
							Logout
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
}
