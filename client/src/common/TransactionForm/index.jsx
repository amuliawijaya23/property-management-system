import { useEffect, useState } from 'react';
import { Box, Modal, Grid, FormControl, Input, InputLabel, TextField, MenuItem, AvatarGroup, Button, Typography } from '@mui/material';
import DateTimeSelector from '../DateTimeSelector';
import SelectAgent from '../SelectAgent';

import { useSelector } from 'react-redux';
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
	const { open, onClose, listingId, transaction } = props;

	const { updateTransaction, createTransaction } = useTransactionsForm();

	const initialForm = {
		agent_id: '',
		transaction_type: '',
		service_type: '',
		start_date: new Date(),
		end_date: new Date(),
		notes: '',
		status: 'Open',
		transaction_value: false,
		listing_id: listingId ? listingId : false
	};

	const [form, setForm] = useState(initialForm);

	useEffect(() => {
		if (transaction) {
			setForm({ ...transaction });
		}
	}, [transaction]);

	const setStartDate = (input) => {
		let data = { ...form };
		data.date_started = input;
		setForm({ ...data });
	};

	const setEndDate = (input) => {
		let data = { ...form };
		data.date_closed = input;
		setForm({ ...data });
	};

	const selectAgent = (input) => {
		let data = { ...form };
		data.agent_id = input;
		setForm({ ...data });
	};

	const handleClose = () => {
		setForm(initialForm);
		onClose();
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

		if (valid && transaction) {
			updateTransaction({ ...form });
			handleClose();
		} else if (valid && !transaction) {
			createTransaction({ ...form });
			handleClose();
		}
	};

	return (
		<Modal open={open} onClose={handleClose}>
			<Box sx={style}>
				<Grid container spacing={1} alignItems='center'>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<Typography variant='body2' component='span'>
							Assignee:
						</Typography>
						<AvatarGroup spacing={'medium'} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
							{app.agents.map((agent) => (
								<SelectAgent agent={agent} assignAgent={selectAgent} selected={agent.user_id === form.agent_id} />
							))}
						</AvatarGroup>
					</Grid>
					<Grid item xs={6}>
						<TextField
							disabled={listingId}
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
							{['Open', 'Pending', 'Active', 'Closed'].map((status) => (
								<MenuItem key={`transaction-form-status-${status}`} value={status}>
									{status}
								</MenuItem>
							))}
						</TextField>
					</Grid>
					<Grid item xs={6}>
						<TextField
							variant='standard'
							select
							label='Transaction'
							size='small'
							fullWidth
							margin='normal'
							value={form.transaction_type}
							onChange={(event) => setForm({ ...form, transaction_type: event.target.value })}>
							{['Deposit', 'Income', 'Expense'].map((transaction) => (
								<MenuItem key={`transaction-form-transaction-${transaction}`} value={transaction}>
									{transaction}
								</MenuItem>
							))}
						</TextField>
					</Grid>
					<Grid item xs={6}>
						<TextField
							variant='standard'
							select
							label='Service'
							size='small'
							fullWidth
							margin='normal'
							value={form.service_type}
							onChange={(event) => setForm({ ...form, service_type: event.target.value })}>
							{['Renting', 'Selling'].map((service) => (
								<MenuItem key={`transaction-form-service-${service}`} value={service}>
									{service}
								</MenuItem>
							))}
						</TextField>
					</Grid>
					<Grid item xs={12}>
						<DateTimeSelector form={form} setDate={setStartDate} type={'start_date'} />
					</Grid>
					<Grid item xs={12}>
						<DateTimeSelector form={form} setDate={setEndDate} type={'end_date'} />
					</Grid>
					<Grid item xs={12}>
						<FormControl variant='standard' fullWidth>
							<InputLabel>Amount</InputLabel>
							<NumberFormat
								type='text'
								value={form.transaction_value}
								customInput={Input}
								variant='standard'
								thousandSeparator='.'
								decimalSeparator=','
								decimalScale={2}
								fixedDecimalScale={true}
								prefix='Rp '
								autoComplete='off'
								onValueChange={(values) => {
									const { floatValue } = values;
									setForm({ ...form, transaction_value: floatValue });
								}}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<FormControl variant='standard' fullWidth>
							<InputLabel>Notes</InputLabel>
							<Input multiline rows={3} value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} />
						</FormControl>
					</Grid>
					<Grid item xs={12} sx={{ mt: 1 }}>
						<Button variant='contained' sx={{ mr: 1 }} onClick={validate}>
							{transaction ? 'Update' : 'Create'}
						</Button>
						<Button variant='contained' onClick={handleClose}>
							Cancel
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Modal>
	);
}