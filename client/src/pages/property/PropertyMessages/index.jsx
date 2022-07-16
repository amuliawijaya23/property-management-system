import { useRef } from 'react';

import { Grid, List, Button } from '@mui/material';

import SendIcon from '@mui/icons-material/Send';
import Messages from './Messages';
import { Editor } from '@tinymce/tinymce-react';

import { useSelector } from 'react-redux';

import useSendMessage from '../hooks/useSendMessage';

export default function PropertyMessages() {
	const { sendMessage } = useSendMessage();

	const user = useSelector((state) => state?.user?.value);
	const property = useSelector((state) => state?.property?.value);

	const editorRef = useRef(null);

	const clickHandler = () => {
		if (editorRef.current) {
			const message = {
				message: editorRef.current.getContent(),
				listing_id: property?.details?.id,
				organization_id: user?.org_id,
				sender_id: user?.sub
			};
			sendMessage(message);
			editorRef.current.setContent('');
		}
	};

	const messages = property?.messages ? property?.messages?.map((message, i) => <Messages key={`message-${i}`} message={message} />) : <></>;

	return (
		<Grid container spacing={1}>
			<Grid item xs={12}>
				<List
					key={'message-box'}
					className='message-box'
					sx={{
						display: 'flex',
						flexDirection: 'column-reverse',
						textAlign: 'revert',
						width: '100%',
						height: '25rem',
						bgcolor: 'background.paper',
						overflow: 'auto'
					}}>
					{messages}
				</List>
			</Grid>
			<Grid item xs={12}>
				<Editor
					apiKey={process.env.REACT_APP_TMCE_KEY}
					onInit={(evt, editor) => (editorRef.current = editor)}
					initialValue='<p>Write a note...</p>'
					init={{
						width: '100%',
						height: 300,
						statusbar: false,
						menubar: false,
						plugins: [
							'advlist',
							'autolink',
							'lists',
							'link',
							'image',
							'charmap',
							'anchor',
							'searchreplace',
							'visualblocks',
							'code',
							'fullscreen',
							'insertdatetime',
							'media',
							'table',
							'preview',
							'help',
							'wordcount',
							'emoticons'
						],
						toolbar: 'blocks | bold italic forecolor | ' + 'alignleft aligncenter ' + 'alignright alignjustify | bullist numlist outdent indent | ' + 'link table | ' + 'emoticons ',
						table_toolbar: 'tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',
						content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
					}}
				/>
				<Grid item container justifyContent='flex-end'>
					<Button variant='contained' endIcon={<SendIcon />} onClick={clickHandler}>
						Send
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
}
