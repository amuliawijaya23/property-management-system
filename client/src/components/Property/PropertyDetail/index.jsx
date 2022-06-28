import { useState, useEffect, useMemo, useCallback } from 'react';

import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import MediaCarousel from './MediaCarousel';
import Collapsable from './Collapsable';
import Status from './Status';
import MessageBox from './MessageBox';

import usePropertyData from '../../../hooks/usePropertyData';

import { useSelector } from 'react-redux';

import { 
  useNavigate,
} from 'react-router-dom';

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

const cardContentSx = {
  display: 'flex', 
  flexDirection: 'column', 
  alignItems: 'center', 
  mt: 5
};

export default function PropertyDetail() {
  
  
  const app = useSelector((state) => state.app.value);
  const property = useSelector((state) => state.property.value);

  const navigate = useNavigate();

  const seller = app.agents?.find((agent) => agent.user_id === property.details?.seller_id);
  
  const [expanded, setExpanded] = useState(false);
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box className='property-item'>
      <Card sx={{ width: '95%', border: 'solid 1px'}}>
        <CardActions className='property-item__actions'>
          <div className="property-item__actions-section">
            <IconButton 
              size='large'
              onClick={() => navigate('/properties')}
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
            <Button
              onClick={() => navigate(`/property/media/${property?.details.id}`)}
              variant='text' 
              size='large'
            >
              Media
            </Button>
            <Button variant='text' size='large'>Tasks</Button>  
            <Button variant='text' size='large'>Edit</Button>            
          </div>
        </CardActions>
        <MediaCarousel/>
        <div className='property-item__header'>
          <CardHeader
            title={property.details?.title}
            subheader={property.details?.address}
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
        <Collapsable expanded={expanded} />
        <Status />
        <CardContent sx={cardContentSx} >
          <Typography 
            width={'100%'}
            variant='h5'
            component='div'
            paddingBottom={2}
            borderBottom={'solid 1px'}
          >
            Comments&nbsp;
            {property?.messages?.length > 0 && (
              `(${property?.messages.length})`
            )}
          </Typography>
          <MessageBox />
        </CardContent>
      </Card>
    </Box>
  );
}