import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import BedIcon from '@mui/icons-material/Bed';
import BathroomIcon from '@mui/icons-material/Bathroom';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import KitchenIcon from '@mui/icons-material/Kitchen';

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
      <div className="list-item__detail">
        <p><b>Type:</b> {props.property_type}</p>
        <p><b>Size:</b> {props.size} sqft</p>
      </div>
      <div className="list-item__detail">
        <div className="list-item__detail list-item__detail--space">
          <BedIcon sx={{fontSize: "xlarge"}}/>
          <p><b>{props.number_of_bedrooms}</b></p>
        </div>
        <div className="list-item__detail list-item__detail--space">
          <BathroomIcon sx={{fontSize: "xlarge"}}/>
          <p><b>{props.number_of_bathrooms}</b></p>
        </div>
      </div>
      <div className="list-item__detail">
        <div className="list-item__detail list-item__detail--space">
          <DirectionsCarIcon sx={{fontSize: "xlarge"}}/>
          <p><b>{props.parking_space}</b></p>
        </div>
        <div className="list-item__detail list-item__detail--space">
          <KitchenIcon sx={{fontSize: "xlarge"}}/>
          <p><b>{1}</b></p>
        </div>
      </div>
      <div className="list-item__price">
        <b>${props.price}</b>
        <p><b>{props.status}</b></p>
      </div>
    </Item>
  );
};