import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import useVisualMode from '../../hooks/useVisualMode';
import { HIDDEN, SHOW } from '../../helper/modes';

export default function Listing(props) {
  const {mode, transition} = useVisualMode(HIDDEN);

  const handleExpandClick = () => {
    transition(SHOW);
  };

  return (
    <Card className='listing'>
      <CardHeader
        className='listing__header'
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="property">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.title}
        subheader="September 14, 2016"
      />
      <CardMedia
        className='listing__image'
        component="img"
        image={props.cover_image_url}
        alt={props.title}
      />
      <CardContent className='listing__content'>
        <Typography variant="body2" color="text.secondary">
          This impressive property is a perfect house to settle in together with your family.
        </Typography>
      </CardContent>
    </Card>
  )
};