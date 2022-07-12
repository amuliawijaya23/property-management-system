import './styles.scss';

import { useState } from 'react';

import Box from '@mui/material/Box';
import EnhancedTable from '../../common/Table';
import PropertyForm from '../../common/PropertyForm';

import usePropertiesData from './hooks/usePropertiesData';

export default function Properties() {
	const { resetPropertiesData, resetPropertiesRow, updatePropertiesTableData } = usePropertiesData();

	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	return (
		<Box width={'100%'} mt={2}>
			<EnhancedTable resetData={resetPropertiesData} resetRow={resetPropertiesRow} updateTableData={updatePropertiesTableData} handleOpen={handleClickOpen} />
			<PropertyForm open={open} onClose={handleClose} />
		</Box>
	);
}
