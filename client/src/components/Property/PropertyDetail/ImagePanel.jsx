import PropTypes from 'prop-types';
import CardMedia from '@mui/material/CardMedia';

ImagePanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired
};

export default function ImagePanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}>
			{value === index && (
				<CardMedia
					className='property-item__image'
					component='img'
					alt='listing'
					image={props.link}
				/>
			)}
		</div>
	);
}
