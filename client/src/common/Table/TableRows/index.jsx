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

			switch (table.type) {
				case 'properties':
					return <PropertyRow row={row} labelId={labelId} isItemSelected={isItemSelected} index={index} handleClick={onSelect} />;

				case 'transactions':
					return <TransactionRow row={row} labelId={labelId} isItemSelected={isItemSelected} index={index} handleClick={onSelect} handleOpen={openForm} />;

				case 'contacts':
					return <ContactRow row={row} labelId={labelId} isItemSelected={isItemSelected} index={index} handleClick={onSelect} handleOpen={openForm} />;

				case 'tasks':
					return <TaskRow row={row} labelId={labelId} isItemSelected={isItemSelected} index={index} handleClick={onSelect} handleOpen={openForm} />;

				default:
					return <></>;
			}
		});

	return <>{tableRows}</>;
}
