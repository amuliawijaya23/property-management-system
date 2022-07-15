import { useCallback } from 'react';

import { Grid, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';

import { setTableRows } from '../../../state/reducers/tableReducer';

export default function TableSelect(props) {
	const app = useSelector((state) => state.app.value);
	const table = useSelector((state) => state.table.value);

	const dispatch = useDispatch();

	const updateRowsData = (key, selected) => (event) => {
		let newRows = [...table.rows];
		selected.forEach((id) => {
			const index = newRows.map((row) => row.id).indexOf(id);
			let currentRow = { ...newRows[index] };
			if (key === 'agent') {
				const agent = app.agents.find((user) => user?.name === event.target.value);
				currentRow.agent = agent?.picture;
			} else {
				currentRow[key] = event.target.value;
			}
			newRows[index] = currentRow;
		});
		dispatch(setTableRows(newRows));
	};

	return (
		<Grid container spacing={1} justifyContent='flex-end'>
			{Object.keys(table.edit).map((key) => (
				<Grid item xs={12} md={2}>
					<FormControl key={`${key}-update`} variant='outlined' size='small' sx={{ m: 1, minWidth: 100 }} fullWidth>
						<InputLabel id={`${key}-select-label`}>{key[0].toUpperCase() + key.substring(1)}</InputLabel>
						<Select labelId={`${key}-select-label`} onChange={updateRowsData(key, table.selected)} label={key[0] + key.substring(1)}>
							{table.edit[key]?.map((values) => {
								return (
									<MenuItem key={`selection-${values}`} value={values}>
										<em>{values.length > 20 ? values.substring(0, 20) + '...' : values}</em>
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
				</Grid>
			))}
		</Grid>
	);
}
