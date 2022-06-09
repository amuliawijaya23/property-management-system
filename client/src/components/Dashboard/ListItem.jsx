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
        <p><b>Address:</b> {props.street_address} {props.city} {props.province} {props.postal_code}</p>
      </div>
      <div className="list-item__detail">
        <p><b>Type:</b> {props.property_type}</p>
        <p><b>Size:</b> {props.size} sqft</p>
      </div>
      <div className="list-item__detail">
        <p><b>Bedrooms:</b> {props.number_of_bedrooms}</p>
        <p><b>Bathrooms:</b> {props.number_of_bathrooms}</p>
      </div>
      <div className="list-item__detail">
        <p><b>Parking:</b> {props.parking_space}</p>
        <p><b>Status:</b> {props.status}</p>
      </div>
      <div className="list-item__price">
        <b>$ 650000</b>
      </div>
    </Item>
  );
};