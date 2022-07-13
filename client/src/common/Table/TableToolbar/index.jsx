import { useState } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';

import { Grid, Box, Toolbar, Typography, IconButton, Tooltip, Button } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

import TableSelect from '../TableSelect';
import TableSearch from '../TableSearch';

import { useNavigate } from 'react-router-dom';

export default function EnhancedTableToolbar(props) {
	const { numSelected, handleOpen } = props;

	const navigate = useNavigate();

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
				<Grid item xs={12} md={6}>
					{numSelected > 0 && <TableSelect />}
					{numSelected < 1 && <TableSearch />}
				</Grid>
				<Grid item xs={12} md={6} justifyContent='flex-end'>
					<Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
						{numSelected < 1 && (
							<Tooltip title='Create'>
								<Button variant='contained' onClick={handleOpen} sx={{ m: 1 }}>
									Create
								</Button>
							</Tooltip>
						)}
						{numSelected > 0 && (
							<>
								<Tooltip title='Update'>
									<Button onClick={props.updateTableData} variant='contained'>
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
				<Grid item xs={12}></Grid>
			</Grid>
		</Toolbar>
	);
}

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired
};
