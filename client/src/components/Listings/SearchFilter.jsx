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

    const newOptions = {...props.options};
    newOptions[event.target.name] = value;
    props.addFilters(newOptions);

    props.onFilter(newOptions);
    
    setSelection(
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <FormControl sx={{mr: 0.2, width: 110 }}>
      <InputLabel id="type-filter-label">{
        props.filter[0].toUpperCase() + props.filter.substring(1)}
      </InputLabel>
      <Select
        size='small'
        labelId={`${props.filter}-filter-label`}
        id={`${props.filter}-filter-checkbox`}
        multiple
        name={`${props.filter}`}
        value={selection}
        onChange={handleChange}
        input={(
          <OutlinedInput 
            label={props.filter[0].toUpperCase() + props.filter.substring(1)}
          />
        )}
        renderValue={(selected) => selected.join(', ')}
      >
        {props.selections.map(select => (
          <MenuItem key={select} value={select}>
            <Checkbox checked={selection.indexOf(select) > -1} />
            <ListItemText primary={select} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};