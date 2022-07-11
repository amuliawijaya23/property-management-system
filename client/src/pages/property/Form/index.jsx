import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Tooltip from '@mui/material/Tooltip';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import AddIcon from '@mui/icons-material/Add';

import { useSelector } from 'react-redux';

export default function PropertyUpdate(props) {
	const { open, onClose, property } = props;
	const app = useSelector((state) => state.app.value);
	// const property = useSelector((state) => state.property.value);
	const seller = app.agents?.find((agent) => agent.user_id === property.details?.seller_id);
	const [form, setForm] = useState({ ...property?.details });

	const watchers = property.watchers.map((watcher) => watcher.user_id);
	const options = app.agents.filter((agent) => !watchers.includes(agent.user_id) && agent.user_id !== property.details.seller_id);

	const setTextField = (event, field) => {
		let newForm = { ...form };
		newForm[field] = event.target.value;
		setForm(newForm);
	};

	console.log('form is', form);

	return (
		<Drawer anchor='right' open={open} onClose={onClose} PaperProps={{ sx: { width: '60%' } }}>
			<Box sx={{ padding: 3 }}>
				<Grid container spacing={2}>
					<Grid item md={12} xs={12}>
						<FormControl variant='standard' fullWidth>
							<Input
								value={form.title}
								onChange={(event) => setForm({ ...form, title: event.target.value })}
								id='property-form-title'
								startAdornment={<InputAdornment position='start'>LIST-{property.details.id}</InputAdornment>}
							/>
						</FormControl>
					</Grid>
					<Grid item md={6} xs={12}>
						<Typography variant='h7' component='div'>
							Assigned To:
						</Typography>
						<Tooltip title={seller?.name}>
							<Avatar src={seller?.picture} alt='seller' sx={{ mt: 1 }} />
						</Tooltip>
					</Grid>
					<Grid item md={6} xs={12}>
						<Typography variant='h7' component='div'>
							Watchers:
						</Typography>
						<AvatarGroup sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
							{watchers.map((user) => {
								const watcher = app?.agents.find((agent) => agent?.user_id === user);
								return (
									<Tooltip title={watcher?.name}>
										<Avatar src={watcher?.picture} alt='watcher' />
									</Tooltip>
								);
							})}
						</AvatarGroup>
					</Grid>
					<Grid item md={6} xs={12}>
						<TextField
							variant='standard'
							select
							label='Service'
							value={form.service_type}
							onChange={(event) => setForm({ ...form, service_type: event.target.value })}
							size='small'
							fullWidth
							margin='normal'>
							{['Selling', 'Renting'].map((type) => (
								<MenuItem key={`property-form-service-menu-${type}`} value={type}>
									{type}
								</MenuItem>
							))}
						</TextField>
					</Grid>
					<Grid item md={6} xs={12}>
						<TextField
							variant='standard'
							select
							label='Type'
							value={form.property_type}
							onChange={(event) => setForm({ ...form, property_type: event.target.value })}
							size='small'
							fullWidth
							margin='normal'>
							{['House', 'Apartment', 'Townhouse', 'Penthouse', 'Ruko'].map((type) => (
								<MenuItem key={`property-form-type-menu-${type}`} value={type}>
									{type}
								</MenuItem>
							))}
						</TextField>
					</Grid>
					<Grid item md={12} xs={12}>
						<FormControl variant='standard' fullWidth>
							<InputLabel>Address</InputLabel>
							<Input value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })} id='property-form-address' />
						</FormControl>
					</Grid>
					<Grid item md={12} xs={12}>
						<TextField
							label={'Description'}
							value={form.description}
							onChange={(event) => setForm({ ...form, description: event.target.value })}
							size='small'
							margin='dense'
							multiline={true}
							rows={5}
							fullWidth
							variant='standard'
						/>
					</Grid>
				</Grid>
			</Box>
		</Drawer>
	);
}
