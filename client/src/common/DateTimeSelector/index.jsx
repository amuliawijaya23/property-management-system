import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';

export default function DateTimeSelector(props) {
	const { form, setDate, type } = props;

	const handleChange = (newValue) => {
		setDate(newValue);
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<DateTimePicker
				label={type
					.split('_')
					.map((word) => word[0].toUpperCase() + word.substring(1))
					.join(' ')}
				value={form[type]}
				onChange={handleChange}
				disablePast={false}
				renderInput={(params) => (
					<TextField {...params} sx={{ mt: 2 }} fullWidth margin='dense' size='small' variant='standard' helperText={`${formatDistanceToNowStrict(new Date(form[type]), { addSuffix: true })}`} />
				)}
			/>
		</LocalizationProvider>
	);
}
