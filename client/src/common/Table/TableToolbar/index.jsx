import { useState, useEffect } from 'react';
import { alpha } from '@mui/material/styles';

import { Grid, Box, Toolbar, Tooltip, Button, Autocomplete, TextField, InputAdornment } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TableSearch from '../TableSearch';

import { useSelector } from 'react-redux';

import useUpdateTable from '../hooks/useUpdateTable';

export default function EnhancedTableToolbar(props) {
	const { updateRowsAgent, updateTableData, resetRows } = useUpdateTable();
	const app = useSelector((state) => state.app.value);
	const table = useSelector((state) => state.table.value);

	const { handleOpen } = props;
	const [selected, setSelected] = useState(null);

	const numSelected = table?.selected?.length;

	const selectAgent = (input) => {
		setSelected(input);
		updateRowsAgent(input);
	};

	useEffect(() => {
		if (table?.selected?.length < 1 && selected) {
			setSelected(null);
		}
	}, [table.selected, setSelected, selected]);

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
				<Grid item xs={12} md={10}>
					{numSelected > 0 && (
						<Autocomplete
							sx={{ mb: 2, mt: 2, width: 300 }}
							value={selected?.name || ''}
							onChange={(event, newValue) => {
								if (newValue) {
									const agent = app?.agents?.find((a) => a?.name === newValue);
									updateRowsAgent(agent);
								}
							}}
							options={app?.agents?.map((option) => option?.name)}
							freeSolo
							renderInput={(params) => <TextField variant='outlined' size='small' placeholder='Select Agent...' {...params} />}
						/>
					)}
					{numSelected < 1 && <TableSearch />}
				</Grid>
				<Grid item xs={12} md={2} sx={{ mt: 1 }}>
					<Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end', alignItems: 'center' }}>
						{numSelected < 1 && (
							<Tooltip title={`Create ${table?.type[0]?.toUpperCase()}${table?.type?.substring(1, table?.type.length - 1)}`}>
								<Button variant='text' onClick={() => handleOpen(null)}>
									Create
								</Button>
							</Tooltip>
						)}
						{numSelected > 0 && (
							<>
								<Tooltip title='Update'>
									<Button onClick={updateTableData} variant='contained' fullWidth>
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
			</Grid>
		</Toolbar>
	);
}
