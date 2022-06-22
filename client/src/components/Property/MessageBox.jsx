import { useState, useRef } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import ReactHtmlParser from 'react-html-parser';
import SendIcon from '@mui/icons-material/Send';

import { Editor } from '@tinymce/tinymce-react';

import './styles.scss';

export default function MessageBox(props) {
  const editorRef = useRef(null);

  const clickHandler = () => {
    if(editorRef.current) {
      const message = {
        message: editorRef.current.getContent(),
        listing_id: props.property.details.id,
        organization_id: props.user.org_id,
        sender_id: props.user.sub
      }
      props.onSend(message);
      editorRef.current.setContent('');
    }
  };

  const messages = props.messages?.map((message, i) => {
    const sender = props.agents?.find((agent) => agent.user_id === message.sender_id);
    const isUser = sender.user_id === props.user.sub;
    const direction = isUser ? 'row' : 'row reverse';
    const alignment = isUser? 'start' : 'end';

    return (
      <>
        <ListItem
          className='message-component'
          key={`message-${i}`}
          sx={{flexDirection: {direction}, textAlign: {alignment}}}
        >
          <ListItemAvatar className='message-component__avatar'>
            <Avatar alt="agent" src={sender.picture} />
          </ListItemAvatar>
          <section className='message-component__content'>
            <ListItemText
              sx={{mr: 2}}
              primary={sender.name}
              secondary={message.created_at}
            />
            {ReactHtmlParser(message.message)}
          </section>
        </ListItem>
        <Divider variant='inset' component='li'/>
      </>
  )});

  return (
    <>
      <List 
        className='message-box'
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
      <Editor
        apiKey={process.env.REACT_APP_TMCE_KEY}
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue='<p>Write a note...</p>'
        init={{
          width: '100%',
          height: 300,
          statusbar: false,
          menubar: false,
          plugins: [
            'advlist', 'advcode', 'autolink', 'lists', 'link', 'image', 'charmap',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount', 'emoticons', 'mentions'
          ],
          toolbar: 'code | blocks | bold italic forecolor | ' +
          'alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'link table | ' + 
          'emoticons ',
          table_toolbar: 'tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <div className= 'message-component__button'>
        <Button
          variant='contained'
          endIcon={<SendIcon />}
          onClick={clickHandler}
        >
          Send
        </Button>
      </div>
    </>
  );
};