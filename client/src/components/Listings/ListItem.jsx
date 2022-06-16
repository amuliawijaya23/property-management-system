import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

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
        <b>{props.title}</b>
        <p>{props.street_address} {props.city} {props.province} {props.postal_code}</p>
      </div>
      <div className="list-item__status">
        <img src={props.agent.picture} alt="agent" className='list-item__agent'/>
        <p><b>{props.status}</b></p>
      </div>
    </Item>
  );
};