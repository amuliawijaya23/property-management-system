/* eslint-disable no-useless-concat */
import { useRef, useState } from 'react';
import { Grid, Box, Chip, Input, Button, InputLabel, FormControl, Select, MenuItem, TextField, Autocomplete, CircularProgress } from '@mui/material';

import SendIcon from '@mui/icons-material/Send';

import { Editor } from '@tinymce/tinymce-react';

import { useSelector } from 'react-redux';

import useOutreachData from './hooks/useOutreachData';

const initialState = {
	to: [],
	cc: [],
	bcc: [],
	subject: ''
};

export default function Outreach() {
	const user = useSelector((state) => state.user.value);
	const app = useSelector((state) => state.app.value);

	const { generateColdEmail, sendColdEmail } = useOutreachData();

	const [state, setState] = useState(initialState);
	const [loading, setLoading] = useState(false);
	const [service, setService] = useState('Buyer');

	const editorRef = useRef(null);

	const clickHandler = async () => {
		if (editorRef.current && state.to.length > 0 && state.subject) {
			const message = editorRef.current.getContent();

			let email = {
				from: user.email,
				text: message,
				html: message,
				subject: state.subject
			};

			Object.keys(state)
				.slice(0, 2)
				.forEach((key) => {
					if (state[key].length > 0) email[key] = state[key].map((contact) => contact.split(' - ')[1]);
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
		setLoading(true);
		try {
			const email = await generateColdEmail(service);
			await editorRef.current.setContent(`${email}`);
			setLoading(false);
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	};

	const handleChange = (event) => {
		setService(event.target.value);
	};

	const stateToOptions = app.contacts
		.filter((contact) => !state.cc.map((recepient) => recepient.split(' - ')[1]).includes(contact.email) && !state.bcc.map((recepient) => recepient.split(' - ')[1]).includes(contact.email))
		.map((contact) => `${contact?.last_name}, ${contact?.first_name} - ${contact?.email}`);

	const stateCcOptions = app.contacts
		.filter((contact) => !state.to.map((recepient) => recepient.split(' - ')[1]).includes(contact.email) && !state.bcc.map((recepient) => recepient.split(' - ')[1]).includes(contact.email))
		.map((contact) => `${contact?.last_name}, ${contact?.first_name} - ${contact?.email}`);

	const stateBccOptions = app.contacts
		.filter((contact) => !state.to.map((recepient) => recepient.split(' - ')[1]).includes(contact.email) && !state.cc.map((recepient) => recepient.split(' - ')[1]).includes(contact.email))
		.map((contact) => `${contact?.last_name}, ${contact?.first_name} - ${contact?.email}`);

	return (
		<Box sx={{ display: 'flex', width: '100%', mt: 15, justifyContent: 'center' }}>
			<Grid container justifyContent='center'>
				<Grid item xs={11} md={9}>
					<Grid container spacing={1} justifyContent='center' alignItems='center'>
						<Grid item xs={12}>
							<Autocomplete
								value={state.to}
								disableCloseOnSelect
								onChange={(event, newValue) => setState({ ...state, to: newValue })}
								multiple
								options={stateToOptions}
								freeSolo
								renderTags={(value, getTagProps) => value.map((option, index) => <Chip variant='outlined' label={option} {...getTagProps({ index })} />)}
								renderInput={(params) => <TextField {...params} variant='standard' label='To' />}
							/>
						</Grid>
						<Grid item xs={12}>
							<Autocomplete
								value={state.cc}
								disableCloseOnSelect
								onChange={(event, newValue) => setState({ ...state, cc: newValue })}
								multiple
								options={stateCcOptions}
								freeSolo
								renderTags={(value, getTagProps) => value.map((option, index) => <Chip variant='outlined' label={option} {...getTagProps({ index })} />)}
								renderInput={(params) => <TextField {...params} variant='standard' label='Cc' />}
							/>
						</Grid>
						<Grid item xs={12}>
							<Autocomplete
								value={state.bcc}
								disableCloseOnSelect
								onChange={(event, newValue) => setState({ ...state, bcc: newValue })}
								multiple
								options={stateBccOptions}
								freeSolo
								renderTags={(value, getTagProps) => value.map((option, index) => <Chip variant='outlined' label={option} {...getTagProps({ index })} />)}
								renderInput={(params) => <TextField {...params} variant='standard' label='Bcc' />}
							/>
						</Grid>
						<Grid item xs={12} sx={{ mt: 1 }}>
							<FormControl variant='standard' fullWidth>
								<InputLabel>Subject</InputLabel>
								<Input value={state.subject} id='email-recepienct' onChange={(event) => setState({ ...state, subject: event.target.value })} />
							</FormControl>
						</Grid>
						<Grid item xs={12} sx={{ mt: 2 }}>
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
						</Grid>
						<Grid item xs={12}>
							<Grid container sx={{ mt: 4.5 }}>
								<Grid item xs={8}>
									<Box sx={{ display: 'flex', height: '100%' }}>
										<FormControl>
											<InputLabel id='demo-simple-select-label'>Service</InputLabel>
											<Select labelId='demo-simple-select-label' id='demo-simple-select' value={service} label='Service' onChange={handleChange}>
												<MenuItem value={'Renter'}>Renter</MenuItem>
												<MenuItem value={'Buyer'}>Buyer</MenuItem>
												<MenuItem value={'Seller'}>Seller</MenuItem>
											</Select>
										</FormControl>
										<Button sx={{ ml: 1, minWidth: 100 }} onClick={() => generateHandler(service)} variant='contained'>
											{loading ? <CircularProgress color='inherit' /> : 'Generate'}
										</Button>
									</Box>
								</Grid>
								<Grid item xs={4}>
									<Box sx={{ height: '100%', display: 'flex', justifyContent: 'flex-end' }}>
										<Button variant='contained' endIcon={<SendIcon />} onClick={clickHandler}>
											Send
										</Button>
									</Box>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
}
