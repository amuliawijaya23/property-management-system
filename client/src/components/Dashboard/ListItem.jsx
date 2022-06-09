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
        <p>Address: {props.street_address} {props.city} {props.province} {props.postal_code}</p>
      </div>
      <div className="list-item__info">
        <p>Property Type: {props.property_type}</p>
        <p>Size: {props.size} sqft</p>
      </div>
      <div className="list-item__info">
      <p>Bedrooms: {props.number_of_bedrooms}</p>
      <p>Bathrooms: {props.number_of_bathrooms}</p>
      </div>
      <div className="list-item__info">
      <p>Parking: {props.parking_space}</p>
      <p>Status: {props.status}</p>
      </div>
    </Item>
  );
};