import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import './styles.scss';

export default function MessageBox(props) {
  const [text, setText] = useState('')

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const messages = props.messages?.map((message, i) => {
    const sender = props.agents?.find((agent) => agent.user_id === message.sender_id);
    const isUser = sender.user_id === props.user.sub;
    const direction = isUser ? 'row' : 'row reverse';
    const alignment = isUser? 'start' : 'end';

    return ( 
    <ListItem
      key={`message-${i}`}
      sx={{flexDirection: {direction}, textAlign: {alignment}}}
    >
      <ListItemAvatar className='comment-avatar'>
        <Avatar alt="agent" src={sender.picture} />
      </ListItemAvatar>
      <ListItemText
        sx={{mr: 2}}
        primary={sender.name}
        secondary={
          <>
            <Typography
              sx={{ display: 'flex' }}
              component="span"
              variant="body2"
              color="text.primary"
              flexDirection={direction}
              textAlign={alignment}
            >
              {message.message}
            </Typography>
            {message.created_at}
          </>
        }
      />
    </ListItem>
  )});

  return (
    <>
      <List 
        sx={{ 
        display: 'flex',
        flexDirection: 'column-reverse',
        textAlign: 'revert',
        width: '100%',
        height: '25rem' ,
        bgcolor: 'background.paper',
        overflow: 'auto'
        }}
      >
        {messages}
      </List>
      <TextField
        id="outlined-multiline-static"
        multiline
        placeholder='Make a note...'
        rows={5}
        value={text}
        helperText={255 - text.length}
        onChange={handleChange}
        fullWidth
        on
      />
    </>
  );
};