import { useState } from 'react';

import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HotelRoundedIcon from '@mui/icons-material/HotelRounded';
import ShowerRoundedIcon from '@mui/icons-material/ShowerRounded';
import DirectionsCarFilledRoundedIcon from '@mui/icons-material/DirectionsCarFilledRounded';

import MessageBox from './MessageBox';

import './styles.scss';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const steps = ['Available for Showing', 'Accepting Offers', 'Offer Accepted', 'Completion'];


export default function ListingDetail(props) {
  const [activeStep, setActiveStep] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const seller = props.agents?.find((agent) => agent.user_id === props.property?.details?.seller_id);

  return (
    <Box className='property-item'>
      <Card sx={{ width: '98%'}}>
        <CardActions className='property-item__actions'>
          <div className="property-item__actions-section">
            <IconButton 
              size='large'
              onClick={() => props.onBack()}
            >
              <ArrowBackIcon
                sx={{fontSize: '2rem'}} 
              />
            </IconButton>
            <AvatarGroup sx={{ml: '1rem'}}>
              <Avatar src={seller?.picture} alt='seller' />
              <Avatar>+</Avatar>
            </AvatarGroup>
          </div>
          <div className="property-item__actions-section">
            <Button onClick={() => props.onMedia()} variant='text' size='large'>Media</Button>
            <Button variant='text' size='large'>Edit</Button>            
          </div>
        </CardActions>
        <CardMedia
          className='property-item__image'
          component='img'
          alt="listing"
          image={props.property?.details?.cover_image_url}
        />
        <Stepper activeStep={activeStep} alternativeLabel >
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div className='property-item__header'>
          <CardHeader
            title={props.property?.details?.title}
            subheader={props.property?.details?.address}
          />
          <ExpandMore
            className='property-item__expandable'
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            sx={{mr: '0.5rem'}}
          >
            <ExpandMoreIcon sx={{fontSize: '2rem'}}/>
          </ExpandMore>         
        </div>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent sx={{mb: '1rem'}}>
            <Typography variant="h6" color="text.secondary" component='div'>
              <b>Type:</b> {props.property?.details?.property_type}
            </Typography>
            <div className='property-item__details'>
              <div className='property-item__details-section'>
                <HotelRoundedIcon sx={{fontSize: '2.5rem', mr: '1rem'}} />
                {props.property?.details?.number_of_bedrooms}
              </div>
              <div className='property-item__details-section'>
                <ShowerRoundedIcon sx={{fontSize: '2.5rem', mr: '1rem'}} />
                {props.property?.details?.number_of_bathrooms}
              </div>
              <div className='property-item__details-section'>
                <DirectionsCarFilledRoundedIcon sx={{fontSize: '2.5rem', mr: '1rem'}} />
                {props.property?.details?.parking_space}
              </div>
            </div>
            <Typography variant="body2" color="text.secondary">
              {props.property?.details?.description}
            </Typography>
          </CardContent>
        </Collapse>
        <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Typography 
            variant='h5' 
            component='div' 
            paddingBottom={3} 
            borderBottom={'solid 1px #00000045'}
            width={'100%'}
          >
            Messages&nbsp;(36)
          </Typography>
          <MessageBox
            messages={props.property?.messages}
            agents={props.agents}
            user={props.user}
          />
        </CardContent>
      </Card>
    </Box>
  );
}