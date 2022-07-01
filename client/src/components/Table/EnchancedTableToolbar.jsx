import { useState } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import Button from '@mui/material/Button';

import EditTableSelect from './EditTableSelect';

import { useNavigate } from 'react-router-dom';

export default function EnhancedTableToolbar(props) {
	const { numSelected } = props;

	const navigate = useNavigate();

	return (
		<Toolbar
			className='table-toolbar'
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
				justifyContent: 'space-between',
				alignItems: 'center',
				...(numSelected > 0 && {
					bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
				})
			}}>
			{numSelected > 0 ? <EditTableSelect /> : <Typography sx={{ flex: '1 1 100%' }} variant='div' id='tableTitle' component='div'></Typography>}
			<div>
				{numSelected > 0 ? (
					<div className='table-actions'>
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
					</div>
				) : (
					<Tooltip title='Filter list'>
						<IconButton>
							<FilterListIcon />
						</IconButton>
					</Tooltip>
				)}
			</div>
		</Toolbar>
	);
}

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired
};
