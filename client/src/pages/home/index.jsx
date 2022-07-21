import { Grid, Box, Paper, Typography, CssBaseline, Avatar, Button, Link } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function Home({ login }) {
	const theme = createTheme();

	function Copyright(props) {
		return (
			<Typography variant='body2' color='text.secondary' align='center' {...props}>
				{'Copyright © '}
				<Link color='inherit' href='https://mui.com/'>
					ProperTee
				</Link>{' '}
				{new Date().getFullYear()}
				{'.'}
			</Typography>
		);
	}

	return (
		<ThemeProvider theme={theme}>
			<Grid container component='main' sx={{ height: '100vh' }}>
				<CssBaseline />
				<Grid
					item
					xs={false}
					sm={4}
					md={7}
					sx={{
						backgroundImage: 'url("/background-6.png")',
						backgroundRepeat: 'no-repeat',
						backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
						backgroundSize: 'cover',
						backgroundPosition: 'center'
					}}
				/>
				<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
					<Box
						sx={{
							my: 8,
							mx: 4,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							textAlign: 'center'
						}}>
						<Avatar src={'/17.png'} alt='logo' sx={{ width: 100, height: 100 }} />
						<Typography component='h1' variant='h4'>
							Welcome to ProperTee!
						</Typography>
						<Typography component='h3' variant='body1'>
							Sign in to your organization page to start working.
						</Typography>
						<Typography component='div' variant='caption'>
							<>
								{'Not a member? '}
								<Link color='inherit' href='/register'>
									Sign up here!
								</Link>
							</>
						</Typography>
						<Box component='form' noValidate sx={{ mt: 1 }}>
							<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }} onClick={() => login()}>
								Sign in
							</Button>
							<Grid container>
								<Grid item xs={12}>
									<Link href='#' variant='body2'>
										Forgot password?
									</Link>
								</Grid>
							</Grid>
							<Copyright sx={{ mt: 5 }} />
						</Box>
					</Box>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
}
