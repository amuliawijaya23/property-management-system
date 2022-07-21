import { Box, Grid, TextField, InputAdornment, Button } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

import useTableSearch from '../hooks/useTableSearch';

export default function TableSearch(props) {
	const { searchData, search, setSearch } = useTableSearch();

	return (
		<Grid container spacing={1} justifyContent='flex-start'>
			<Grid item xs={12} md={6}>
				<Box width='100%' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
					<TextField
						fullWidth
						size='small'
						variant='outlined'
						placeholder='Search...'
						onChange={(event) => searchData(event.target.value)}
						sx={{ ml: '0.25rem', mr: '0.25rem' }}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<SearchIcon />
								</InputAdornment>
							)
						}}
					/>
				</Box>
			</Grid>
		</Grid>
	);
}
