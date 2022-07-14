import { useState } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';

import { Grid, Box, Toolbar, Typography, IconButton, Tooltip, Button } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

import TableSelect from '../TableSelect';
import TableSearch from '../TableSearch';

import { useSelector } from 'react-redux';

import useUpdateTable from '../hooks/useUpdateTable';

export default function EnhancedTableToolbar(props) {
	const { handleOpen } = props;
	const { updateTableData } = useUpdateTable();

	const table = useSelector((state) => state.table.value);

	const numSelected = table.selected.length;

	return (
		<Toolbar
			sx={{
				mt: 1,
				alignItems: 'center',
				...(numSelected > 0 && {
					bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
				})
			}}>
			<Grid container alignItems='center'>
				<Grid item xs={12} md={3}>
					<Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
						{numSelected < 1 && (
							<Tooltip title='Create'>
								<Button variant='text' onClick={() => handleOpen(null)} sx={{ m: 1 }}>
									Create
								</Button>
							</Tooltip>
						)}
						{numSelected > 0 && (
							<>
								<Tooltip title='Update'>
									<Button onClick={updateTableData} variant='contained'>
										Update
									</Button>
								</Tooltip>
								<Tooltip title='Delete'>
									<Button variant='contained' sx={{ m: 1 }}>
										<DeleteIcon />
									</Button>
								</Tooltip>
							</>
						)}
					</Box>
				</Grid>
				<Grid item xs={12} md={9}>
					{numSelected > 0 && <TableSelect />}
					{numSelected < 1 && <TableSearch />}
				</Grid>
			</Grid>
		</Toolbar>
	);
}

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired
};
