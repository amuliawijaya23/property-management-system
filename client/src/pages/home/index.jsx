import { Grid, Box, Paper } from '@mui/material';
export default function Home() {
	const style = {
		backgroundImage: 'url("/background.png")',
		backgroundRepeat: 'no-repeat',
		backgroundSize: '100%',
		display: 'flex',
		height: '95vh',
		width: '100vw'
	};
	return <Grid container direction={'column'} justiy='center' style={style}></Grid>;
}
