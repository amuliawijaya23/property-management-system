import { useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';

export default function DateTimeSelector() {
	const [value, setValue] = useState(new Date(Date.now()));

	const handleChange = (newValue) => {
		setValue(newValue);
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<DateTimePicker label='Date&Time picker' value={value} onChange={handleChange} disablePast={true} renderInput={(params) => <TextField {...params} sx={{ mt: 2 }} />} />
		</LocalizationProvider>
	);
}
