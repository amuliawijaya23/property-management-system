import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import CardContent from '@mui/material/CardContent';

import HotelRoundedIcon from '@mui/icons-material/HotelRounded';
import ShowerRoundedIcon from '@mui/icons-material/ShowerRounded';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';

import { useSelector } from 'react-redux';

export default function Collapsable(props) {
	const property = useSelector((state) => state.property.value);

	return (
		<Collapse in={props.expanded} timeout='auto' unmountOnExit>
			<CardContent sx={{ mb: '1rem' }}>
				<Typography variant='h6' color='text.secondary' component='div'>
					<b>Type:</b> {property?.details?.property_type}
				</Typography>
				<Typography variant='body2' color='text.secondary' component='div'>
					{property?.details?.address}
				</Typography>
				<Typography variant='body2' color='text.secondary' component='div'>
					{property?.details?.description}
				</Typography>
				<div className='property-item__details'>
					<div className='property-item__details-section'>
						<HotelRoundedIcon sx={{ fontSize: '2.5rem', mr: '1rem' }} />
						{property?.details?.number_of_bedrooms}
					</div>
					<div className='property-item__details-section'>
						<ShowerRoundedIcon sx={{ fontSize: '2.5rem', mr: '1rem' }} />
						{property?.details?.number_of_bathrooms}
					</div>
					<div className='property-item__details-section'>
						<DirectionsCarFilledIcon sx={{ fontSize: '2.5rem', mr: '1rem' }} />
						{property?.details?.parking_space}
					</div>
				</div>
			</CardContent>
		</Collapse>
	);
}
