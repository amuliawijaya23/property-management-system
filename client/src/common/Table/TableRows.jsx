import { useSelector } from 'react-redux';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';

import { getComparator, stableSort } from '../../helpers/sortTable';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelected } from '../../state/reducers/tableReducer';

export default function TableRows(props) {
	const dispatch = useDispatch();

	const table = useSelector((state) => state.table.value);

	const handleClick = (event, id) => {
		const selectedIndex = table.selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(table.selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(table.selected?.slice(1));
			props.resetRow(selectedIndex);
		} else if (selectedIndex === table.selected.length - 1) {
			newSelected = newSelected.concat(table.selected?.slice(0, -1));
			props.resetRow(selectedIndex);
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(table.selected?.slice(0, selectedIndex), table.selected?.slice(selectedIndex + 1));
			props.resetRow(selectedIndex);
		}
		dispatch(setSelected(newSelected));
	};

	const isSelected = (name) => table.selected.indexOf(name) !== -1;

	const tableRows = stableSort(table?.rows, getComparator(props.order, props.orderBy))
		?.slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage)
		?.map((row, index) => {
			const isItemSelected = isSelected(row.id);
			const labelId = `enhanced-table-checkbox-${index}`;

			switch (table.type) {
				case 'properties':
					return (
						<TableRow
							key={`property-row-${index}`}
							id={`property-row-${index}`}
							hover
							onClick={(event) => handleClick(event, row.id)}
							role='checkbox'
							aria-checked={isItemSelected}
							tabIndex={-1}
							selected={isItemSelected}>
							<TableCell padding='checkbox'>
								<Checkbox color='primary' checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
							</TableCell>
							<TableCell component='th' id={labelId} scope='row' padding='none'>
								<Link to={`/property/${row.id}`}>LIST-{row.id}</Link>
							</TableCell>
							<TableCell align='left'>{row.title}</TableCell>
							<TableCell align='left'>{row.address.length < 40 ? row.address : `${row.address.substring(0, 45)}...`}</TableCell>
							<TableCell align='left'>{<Avatar src={row.agent} />}</TableCell>
							<TableCell align='left'>{row.status}</TableCell>
						</TableRow>
					);

				case 'contacts':
					return (
						<TableRow
							id={`contact-row-${index}`}
							hover
							onClick={(event) => handleClick(event, row.id)}
							role='checkbox'
							aria-checked={isItemSelected}
							tabIndex={-1}
							key={row.id}
							selected={isItemSelected}>
							<TableCell padding='checkbox'>
								<Checkbox color='primary' checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
							</TableCell>
							<TableCell component='th' id={labelId} scope='row' padding='none'>
								{row.id}
							</TableCell>
							<TableCell align='left'>{<Avatar src={row.agent} />}</TableCell>
							<TableCell align='left'>{row.name.length < 40 ? row.name : `${row.name.substring(0, 40)}...`}</TableCell>
							<TableCell align='left'>{row.email}</TableCell>
							<TableCell align='left'>{row.mobile}</TableCell>
						</TableRow>
					);

				case 'tasks':
					return (
						<TableRow id={`task-row-${index}`} hover onClick={(event) => handleClick(event, row.id)} role='checkbox' aria-checked={isItemSelected} tabIndex={-1} key={row.id} selected={isItemSelected}>
							<TableCell padding='checkbox'>
								<Checkbox color='primary' checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
							</TableCell>
							<TableCell component='th' id={labelId} scope='row' padding='none'>
								PRO-{row.id}
							</TableCell>
							<TableCell align='left'>{<Avatar src={row.agent} />}</TableCell>
							<TableCell align='left'>{row.summary.length < 40 ? row.summary : `${row.address.substring(0, 40)}...`}</TableCell>
							<TableCell align='left'>{row.category}</TableCell>
							<TableCell align='left'>{row.due_date}</TableCell>
							<TableCell align='left'>{row.status}</TableCell>
						</TableRow>
					);

				default:
					return <></>;
			}
		});

	return <>{tableRows}</>;
}
