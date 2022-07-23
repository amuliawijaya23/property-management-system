import { Box, Modal, Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import { formatDistanceToNowStrict } from 'date-fns';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4
};

export default function StatusInfo({ open, step, onClose }) {
	const fileIcon = (input) => {
		switch (input) {
			case 'xlsx' || 'xls' || 'xlsm':
				return '/fileIcons/xls.png';

			case 'docx' || 'doc' || 'docm':
				return '/fileIcons/doc.png';

			case 'csv':
				return '/fileIcons/csv.png';

			case 'pdf':
				return '/fileIcons/pdf.png';

			case 'ppt' || 'pptx':
				return '/fileIcons/ppt.png';

			case 'zip':
				return '/fileIcons/zip.png';

			case 'txt':
				return '/fileIcons/txt.png';

			default:
				return '/fileIcons/file.png';
		}
	};

	return (
		<>
			<Modal open={open} onClose={onClose}>
				<Box sx={style}>
					<Grid container>
						<Grid item xs={12}>
							{step?.step}
						</Grid>
						{step?.step === 'Offer Accepted' && step?.data?.updated_at && (
							<Grid item xs={12}>
								<List>
									<a href={step?.download}>
										<ListItem button>
											<ListItemAvatar>
												<Avatar src={fileIcon(step?.data?.name?.split('.')[step?.data?.name.split('.').length - 1])} alt='agent' sx={{ py: 0.5, px: 0.5 }} />
											</ListItemAvatar>
											<ListItemText primary={step?.data?.name} secondary={`Updated ${formatDistanceToNowStrict(new Date(step?.data?.updated_at), { addSuffix: true })}`} />
										</ListItem>
									</a>
								</List>
							</Grid>
						)}
					</Grid>
				</Box>
			</Modal>
		</>
	);
}
