import { useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';

export default function DateTimeSelector(props) {
	const [value, setValue] = useState(props.form.due_date);

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
				renderInput={(params) => (
					<TextField
						{...params}
						sx={{ mt: 2 }}
						fullWidth
						margin='dense'
						size='small'
						variant='standard'
						helperText={`Due ${formatDistanceToNowStrict(new Date(props.form.due_date), { addSuffix: true })}`}
					/>
				)}
			/>
		</LocalizationProvider>
	);
}
