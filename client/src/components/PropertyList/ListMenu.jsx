import { useState } from 'react';
import ListPanel from "./ListPanel";
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import PropertyDetail from '../Property/PropertyDetail';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import { useSelector } from 'react-redux';

import { 
  Routes, 
  Route, 
  useNavigate,
  Link, 
  useParams 
} from 'react-router-dom';

export default function ListMenu() {
  const app = useSelector((state) => state.app.value);
  const id = parseInt(useParams().id);
  const [value, setValue] = useState(0);

  const navigate = useNavigate();


  
  const listItems = app.properties?.map((property, i) => (
    <ListPanel

      index={i}
      value={value}
      property={property}
      id={id}
    />
  ));

  const listSelections = app.properties?.map((property, i) => {
    const agent = app?.agents.find((user) => user?.user_id === property?.seller_id);
    
    return (
        <>
          <ListItem 
            className='property-list-item'
            alignItems="flex-start"
            onClick={() => {setValue(i)}}
            key={`list-menu-${i}`}
            id={`list-menu-${i}`}
            aria-controls={`list-item-${i}`}
          >
            <ListItemAvatar>
              <Avatar alt="agent" src={agent?.picture} />
            </ListItemAvatar>
            <div>
            <ListItemText
              primary={<Link to={`/property/${property.id}`} >{`LIST-${property.id}`}</Link>}
            />
              <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                {property.title}
              </Typography>
            </div>
          </ListItem>
        <Divider variant="inset" component="li" />
      </>
)});

  return (
    <div className="list-menu">
      <div className="list-menu__items">
        <List>
          {listSelections}
        </List>
      </div>
      <div className="list-menu__info">
        {value === false && (
          <></>
        )}
        {listItems}
      </div>
    </div>
  )
}