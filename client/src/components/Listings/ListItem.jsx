import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
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
      <div className="list-item__image">
        <img src={props.cover_image_url} alt="cover" />
      </div>
      <div className="list-item__info">
        <Typography variant='body' gutterBottom component="b">
          {props.title}
        </Typography>
        <Typography variant='body' gutterBottom component="p">
          {props.street_address} {props.city} {props.province} {props.postal_code}
        </Typography>
      </div>
      <div className="list-item__status">
        <Tooltip disableFocusListener title={props.agent.name} >
          <img src={props.agent.picture} alt="agent" className='list-item__agent'/>
        </Tooltip>
        <Typography variant='body' gutterBottom component="b" sx={{mt: "0.5rem"}}>
          {props.status}
        </Typography>
      </div>
    </Item>
  );
};