import { useEffect, useState, useMemo } from 'react';
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

export default function TransactionForm(props) {
	const app = useSelector((state) => state.app.value);
	const user = useSelector((state) => state?.user?.value);
	const { open, onClose, listingId, transaction } = props;

	const { updateTransaction, createTransaction } = useTransactionsForm();

	const initialForm = useMemo(
		() => ({
			agent_id: user?.sub,
			transaction_type: '',
			start_date: new Date(),
			end_date: null,
			notes: '',
			status: 'Pending',
			transaction_value: false,
			listing_id: listingId ? listingId : '',
			market_value: false || null
		}),
		[listingId, user?.sub]
	);

	const initialMode = transaction?.id ? false : true;
	const [edit, setEdit] = useState(initialMode);
	const [form, setForm] = useState(initialForm);
	const agent = app?.agents?.find((a) => a?.user_id === form?.agent_id);

	useEffect(() => {
		if (transaction) {
			let transactionForm = { ...initialForm };
			Object.keys(transactionForm).forEach((key) => {
				if (transaction[key]) {
					transactionForm[key] = transaction[key];
				}
			});

			setForm({ ...transactionForm, id: transaction?.id, organization_id: transaction?.organization_id });
		}
	}, [transaction, initialForm]);

	const handleClose = () => {
		setForm(initialForm);
		onClose();
	};

	const handleClickEdit = () => {
		edit ? setEdit(false) : setEdit(true);
	};

	const handleCancel = () => {
		transaction?.id ? setEdit(false) : handleClose();
	};

	const setStartDate = (input) => {
		let data = { ...form };
		data.start_date = input;
		setForm({ ...data });
	};

	const setEndDate = (input) => {
		let data = { ...form };
		data.end_date = input;
		setForm({ ...data });
	};

	const validate = () => {
		let valid = true;

		Object.keys(form)
			.slice(0, 7)
			.forEach((key) => {
				if (!form[key]) {
					valid = false;
				}
			});

		if (valid && transaction?.id) {
			updateTransaction({ ...form });
			handleClose();
		} else if (valid && !transaction?.id) {
			createTransaction({ ...form });
			handleClose();
		}
	};

	return (
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
									let newForm = { ...form };
									newForm.agent_id = agent?.user_id;
									setForm(newForm);
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
								value={form.listing_id}
								onChange={(event) => setForm({ ...form, listing_id: event.target.value })}>
								{app?.properties?.map((property) => (
									<MenuItem key={`transaction-form-status-${property?.id}`} value={property?.id}>
										LIST-{property?.id}
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item xs={6}>
							<TextField variant='standard' select label='Status' size='small' fullWidth margin='normal' value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}>
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
								value={form.transaction_type}
								onChange={(event) => setForm({ ...form, transaction_type: event.target.value })}>
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
										setForm({ ...form, transaction_value: floatValue });
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
										value={form.market_value}
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
											setForm({ ...form, market_value: floatValue });
										}}
									/>
								</FormControl>
							</Grid>
						)}
						<Grid item xs={12}>
							<FormControl variant='standard' fullWidth>
								<InputLabel>Notes</InputLabel>
								<Input multiline rows={3} value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} />
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
									<Tooltip title={agent?.name}>
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
	);
}
