import { useEffect, useState, useMemo } from 'react';
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
	const user = useSelector((state) => state?.user?.value);
	const { open, onClose, listingId, transaction } = props;

	const { updateTransaction, createTransaction } = useTransactionsForm();

	const initialForm = useMemo(
		() => ({
			agent_id: user?.sub,
			transaction_type: '',
			start_date: new Date(),
			end_date: new Date(),
			notes: '',
			status: 'Open',
			transaction_value: false,
			listing_id: listingId ? listingId : '',
			market_value: false || null
		}),
		[listingId, user?.sub]
	);

	const [form, setForm] = useState(initialForm);

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
				<Grid container spacing={1} alignItems='center'>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<Typography variant='body2' component='span'>
							Assignee:
						</Typography>
						<AvatarGroup spacing={'medium'} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
							{app.agents.map((agent, i) => (
								<SelectAgent key={`trx-form-agent-${i}`} agent={agent} assignAgent={selectAgent} selected={agent?.user_id === form?.agent_id} />
							))}
						</AvatarGroup>
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
							{['Open', 'Pending Confirmation', 'Closed', 'Active', 'Canceled'].map((status) => (
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
								value={form?.transaction_value}
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
					{form?.transaction_type === 'Sale' && (
						<Grid item xs={12}>
							<FormControl variant='standard' fullWidth>
								<InputLabel>Market Value</InputLabel>
								<NumberFormat
									type='text'
									value={form.market_value}
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
						<Button variant='contained' onClick={handleClose}>
							Cancel
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Modal>
	);
}
