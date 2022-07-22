import { useState } from 'react';
import { Box, Modal, Grid, FormControl, Input, InputLabel, TextField, MenuItem, Autocomplete, Avatar, Typography, Button, Tooltip } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { useSelector } from 'react-redux';
import format from 'date-fns/format';
import NumberFormat from 'react-number-format';
import useTransactionsForm from './hooks/useTransactionForm';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4
};

export default function TransactionForm({ open, listingId, transaction, onClose, setAlert, alert, setTransaction }) {
	const app = useSelector((state) => state.app.value);
	const { form, setStartDate, setEndDate, handleCloseReset, setValue, setInput, updateTransaction, createTransaction } = useTransactionsForm(transaction);
	const initialMode = transaction?.id ? false : true;
	const [edit, setEdit] = useState(initialMode);

	const agent = app?.agents?.find((a) => a?.user_id === form?.agent_id);

	const handleClickEdit = () => {
		edit ? setEdit(false) : setEdit(true);
	};

	const handleClose = () => {
		handleCloseReset();
		onClose();
	};

	const handleCancel = () => {
		transaction?.id ? setEdit(false) : handleClose();
	};

	const validate = () => {
		let valid = true;

		Object.keys(form)
			.slice(0, 5)
			.forEach((key) => {
				if (!form[key]) {
					valid = false;
					setAlert({ ...alert, open: true, message: `${key[0].toUpperCase() + key.split('_').join(' ').substring(1)} is Required` });
				}
			});

		if (valid && transaction?.id) {
			updateTransaction({ ...form });
			setTransaction({ ...form });
			setAlert({ ...alert, open: true, message: `Transaction TRX-${transaction?.id} Updated!`, severity: 'success' });
			handleCancel();
		} else if (valid && !transaction?.id) {
			createTransaction({ ...form });
			setTransaction({ ...form });
			setAlert({ ...alert, open: true, message: `Transaction Created!`, severity: 'success' });
			handleCancel();
		}
	};

	return (
		<>
			<Modal open={open} onClose={handleClose}>
				<Box sx={style}>
					{edit && (
						<Grid container spacing={1} alignItems='center'>
							<Grid item xs={12} sx={{ mt: 2 }}>
								<Autocomplete
									sx={{ mb: 2, mt: 2 }}
									value={agent?.name || ''}
									onChange={(event, newValue) => {
										const agent = app?.agents?.find((a) => a?.name === newValue);
										setValue(agent?.user_id, 'agent_id');
									}}
									options={app?.agents?.filter((agent) => agent?.user_id !== transaction?.agent_id).map((option) => option?.name)}
									freeSolo
									renderInput={(params) => <TextField {...params} variant='standard' label='Agents' placeholder='Search Agents' />}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									disabled={listingId ? true : false}
									variant='standard'
									select
									label='Listing'
									size='small'
									fullWidth
									margin='normal'
									value={form?.listing_id}
									onChange={(event) => setInput(event, 'listing_id')}>
									<MenuItem value={false}>None</MenuItem>
									{app?.properties?.map((property) => (
										<MenuItem key={`transaction-form-status-${property?.id}`} value={property?.id}>
											LIST-{property?.id}
										</MenuItem>
									))}
								</TextField>
							</Grid>
							<Grid item xs={6}>
								<TextField variant='standard' select label='Status' size='small' fullWidth margin='normal' value={form?.status} onChange={(event) => setInput(event, 'status')}>
									{['Pending', 'Closed', 'Active', 'Canceled'].map((status) => (
										<MenuItem key={`transaction-form-status-${status}`} value={status}>
											{status}
										</MenuItem>
									))}
								</TextField>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant='standard'
									select
									label='Transaction'
									size='small'
									fullWidth
									margin='normal'
									value={form?.transaction_type}
									onChange={(event) => setInput(event, 'transaction_type')}>
									{['Deposit', 'Sale', 'Lease', 'Expense'].map((transaction) => (
										<MenuItem key={`transaction-form-transaction-${transaction}`} value={transaction}>
											{transaction}
										</MenuItem>
									))}
								</TextField>
							</Grid>
							<Grid item xs={12}>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DesktopDatePicker
										label='Date'
										inputFormat='MM/dd/yyyy'
										value={form?.start_date}
										onChange={setStartDate}
										renderInput={(params) => <TextField variant='standard' {...params} fullWidth />}
									/>
								</LocalizationProvider>
							</Grid>
							{form?.transaction_type === 'Lease' ||
								(form?.transaction_type === 'Deposit' && (
									<Grid item xs={12}>
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<DesktopDatePicker
												label='End Date'
												inputFormat='MM/dd/yyyy'
												value={form?.end_date}
												onChange={setEndDate}
												renderInput={(params) => <TextField variant='standard' {...params} fullWidth />}
											/>
										</LocalizationProvider>
									</Grid>
								))}
							<Grid item xs={12}>
								<FormControl variant='standard' fullWidth>
									<InputLabel>Amount</InputLabel>
									<NumberFormat
										type='text'
										value={form?.transaction_value}
										customInput={Input}
										variant='standard'
										thousandSeparator={','}
										decimalSeparator={'.'}
										decimalScale={2}
										fixedDecimalScale={true}
										prefix='$ '
										autoComplete='off'
										onValueChange={(values) => {
											const { floatValue } = values;
											setValue(floatValue, 'transaction_value');
										}}
									/>
								</FormControl>
							</Grid>
							{form?.transaction_type === 'Sale' && (
								<Grid item xs={12}>
									<FormControl variant='standard' fullWidth>
										<InputLabel>Market Value</InputLabel>
										<NumberFormat
											type='text'
											value={form?.market_value}
											customInput={Input}
											variant='standard'
											thousandSeparator={','}
											decimalSeparator={'.'}
											decimalScale={2}
											fixedDecimalScale={true}
											prefix='$ '
											autoComplete='off'
											onValueChange={(values) => {
												const { floatValue } = values;
												setValue(floatValue, 'market_value');
											}}
										/>
									</FormControl>
								</Grid>
							)}
							<Grid item xs={12}>
								<FormControl variant='standard' fullWidth>
									<InputLabel>Notes</InputLabel>
									<Input multiline rows={3} value={form?.notes} onChange={(event) => setInput(event, 'notes')} />
								</FormControl>
							</Grid>
							<Grid item xs={12} sx={{ mt: 1 }}>
								<Button variant='contained' sx={{ mr: 1 }} onClick={validate}>
									{transaction?.id ? 'Update' : 'Create'}
								</Button>
								<Button variant='contained' onClick={handleCancel}>
									Cancel
								</Button>
							</Grid>
						</Grid>
					)}
					{!edit && (
						<Grid container spacing={1}>
							<Grid item container justifyContent='center' alignItems='center'>
								<Grid item xs={9}>
									<Typography variant='body1' component='div'>
										Transaction TRX-{transaction?.id}
									</Typography>
								</Grid>
								<Grid item xs={3}>
									<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
										<Button onClick={handleClickEdit}>Edit</Button>
									</Box>
								</Grid>
								<Grid item xs={12}>
									<Typography variant='caption' component='div'>
										Status: <b>{transaction?.status}</b>
									</Typography>
								</Grid>
							</Grid>
							{transaction?.agent_id && (
								<Grid item container justifyContent='center' alignItems='center' sx={{ mb: 2 }}>
									<Grid item xs={2}>
										<Tooltip title={agent?.name || ''}>
											<Avatar src={agent?.picture} alt='agent' />
										</Tooltip>
									</Grid>
									<Grid item xs={10}>
										<Typography variant='caption' component='div'>
											{agent?.name}
										</Typography>
									</Grid>
								</Grid>
							)}
							<Grid item xs={6}>
								<Typography variant='caption' component='div'>
									Listing: <b>LIST-{listingId}</b>
								</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography variant='caption' component='div'>
									Type: <b>{transaction?.transaction_type}</b>
								</Typography>
							</Grid>

							{transaction?.start_date && (
								<Grid item xs={6}>
									<Typography variant='caption' component='div'>
										Date: {format(new Date(transaction?.start_date), 'PP')}
									</Typography>
								</Grid>
							)}
							{transaction?.end_date && (
								<Grid item xs={6}>
									<Typography variant='caption' component='div'>
										End Date: {format(new Date(transaction?.end_date), 'PP')}
									</Typography>
								</Grid>
							)}
							<Grid item xs={6}>
								<Box sx={{ display: 'flex' }}>
									<Typography variant='caption' component='div'>
										Amount:
										<b>
											<NumberFormat
												value={transaction?.transaction_value}
												thousandSeparator={','}
												decimalScale={2}
												fixedDecimalScale={true}
												decimalSeparator={'.'}
												displayType='text'
												prefix=' $ '
												renderText={(value) => <>{value}</>}
											/>
										</b>
									</Typography>
								</Box>
							</Grid>
							<Grid item xs={12} sx={{ mt: 2 }}>
								<Typography variant='caption' component='div'>
									Notes:
								</Typography>
								<Typography variant='caption' component='div'>
									{transaction?.notes}
								</Typography>
							</Grid>
						</Grid>
					)}
				</Box>
			</Modal>
		</>
	);
}
