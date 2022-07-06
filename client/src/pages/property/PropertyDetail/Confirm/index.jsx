import DialogTitle from '@mui/material/DialogTitle';
import { DialogContent } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';

export default function Confirm(props) {
	const { onClose, open, download } = props;
	console.log(download);

	return (
		<Dialog onClose={onClose} open={open}>
			<DialogTitle>Download File?</DialogTitle>
			<DialogContent>
				<a href={download} download={true} target={'_blank'} rel={'noreferrer'} onClick={onClose}>
					<Button variant='contained' onClick={onClose} sx={{ mr: 1 }}>
						Confirm
					</Button>
				</a>
				<Button variant='contained' onClick={onClose}>
					Cancel
				</Button>
			</DialogContent>
		</Dialog>
	);
}
