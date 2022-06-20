import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

import './styles.scss';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ListItem(props) {
  return (
    <Item className="list-item">
      <div
        className="list-item__image"
        onClick={() => props.setProperty({...props.property})}
      >
        <img src={props.property.cover_image_url} alt="cover" />
      </div>
      <div className="list-item__info">
        <Typography
          className='list-item__info-title'
          variant='body'
          component="b"
          gutterBottom
          onClick={() => props.setProperty({...props.property})}
        >
          {props.property.title}
        </Typography>
        <Typography variant='body' gutterBottom component="p">
          {props.property.address}, {props.property.zip_code}
        </Typography>
        <Typography variant='body' gutterBottom component="b" sx={{mt: "0.5rem"}}>
          Status: {props.property.status}&emsp;
          Type: {props.property.property_type}&emsp;
        </Typography>
      </div>
      <div className="list-item__status">
        <AvatarGroup spacing={10}>
          <Tooltip disableFocusListener title={props.agent.name} >
            <Avatar src={props.agent.picture} alt='agent'/>
          </Tooltip>
        </AvatarGroup>
      </div>
    </Item>
  );
};