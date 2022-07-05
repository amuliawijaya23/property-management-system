import './styles.scss';

import Box from '@mui/material/Box';
import EnhancedTable from '../../common/Table';

import useTasksData from './hooks/useTasksData';

import { Routes, Route } from 'react-router-dom';

export default function Tasks() {
	const { resetTasksData, resetTasksRow, updateTasksTableData } = useTasksData();

	return (
		<Box width={'100%'} mt={2}>
			<Routes>
				<Route path={'/'} element={<EnhancedTable resetData={resetTasksData} resetRow={resetTasksRow} updateTableData={updateTasksTableData} />} />
				<Route path={'/new'} element={<></>} />
			</Routes>
		</Box>
	);
}
