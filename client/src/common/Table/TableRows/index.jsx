import { TableRow, TableCell, Checkbox, Avatar, Chip, LinearProgress, Typography } from '@mui/material';

import { getComparator, stableSort } from '../../../helpers/sortTable';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelected } from '../../../state/reducers/tableReducer';

import useUpdateTable from '../hooks/useUpdateTable';

import format from 'date-fns/format';

const steps = ['Open', 'Offer Accepted', 'Deposit Received', 'Completion', 'Closed'];

export default function TableRows(props) {
	const { resetRows } = useUpdateTable();
	const dispatch = useDispatch();

	const table = useSelector((state) => state.table.value);
	const app = useSelector((state) => state.app.value);
	const user = useSelector((state) => state.user.value);

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

	const tableRows = stableSort(table?.rows, getComparator(props.order, props.orderBy))
		?.slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage)
		?.map((row, index) => {
			const isItemSelected = isSelected(row.id);
			const labelId = `enhanced-table-checkbox-${index}`;
			const stepIndex = steps.indexOf(row.status);
			const progress = (() => (stepIndex === 0 ? 0 : (stepIndex + 1) * 20))();
			const color = (() => {
				switch (row?.status) {
					case 'Open':
						return 'primary';

					case 'Active':
						return 'secondary';

					case 'Completion':
						return 'info';

					case 'Pending':
						return 'warning';

					case 'Blocked':
						return 'error';

					case 'Offer Accepted':
						return 'warning';

					case 'Deposit Received':
						return 'secondary';

					case 'Closed':
						return 'success';

					case 'Canceled':
						return 'default';

					default:
						return 'default';
				}
			})();

			switch (table.type) {
				case 'properties':
					return (
						<TableRow
							key={`property-row-${index}`}
							id={`property-row-${index}`}
							hover={user.role === 'Master'}
							onClick={(event) => {
								if (user.role === 'Master') handleClick(event, row.id);
							}}
							role='checkbox'
							aria-checked={isItemSelected}
							tabIndex={-1}
							selected={isItemSelected}>
							{user.role === 'Master' && (
								<TableCell padding='checkbox'>
									<Checkbox color='primary' checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
								</TableCell>
							)}
							<TableCell component='th' id={labelId} scope='row' padding='checkbox'>
								<Link to={`/property/${row.id}`}>LIST-{row.id}</Link>
							</TableCell>
							<TableCell align='left'>{row.title}</TableCell>
							<TableCell align='left'>{row.address.length < 40 ? row.address : `${row.address?.substring(0, 45)}...`}</TableCell>
							<TableCell align='left'>{<Avatar src={row.agent} />}</TableCell>
							<TableCell align='left' width={175}>
								{row?.status}
								<LinearProgress variant='determinate' value={progress} color={color} />
							</TableCell>
						</TableRow>
					);

				case 'transactions':
					return (
						<TableRow
							id={`transaction-row-${index}`}
							hover={user.role === 'Master'}
							onClick={(event) => {
								if (user.role === 'Master') handleClick(event, row.id);
							}}
							role='checkbox'
							aria-checked={isItemSelected}
							tabIndex={-1}
							key={row.id}
							selected={isItemSelected}>
							{user.role === 'Master' && (
								<TableCell padding='checkbox'>
									<Checkbox color='primary' checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
								</TableCell>
							)}
							<TableCell component='th' id={labelId} scope='row'>
								<Typography variant='button' sx={{ cursor: 'pointer' }} onClick={() => props.handleOpen(app?.transactions.find((transaction) => transaction.id === row.id))}>
									TRX-{row.id}
								</Typography>
							</TableCell>
							<TableCell align='left'>{<Avatar src={row.agent} />}</TableCell>
							<TableCell align='left'>{row.type}</TableCell>
							<TableCell align='left'>{format(new Date(row.start_date), 'PPPPpp')}</TableCell>
							<TableCell align='left'>{format(new Date(row.end_date), 'PPPPpp')}</TableCell>
							<TableCell align='left'>
								<Chip label={row.status} color={color} />
							</TableCell>
							<TableCell align='left'>{row.amount}</TableCell>
						</TableRow>
					);

				case 'contacts':
					return (
						<TableRow
							id={`contact-row-${index}`}
							hover={user.role === 'Master'}
							onClick={(event) => {
								if (user.role === 'Master') handleClick(event, row.id);
							}}
							role='checkbox'
							aria-checked={isItemSelected}
							tabIndex={-1}
							key={row.id}
							selected={isItemSelected}>
							{user.role === 'Master' && (
								<TableCell padding='checkbox'>
									<Checkbox color='primary' checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
								</TableCell>
							)}
							<TableCell component='th' id={labelId} scope='row'>
								<Typography variant='button' sx={{ cursor: 'pointer' }} onClick={() => props.handleOpen(app?.contacts.find((contact) => contact.id === row.id))}>
									CON-{row.id}
								</Typography>
							</TableCell>
							<TableCell align='left'>{<Avatar src={row.agent} />}</TableCell>
							<TableCell align='left'>{row.name.length < 40 ? row.name : `${row.name.substring(0, 40)}...`}</TableCell>
							<TableCell align='left'>{row.email}</TableCell>
							<TableCell align='left'>{row.mobile}</TableCell>
						</TableRow>
					);

				case 'tasks':
					return (
						<TableRow
							id={`task-row-${index}`}
							hover={user.role === 'Master'}
							onClick={(event) => {
								if (user.role === 'Master') handleClick(event, row.id);
							}}
							role='checkbox'
							aria-checked={isItemSelected}
							tabIndex={-1}
							key={row.id}
							selected={isItemSelected}>
							{user.role === 'Master' && (
								<TableCell padding='checkbox'>
									<Checkbox color='primary' checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
								</TableCell>
							)}
							<TableCell component='th' id={labelId} scope='row'>
								<Typography variant='button' sx={{ cursor: 'pointer' }} onClick={() => props.handleOpen(app?.tasks.find((task) => task.id === row.id))}>
									TASK-{row.id}
								</Typography>
							</TableCell>
							<TableCell align='left'>{<Avatar src={row.agent} />}</TableCell>
							<TableCell align='left'>{row.summary.length < 40 ? row.summary : `${row.summary?.substring(0, 40)}...`}</TableCell>
							<TableCell align='left'>{row.category}</TableCell>
							<TableCell align='left'>{format(new Date(row.due_date), 'PPPPpp')}</TableCell>
							<TableCell align='left'>
								<Chip label={row.status} color={color} />
							</TableCell>
						</TableRow>
					);

				default:
					return <></>;
			}
		});

	return <>{tableRows}</>;
}
