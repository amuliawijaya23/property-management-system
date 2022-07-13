import { useState } from 'react';

import { Box, Grid, TextField, InputAdornment, Button } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

export default function TableSearch(props) {
	const [search, setSearch] = useState('');

	return (
		<Grid container spacing={1}>
			<Grid item xs={12} md={6}>
				<Box width='100%' sx={{ display: 'flex', alignItems: 'center' }}>
					<TextField
						fullWidth
						size='small'
						variant='outlined'
						placeholder='Search...'
						value={search}
						onChange={(event) => setSearch(event.target.value)}
						sx={{ ml: '0.25rem', mr: '0.25rem' }}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<SearchIcon />
								</InputAdornment>
							)
						}}
					/>
					<Button sx={{ mr: 1 }} variant='contained'>
						Search
					</Button>
				</Box>
			</Grid>
		</Grid>
	);
}
