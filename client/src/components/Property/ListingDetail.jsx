import { useState } from 'react';
import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ImagePanel from './ImagePanel';
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


function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


export default function ListingDetail(props) {
  const [activeStep, setActiveStep] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState(0);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const seller = props.agents?.find((agent) => agent.user_id === props.property?.details?.seller_id);

  const currentImages = [{link: props.property.details.cover_image_url}];

  const imageTabs = [...currentImages, ...props.property.images].map((image, i) => (
    <ImagePanel
      value={value}
      index={i}
      link={i === 0 ?
        props.property.details.cover_image_url :
        image.link
      }
    />
  ));

  return (
    <Box className='property-item'>
      <Card sx={{ width: '95%', border: 'solid'}}>
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
        {imageTabs}
         <Tabs
          className='property-item__gallery'
          value={value}
          onChange={handleChange}
          variant='scrollable'
          scrollButtons
          allowScrollButtonsMobile
          aria-label='scrollable tabs'
          sx={{m: 0}}
        >
          <Tab 
            className='property-item__media'
            sx={{m: 0}}
            label={(
            <img src={props.property.details.cover_image_url} alt='thumbnail-gallery'/>
            )}
            {...a11yProps(0)}
          />
          {props.property.images.map((image, i) => (
            <Tab
              className='property-item__media'
              sx={{m: 0}}
              label={(
                <img src={image.link} alt='property-gallery' />
              )}
              {...a11yProps(i)}
            />
          ))}
        </ Tabs>
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
            <Typography variant="body2" color="text.secondary">
              {props.property?.details?.description}
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
          </CardContent>
        </Collapse>
        <Stepper 
          activeStep={activeStep} 
          alternativeLabel 
          sx={{mt: 5}}
        >
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
        <CardContent 
          sx={{
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              mt: 5
            }}
        >
          <Typography 
            variant='h5' 
            component='div' 
            paddingBottom={3} 
            borderBottom={'solid 1px #00000045'}
            width={'100%'}
          >
            Messages&nbsp;
            {props.property?.messages.length > 0 && `(${props.property?.messages.length})`}
          </Typography>
          <MessageBox
            messages={props.property?.messages}
            agents={props.agents}
            user={props.user}
            onSend={props.sendMessage}
            property={props.property}
          />
        </CardContent>
      </Card>
    </Box>
  );
}