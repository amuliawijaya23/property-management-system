import { useState } from 'react';
import Box from '@mui/material/Box';
import EnhancedTable from '../../common/Table';
import ContactForm from '../../common/ContactForm';
import FormAlert from '../../common/FormAlert';

import useContactsData from './hooks/useContactsData';

export default function Contacts() {
	useContactsData();

	const [open, setOpen] = useState(false);
	const [contact, setContact] = useState(null);
	const [alert, setAlert] = useState({ open: false, message: '', severity: 'error' });

	const closeAlert = () => {
		setAlert({ open: false, message: '', severity: 'error' });
	};

	const handleClickOpen = (input) => {
		setContact(input);
		setOpen(true);
	};

	const handleClose = () => {
		setContact(null);
		setOpen(false);
	};

	return (
		<Box width={'100%'} mt={10} mb={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<EnhancedTable handleOpen={handleClickOpen} defaultOrder='asc' defaultOrderBy='name' />
			{open && <ContactForm open={open} onClose={handleClose} contact={contact} alert={alert} setAlert={setAlert} setContact={setContact} />}
			{alert?.open && <FormAlert open={alert?.open} message={alert?.message} severity={alert?.severity} onClose={closeAlert} />}
		</Box>
	);
}
