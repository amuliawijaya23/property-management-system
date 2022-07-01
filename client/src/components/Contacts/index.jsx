import './styles.scss';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import EnhancedTable from '../Table';

import Form from '../Form';

import useContactsData from '../../hooks/useContactsData';

import { Routes, Route, useNavigate } from 'react-router';

export default function Contacts() {
	const app = useSelector((state) => state.app.value);
	const table = useSelector((state) => state.table.value);
	const [search, setSearch] = useState('');

	const { resetContactsData, resetContactsRow, updateContactsTableData } = useContactsData();

	const navigate = useNavigate();

	return (
		<Box width={'100%'} mt={2}>
			<div className='listing-browser'>
				<div className='listing-browser__navigation'>
					<Button variant='text' onClick={() => navigate('/properties/new')}>
						New
					</Button>
				</div>
				<div className='listing-browser__search'>
					<TextField
						className='search-bar'
						size='small'
						variant='outlined'
						placeholder='Search...'
						value={search}
						onChange={(event) => setSearch(event.target.value)}
						sx={{ ml: '0.25rem', mr: '0.25rem' }}
						fullWidth
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<SearchIcon />
								</InputAdornment>
							)
						}}
					/>
					<Button variant='contained'>Search</Button>
				</div>
			</div>
			<Routes>
				<Route path='/new' element={<Form />} />
				<Route path={'/'} element={<EnhancedTable resetData={resetContactsData} resetRow={resetContactsRow} updateTableData={updateContactsTableData} />} />
			</Routes>
		</Box>
	);
}
