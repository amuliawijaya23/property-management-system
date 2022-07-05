import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
	return (
		<div className='App__loading'>
			<CircularProgress size={'4.5rem'} />
		</div>
	);
}
