import './styles.scss';
import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import { Editor } from '@tinymce/tinymce-react';

import { useSelector } from 'react-redux';

import useOutreachData from './hooks/useOutreachData';

const initialState = {
	to: '',
	cc: '',
	bcc: '',
	subject: ''
};

export default function Outreach(props) {
	const user = useSelector((state) => state.user.value);

	const { generateColdEmail, sendColdEmail } = useOutreachData();

	const [state, setState] = useState(initialState);

	const [service, setService] = useState('Seller');

	const editorRef = useRef(null);

	const clickHandler = async () => {
		if (editorRef.current && state.to && state.subject) {
			const message = editorRef.current.getContent();
			let email = {
				from: user.email,
				text: message,
				html: message
			};
			Object.keys(state).forEach((key) => {
				if (state[key]) email[key] = state[key];
			});

			try {
				await setState(initialState);
				await editorRef.current.setContent('');
				await sendColdEmail(email);
			} catch (error) {
				console.error(error);
			}
		}
	};

	const generateHandler = async (service) => {
		try {
			const email = await generateColdEmail(service);
			editorRef.current.setContent(`${email}`);
		} catch (error) {
			console.error(error);
		}
	};

	const handleChange = (event) => {
		setService(event.target.value);
	};

	return (
		<Box sx={{ width: '80%', marginTop: '2rem', alignItems: 'center' }}>
			<Stack spacing={3} sx={{ width: '100%', alignSelf: 'center' }}>
				<FormControl variant='standard' fullWidth>
					<Input value={state.to} onChange={(event) => setState({ ...state, to: event.target.value })} id='email-recepienct' startAdornment={<InputAdornment position='start'>To:</InputAdornment>} />
				</FormControl>
				<FormControl variant='standard' fullWidth>
					<Input value={state.cc} onChange={(event) => setState({ ...state, cc: event.target.value })} id='email-recepienct' startAdornment={<InputAdornment position='start'>Cc:</InputAdornment>} />
				</FormControl>
				<FormControl variant='standard' fullWidth>
					<Input
						value={state.bcc}
						onChange={(event) => setState({ ...state, bcc: event.target.value })}
						id='email-recepienct'
						startAdornment={<InputAdornment position='start'>Bcc:</InputAdornment>}
					/>
				</FormControl>
				<FormControl variant='standard' fullWidth>
					<Input
						value={state.subject}
						id='email-recepienct'
						onChange={(event) => setState({ ...state, subject: event.target.value })}
						startAdornment={<InputAdornment position='start'>Subject:</InputAdornment>}
					/>
				</FormControl>
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
							'advcode',
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
							'emoticons',
							'mentions'
						],
						toolbar: 'code | blocks | bold italic forecolor | ' + 'alignleft aligncenter ' + 'alignright alignjustify | bullist numlist outdent indent | ' + 'link table | ' + 'emoticons ',
						table_toolbar: 'tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',
						content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
					}}
				/>
				<div className='communications-actions'>
					<div className='communications-actions__generate'>
						<FormControl>
							<InputLabel id='demo-simple-select-label'>Service</InputLabel>
							<Select labelId='demo-simple-select-label' id='demo-simple-select' value={service} label='Service' onChange={handleChange}>
								<MenuItem value={'Buyer'}>Buyer</MenuItem>
								<MenuItem value={'Seller'}>Seller</MenuItem>
							</Select>
						</FormControl>
						<Button sx={{ ml: 1 }} onClick={() => generateHandler(service)} variant='contained'>
							Generate Email
						</Button>
					</div>
					<Button variant='contained' endIcon={<SendIcon />} onClick={clickHandler}>
						Send
					</Button>
				</div>
			</Stack>
		</Box>
	);
}
