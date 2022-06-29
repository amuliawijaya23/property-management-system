import './styles.scss';

import { useState } from 'react';
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
import AddIcon from '@mui/icons-material/Add';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Status from '../Property/PropertyDetail/Status';
import SelectAgent from '../Dialog/SelectAgent';

import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { useNavigate, Link } from 'react-router-dom';

import usePropertyData from '../../hooks/usePropertyData';

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
  const property = useSelector((state) => state.property.value);
  const agent = app?.agents.find((user) => user?.user_id === property.details?.seller_id);

  const watchers = property.watchers.map((watcher) => watcher.user_id);
  const options = app.agents.filter((agent) =>  !watchers.includes(agent.user_id) && agent.user_id !== property.details.seller_id)

  const { children, value, index, ...other } = props;

  const { } = usePropertyData();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(options[0]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

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
                onClick={() => navigate(`/property/${property.details?.id}`)}>
                  LIST-{property.details?.id}
              </Button>
              <AvatarGroup>
                <Tooltip title={agent?.name}>
                  <Avatar src={agent?.picture} alt='seller' />
                </Tooltip>
                {watchers.map((user) => {
                  const watcher = app?.agents.find((agent) => agent?.user_id === user);
                  return (
                    <Tooltip title={watcher?.name}>
                      <Avatar src={watcher?.picture} alt='watcher' />
                    </Tooltip>
                  )
                })}
                <Avatar className='list-panel__add-watcher'>
                  <AddIcon onClick={handleClickOpen} />
                </Avatar>
                <SelectAgent 
                  selectedValue={selectedValue}
                  open={open}
                  onClose={handleClose}
                  options={options}
                  waatchers={watchers}
                />
              </AvatarGroup>
            </CardActions>
            <CardHeader 
              title={property.details?.title}
              subheader={property.details?.address}
            />
            <Status />
            <CardMedia
              sx={{mt: '1rem', height: '35vh'}}
              className='property-item__image'
              component='img'
              alt="cover"
              image={property.details?.cover_image_url}
            />
            <CardContent sx={{mb: '1rem', mt: '1rem'}}>
              <Typography variant="h6" color="text.secondary" component='div'>
                <b>Type:</b> {property.details?.property_type}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {property.details?.description}
              </Typography>
              <div className='property-item__details'>
                <div className='property-item__details-section'>
                  <HotelRoundedIcon sx={{fontSize: '2.5rem', mr: '1rem'}} />
                  {property.details?.number_of_bedrooms}
                </div>
                <div className='property-item__details-section'>
                  <ShowerRoundedIcon sx={{fontSize: '2.5rem', mr: '1rem'}} />
                  {property.details?.number_of_bathrooms}
                </div>
                <div className='property-item__details-section'>
                  <DirectionsCarFilledIcon sx={{fontSize: '2.5rem', mr: '1rem'}} />
                  {property.details?.parking_space}
                </div>
              </div>
            </CardContent>
          </Card>
        </Box>
      )}
  </div>
  );
};