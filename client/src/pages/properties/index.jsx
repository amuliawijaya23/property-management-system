import { useState } from 'react';

import Box from '@mui/material/Box';
import EnhancedTable from '../../common/Table';
import PropertyForm from '../../common/PropertyForm';

import usePropertiesData from './hooks/usePropertiesData';

export default function Properties() {
	usePropertiesData();

	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	return (
		<Box width={'100%'} mt={2} mb={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<EnhancedTable handleOpen={handleClickOpen} defaultOrder='asc' defaultOrderBy='title' />
			<PropertyForm open={open} onClose={handleClose} />
		</Box>
	);
}
