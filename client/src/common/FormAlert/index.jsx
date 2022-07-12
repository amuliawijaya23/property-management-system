import { Snackbar, IconButton } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

export default function FormAlert(props) {
	const { open, onClose, message } = props;

	return (
		<Snackbar
			open={open}
			autoHideDuration={5000}
			onClose={onClose}
			message={message}
			action={
				<IconButton size='small' aria-label='close' color='inherit' onClick={onClose}>
					<CloseIcon fontSize='small' />
				</IconButton>
			}
		/>
	);
}
