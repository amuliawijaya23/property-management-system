import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

export default function TableSearch(props) {
	const [search, setSearch] = useState('');

	const table = useSelector((state) => state.table.value);

	const navigate = useNavigate();

	return (
		<div className='table-browser'>
			<div className='table-browser__navigation'>
				<Button onClick={props.handleOpen} variant='text'>
					CREATE
				</Button>
			</div>
			<div className='table-browser__search'>
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
	);
}
