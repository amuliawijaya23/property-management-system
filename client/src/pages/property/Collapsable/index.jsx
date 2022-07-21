import { Grid, Typography, Collapse, CardContent } from '@mui/material';

import HotelRoundedIcon from '@mui/icons-material/HotelRounded';
import ShowerRoundedIcon from '@mui/icons-material/ShowerRounded';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import NumberFormat from 'react-number-format';

import { useSelector } from 'react-redux';

export default function Collapsable({ expanded }) {
	const property = useSelector((state) => state.property.value);

	return (
		<Collapse in={expanded} timeout='auto' unmountOnExit>
			<CardContent sx={{ mb: '1rem' }}>
				<Grid container spacing={1}>
					<Grid item xs={6}>
						<Typography variant='h7' color='text.secondary' component='div'>
							<b>Valuation: </b>
							<NumberFormat
								value={property?.details?.valuation}
								thousandSeparator={','}
								decimalScale={2}
								fixedDecimalScale={true}
								decimalSeparator={'.'}
								displayType='text'
								prefix='$ '
								renderText={(value) => <>{value}</>}
							/>
						</Typography>
					</Grid>
					{property?.details?.market_valuation && (
						<Grid item xs={6}>
							<Typography variant='h7' color='text.secondary' component='div'>
								<b>Market Valuation: </b>
								<NumberFormat
									value={property?.details?.market_valuation}
									thousandSeparator={','}
									decimalScale={2}
									fixedDecimalScale={true}
									decimalSeparator={'.'}
									displayType='text'
									prefix='$ '
									renderText={(value) => <>{value}</>}
								/>
							</Typography>
						</Grid>
					)}
					<Grid item xs={12}>
						<Typography variant='h7' color='text.secondary' component='div'>
							<b>Service:</b> {property?.details?.service_type}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant='h7' color='text.secondary' component='div'>
							<b>Address:</b> {property?.details?.address}, {property?.details?.postal_code}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant='h7' color='text.secondary' component='div'>
							<b>Type:</b> {property?.details?.property_type}
						</Typography>
					</Grid>
					<Grid item xs={12} sx={{ mb: 2 }}>
						<Typography variant='body2' color='text.secondary' component='div'>
							{property?.details?.description}
						</Typography>
					</Grid>
					<Grid item xs={4} container alignItems='center' fontSize='2rem'>
						<HotelRoundedIcon sx={{ mr: 2 }} />
						{property?.details?.number_of_bedrooms}
					</Grid>
					<Grid item xs={4} container alignItems='center' fontSize='2rem'>
						<ShowerRoundedIcon sx={{ mr: 2 }} />
						{property?.details?.number_of_bathrooms}
					</Grid>
					<Grid item xs={4} container alignItems='center' fontSize='2rem'>
						<DirectionsCarFilledIcon sx={{ mr: 2 }} />
						{property?.details?.parking_space}
					</Grid>
				</Grid>
			</CardContent>
		</Collapse>
	);
}
