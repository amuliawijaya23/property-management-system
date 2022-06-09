import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ListItem(props) {
  return (
    <Item>
      <div className="list-item">
        <img src={props.cover_image_url} alt="cover" />
        Address: {props.street_address} {props.city} {props.province} {props.postal_code}
        Type of Property: {props.property_type}
        Bedrooms: {props.number_of_bedrooms} Bathrooms: {props.number_of_bathrooms} Parking: {props.parking_space} Size: {props.size} sqft - {props.status}
      </div>
    </Item>
  );
};