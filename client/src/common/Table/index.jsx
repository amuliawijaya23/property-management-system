import { useState } from 'react';

import { Box, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Paper } from '@mui/material';

import EnhancedTableHead from './TableHead';
import EnhancedTableToolbar from './TableToolbar';
import TableRows from './TableRows';

import { useSelector, useDispatch } from 'react-redux';

import { setSelected } from '../../state/reducers/tableReducer';

import useUpdateTable from './hooks/useUpdateTable';

export default function EnhancedTable(props) {
	const { resetTableData } = useUpdateTable();
	const [order, setOrder] = useState('desc');
	const [orderBy, setOrderBy] = useState('id');
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const dispatch = useDispatch();

	const table = useSelector((state) => state.table.value);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = table.rows?.map((n) => n.id);
			dispatch(setSelected(newSelecteds));
			return;
		}
		dispatch(setSelected([]));
		resetTableData();
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - table.rows.length) : 0;

	return (
		<Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
			<Paper sx={{ width: '98%' }}>
				<EnhancedTableToolbar handleOpen={props.handleOpen} />
				<TableContainer sx={{ height: '80vh', borderTop: 'solid 1px lightGrey', borderBottom: 'solid 1px lightGrey' }}>
					<Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={'medium'}>
						<EnhancedTableHead
							numSelected={table.selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={table.rows?.length}
						/>
						<TableBody>
							<TableRows order={order} orderBy={orderBy} page={page} rowsPerPage={rowsPerPage} handleOpen={props.handleOpen} />
							{emptyRows > 0 && (
								<TableRow style={{ height: 33 * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component='div'
					count={table?.rows?.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Box>
	);
}
