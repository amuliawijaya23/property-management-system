import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';

export default function SearchFilter(props) {
  const [selection, setSelection] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;

    setSelection(
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <FormControl sx={{ m: 1, width: 175 }}>
      <InputLabel id="type-filter-label">{
        props.filter[0].toUpperCase() + props.filter.substring(1)}
      </InputLabel>
      <Select
        size='small'
        labelId={`${props.filter}-filter-label`}
        id={`${props.filter}-filter-checkbox`}
        multiple
        value={selection}
        onChange={handleChange}
        input={(
          <OutlinedInput 
            label={props.filter[0].toUpperCase() + props.filter.substring(1)}
          />
        )}
        renderValue={(selected) => selected.join(', ')}
      >
        {props.options.map(option => (
          <MenuItem key={option} value={option}>
            <Checkbox checked={selection.indexOf(option) > -1} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};