import { Snackbar, Alert } from '@mui/material';

export default function FormAlert(props) {
	const { open, onClose, message, severity } = props;

	return (
		<Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
			<Alert sx={{ width: '100%' }} onClose={onClose} severity={severity}>
				{message}
			</Alert>
		</Snackbar>
	);
}
