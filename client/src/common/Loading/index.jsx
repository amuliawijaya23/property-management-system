import { Grid, CircularProgress } from '@mui/material';

export default function Loading() {
	return (
		<Grid container>
			<Grid item container justifyContent='center' alignItems='center' height='100vh'>
				<CircularProgress size={'4.5rem'} />
			</Grid>
		</Grid>
	);
}
