import './styles.scss';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';

import HotelRoundedIcon from '@mui/icons-material/HotelRounded';
import ShowerRoundedIcon from '@mui/icons-material/ShowerRounded';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Status from '../Property/PropertyDetail/Status';

import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { useNavigate, Link } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

ListPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function ListPanel(props) {
  const app = useSelector((state) => state.app.value);
  const agent = app?.agents.find((user) => user?.user_id === props.property?.seller_id);

  const { children, value, index, ...other } = props;

  const navigate = useNavigate();

  return (
    <div 
      className='list-panel'
      key={`list-item-${index}`}
      id={`list-item-${index}`}
      hidden={value !== (index + 1)}
      index={index}
      value={value}
      aria-labelledby={`list-menu-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Card sx={{height: '100vh'}}>
            <CardActions sx={{justifyContent: 'flex-start'}}>
              <Button 
                variant='text'
                onClick={() => navigate(`/property/${props.property.id}`)}>
                  LIST-{props.property.id}
              </Button>
              <AvatarGroup>
                <Avatar src={agent?.picture} alt='seller' />
                <Avatar>+</Avatar>
              </AvatarGroup>
            </CardActions>
            <CardHeader 
              title={props.property.title}
              subheader={props.property.address}
            />
            <Status />
            <CardMedia
              sx={{mt: '1rem', height: '35vh'}}
              className='property-item__image'
              component='img'
              alt="cover"
              image={props.property.cover_image_url}
            />
            <CardContent sx={{mb: '1rem', mt: '1rem'}}>
              <Typography variant="h6" color="text.secondary" component='div'>
                <b>Type:</b> {props.property?.property_type}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {props.property?.description}
              </Typography>
              <div className='property-item__details'>
                <div className='property-item__details-section'>
                  <HotelRoundedIcon sx={{fontSize: '2.5rem', mr: '1rem'}} />
                  {props.property?.number_of_bedrooms}
                </div>
                <div className='property-item__details-section'>
                  <ShowerRoundedIcon sx={{fontSize: '2.5rem', mr: '1rem'}} />
                  {props.property?.number_of_bathrooms}
                </div>
                <div className='property-item__details-section'>
                  <DirectionsCarFilledIcon sx={{fontSize: '2.5rem', mr: '1rem'}} />
                  {props.property?.parking_space}
                </div>
              </div>
            </CardContent>
          </Card>
        </Box>
      )}
  </div>
  );
};