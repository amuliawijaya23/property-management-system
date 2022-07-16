import { useState } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';

import { Grid, Box, Toolbar, Tooltip, Button, AvatarGroup } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import TableSearch from '../TableSearch';
import SelectAgent from '../../SelectAgent';

import { useSelector } from 'react-redux';

import useUpdateTable from '../hooks/useUpdateTable';

export default function EnhancedTableToolbar(props) {
	const { updateRowsAgent, updateTableData } = useUpdateTable();
	const app = useSelector((state) => state.app.value);
	const table = useSelector((state) => state.table.value);

	const { handleOpen } = props;
	const [selected, setSelected] = useState(null);

	const numSelected = table?.selected?.length;

	const selectAgent = (input) => {
		setSelected(input);
		updateRowsAgent(input);
	};

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
					{numSelected > 0 && (
						<AvatarGroup spacing={'medium'} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
							{app.agents.map((agent) => (
								<SelectAgent agent={agent} assignAgent={selectAgent} selected={agent?.user_id === selected?.user_id} table={true} />
							))}
						</AvatarGroup>
					)}
					{numSelected < 1 && <TableSearch />}
				</Grid>
			</Grid>
		</Toolbar>
	);
}

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired
};
