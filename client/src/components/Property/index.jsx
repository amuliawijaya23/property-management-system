import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HotelRoundedIcon from '@mui/icons-material/HotelRounded';
import ShowerRoundedIcon from '@mui/icons-material/ShowerRounded';
import DirectionsCarFilledRoundedIcon from '@mui/icons-material/DirectionsCarFilledRounded';

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

export default function Property(props) {
  const [activeStep, setActiveStep] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const seller = props.agents?.find((agent) => agent.user_id === props.property.seller_id);

  console.log(seller);

  

  return (
    <Box className='property-item'>
      <Card sx={{ width: '90%'}}>
      <CardHeader
            avatar={
              <AvatarGroup>
                <Avatar src={seller.picture} alt='seller' />
                <Avatar>+</Avatar>
              </AvatarGroup>
            }
          />
        <CardMedia
          className='property-item__image'
          component='img'
          alt="listing"
          image={props.property.cover_image_url}
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
            title={props.property.title}
            subheader={props.property.address}
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
              <b>Type:</b> {props.property.property_type}
            </Typography>
            <div className='property-item__details'>
              <div className='property-item__details-section'>
                <HotelRoundedIcon sx={{fontSize: '2.5rem', mr: '1rem'}} />
                {props.property.number_of_bedrooms}
              </div>
              <div className='property-item__details-section'>
                <ShowerRoundedIcon sx={{fontSize: '2.5rem', mr: '1rem'}} />
                {props.property.number_of_bathrooms}
              </div>
              <div className='property-item__details-section'>
                <DirectionsCarFilledRoundedIcon sx={{fontSize: '2.5rem', mr: '1rem'}} />
                {props.property.parking_space}
              </div>
            </div>
            <Typography variant="body2" color="text.secondary">
              {props.property.description}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
};