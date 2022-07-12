import { useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';

export default function DateTimeSelector(props) {
	const [value, setValue] = useState(new Date(Date.now()));

	const handleChange = (newValue) => {
		props.setDate(newValue);
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<DateTimePicker
				label='Due Date'
				value={props.form.due_date}
				onChange={handleChange}
				disablePast={true}
				renderInput={(params) => <TextField {...params} sx={{ mt: 2 }} fullWidth margin='dense' size='small' variant='standard' />}
			/>
		</LocalizationProvider>
	);
}
