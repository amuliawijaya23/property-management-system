import './styles.scss';

import Box from '@mui/material/Box';
import EnhancedTable from '../../common/Table';
import ContactsForm from './Form';

import useContactsData from './hooks/useContactsData';

import { Routes, Route } from 'react-router-dom';

export default function Contacts() {
	const { resetContactsData, resetContactsRow, updateContactsTableData } = useContactsData();

	return (
		<Box width={'100%'} mt={2}>
			<Routes>
				<Route path={'/'} element={<EnhancedTable resetData={resetContactsData} resetRow={resetContactsRow} updateTableData={updateContactsTableData} />} />
				<Route path={'/new'} element={<ContactsForm />} />
			</Routes>
		</Box>
	);
}
