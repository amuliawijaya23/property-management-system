import { useState } from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import StepContent from '@mui/material/StepContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

import DateTimeSelector from '../DateTimeSelector';

import { useSelector } from 'react-redux';

export default function TaskFormInformation(props) {
	const app = useSelector((state) => state.app.value);
	const [error, setError] = useState('');
	const stringField = Object.keys(props.form)
		.slice(0, 2)
		.map((field) => (
			<TextField
				key={`form-${field}`}
				required={error && !props.form[field] ? true : false}
				error={error && !props.form[field] ? true : false}
				helperText={error && !props.form[field] ? 'Required' : field === 'notes' ? 1000 - props.form[field].length : ''}
				label={field[0].toUpperCase() + field.substring(1)}
				id={`form-${field}`}
				value={props.form[field]}
				onChange={props.setTextField(field)}
				size='small'
				margin='dense'
				multiline={field === 'notes'}
				rows={5}
				fullWidth
			/>
		));
	return (
		<StepContent>
			{stringField}
			<TextField
				required={error && !props.form.category ? true : false}
				error={error && !props.form.category ? true : false}
				helperText={error && !props.form.category ? 'Required' : ''}
				id='form-category'
				select
				label='Category'
				value={props.form.category}
				onChange={props.setTextField('category')}
				size='small'
				fullWidth
				margin='normal'>
				{['Open House', 'Call', 'Meeting', 'Follow Up'].map((option) => (
					<MenuItem key={option} value={option}>
						{option}
					</MenuItem>
				))}
			</TextField>
			<DateTimeSelector setDate={props.setDueDate} form={props.form} />
			<Typography variant='h7' component='body' sx={{ mt: 2 }} fullWidth>
				Assign Agent
			</Typography>
			<AvatarGroup spacing={'medium'} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
				{app.agents.map((agent) => (
					<Tooltip title={agent.name}>
						<Avatar alt='' src={agent.picture} sx={{ cursor: 'pointer' }} onClick={() => props.assignAgent(agent.user_id)} />
					</Tooltip>
				))}
			</AvatarGroup>
			<Button variant='contained' onClick={() => props.setActiveStep((prev) => prev + 1)} sx={{ mt: 2 }}>
				Next
			</Button>
		</StepContent>
	);
}
