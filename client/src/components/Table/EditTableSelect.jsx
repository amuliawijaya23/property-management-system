import { useCallback, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useSelector, useDispatch } from 'react-redux';

import { setTableRows } from '../../state/reducers/tableReducer';

export default function EditTableSelect(props) {
	const app = useSelector((state) => state.app.value);
	const table = useSelector((state) => state.table.value);

	const dispatch = useDispatch();

	const label = useCallback((key) => {
		switch (key) {
			case 'seller_id':
				return 'Agent';

			default:
				return key[0].toUpperCase() + key.substring(1);
		}
	}, []);

	const updateRowsData = (key, selected) => (event) => {
		let newRows = [...table.rows];
		selected.forEach((id) => {
			const index = newRows.map((row) => row.id).indexOf(id);
			let currentRow = { ...newRows[index] };
			if (key === 'seller_id') {
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
		<div className='table-edit'>
			{Object.keys(table.edit).map((key) => (
				<FormControl key={`${key}-update`} variant='outlined' size='small' sx={{ m: 1, minWidth: 100 }}>
					<InputLabel id={`${key}-select-label`}>{label(key)}</InputLabel>
					<Select labelId={`${key}-select-label`} onChange={updateRowsData(key, table.selected)} label={key === 'seller_id' ? 'Agent' : key[0] + key.substring(1)}>
						<MenuItem value=''>
							<em>None</em>
						</MenuItem>
						{table.edit[key]?.map((values) => {
							return (
								<MenuItem key={`selection-${values}`} value={values}>
									<em>{values.length > 20 ? values.substring(0, 20) + '...' : values}</em>
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>
			))}
		</div>
	);
}
