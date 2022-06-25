import './styles.scss';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

import { useSelector } from 'react-redux';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ListItem(props) {
  const app = useSelector((state) => state.app.value);
  const agent = app?.agents.find((user) => user?.user_id === props.property?.seller_id);

  return (
    <Item className="list-item">

      <div
        className="list-item__image"
        onClick={() => props.setProperty({...props.property})}
      >
        <img src={props.property?.cover_image_url} alt="cover" />
      </div>

      <section className='list-item__info'>
        <div className="list-item__detail">
          <Typography
            className='list-item__info-title'
            variant='h6'
            component="h3"
            gutterBottom
            onClick={() => props.setProperty({...props.property})}
          >
            {props.property?.title}
          </Typography>
          <Typography variant='h7' gutterBottom component="p">
            {props.property?.address}, {props.property?.zip_code}
          </Typography>
          <Typography variant='body' gutterBottom component="b" sx={{mt: "0.5rem"}}>
            Status: {props.property?.status}&emsp;
            Type: {props.property?.property_type}&emsp;
          </Typography>
        </div>
        <div className="list-item__status">
          <AvatarGroup spacing={10}>
            <Tooltip disableFocusListener title={agent?.name} >
              <Avatar src={agent?.picture} alt='agent'/>
            </Tooltip>
          </AvatarGroup>
        </div>
      </section>
    </Item>
  );
};