import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';

export default function TextAutocomplete(props) {
	const app = useSelector((state) => state.app.value);
	const [inputValue, setInputValue] = useState('');

	return (
		<Autocomplete
			disablePortal
			id='listing-id'
			options={app.properties.map((prop) => `LIST-${prop.id}`)}
			value={props.form.listing_id ? `LIST-${props.form.listing_id}` : ''}
			onChange={(event, newValue) => props.assignListing(newValue)}
			inputValue={inputValue}
			onInputChange={(event, newInputValue) => {
				setInputValue(newInputValue);
				props.assignListing(newInputValue);
			}}
			fullWidth
			renderInput={(params) => <TextField {...params} label='Listing' value={props.form.listing_id} />}
		/>
	);
}
