import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import UserDrawer from './UserDrawer';
import PropertyList from '../PropertyList';

import Property from '../Property';

import { Routes, Route, useNavigate } from 'react-router';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	})
}));

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar
}));

export default function MiniDrawer() {
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	return <></>;
}
