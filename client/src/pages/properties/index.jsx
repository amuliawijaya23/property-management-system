import './styles.scss';

import Box from '@mui/material/Box';
import EnhancedTable from '../../common/Table';
import ListingForm from './Form';

import usePropertiesData from './hooks/usePropertiesData';

import { Routes, Route } from 'react-router-dom';

export default function Properties() {
	const { resetPropertiesData, resetPropertiesRow, updatePropertiesTableData } = usePropertiesData();

	return (
		<Box width={'100%'} mt={2}>
			<Routes>
				<Route path={'/'} element={<EnhancedTable resetData={resetPropertiesData} resetRow={resetPropertiesRow} updateTableData={updatePropertiesTableData} />} />
				<Route path={'/new'} element={<ListingForm />} />
			</Routes>
		</Box>
	);
}
