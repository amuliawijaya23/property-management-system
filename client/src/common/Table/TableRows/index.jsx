import { TableRow, TableCell, Checkbox } from '@mui/material';

import PropertyRow from './PropertyRow';
import TransactionRow from './TransactionRow';
import ContactRow from './ContactRow';
import TaskRow from './TaskRow';

import { getComparator, stableSort } from '../../../helpers/sortTable';
import { useDispatch, useSelector } from 'react-redux';
import { setSelected } from '../../../state/reducers/tableReducer';

import useUpdateTable from '../hooks/useUpdateTable';

export default function EnhancedTableRows({ order, orderBy, page, rowsPerPage, handleOpen }) {
	const { resetRows } = useUpdateTable();
	const dispatch = useDispatch();

	const user = useSelector((state) => state.user.value);
	const table = useSelector((state) => state.table.value);
	const app = useSelector((state) => state.app.value);

	const handleClick = (event, id) => {
		const selectedIndex = table.selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(table.selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(table.selected?.slice(1));
			resetRows(selectedIndex);
		} else if (selectedIndex === table.selected.length - 1) {
			newSelected = newSelected.concat(table.selected?.slice(0, -1));
			resetRows(selectedIndex);
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(table.selected?.slice(0, selectedIndex), table.selected?.slice(selectedIndex + 1));
			resetRows(selectedIndex);
		}
		dispatch(setSelected(newSelected));
	};

	const isSelected = (name) => table.selected.indexOf(name) !== -1;

	const tableRows = stableSort(table?.rows, getComparator(order, orderBy))
		?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
		?.map((row, index) => {
			const isItemSelected = isSelected(row?.id);
			const labelId = `enhanced-table-checkbox-${index}`;
			const onSelect = (event) => handleClick(event, row?.id);
			const openForm = () => handleOpen(app[table.type].find((n) => n.id === row?.id));

			return (
				<TableRow key={`table-row-${index}`} id={`table-row-${index}`} aria-checked={isItemSelected} tabIndex={-1} selected={isItemSelected}>
					{user.role === 'Master' && (
						<TableCell padding='checkbox'>
							<Checkbox color='primary' checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} onClick={onSelect} />
						</TableCell>
					)}
					{table?.type === 'properties' && <PropertyRow row={row} labelId={labelId} />}
					{table?.type === 'transactions' && <TransactionRow row={row} labelId={labelId} handleOpen={openForm} />}
					{table?.type === 'contacts' && <ContactRow row={row} labelId={labelId} handleOpen={openForm} />}
					{table?.type === 'tasks' && <TaskRow row={row} labelId={labelId} handleOpen={openForm} />}
				</TableRow>
			);
		});

	return <>{tableRows}</>;
}
