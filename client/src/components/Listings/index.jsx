import './styles.scss';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import ListingTable from './ListingTable';

const selections = {
  type: ['House', 'Apartment', 'Townhouse', 'Penthouse'],
  status: ['Open', 'Showing', 'Offer Received', 'Offer Accepted', 'Closing']
};

export default function Listings(props) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState([]);
  const [update, setUpdate] = useState({
    type: '',
    status: '',
  });

  const selectUpdate = Object.keys(selections).map((selection) => {
    return (
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id={`${selection}-label`}>Age</InputLabel>
        <Select
          labelId={`${selection}-select-label`}
          id="demo-simple-select-standard"
          value={update[selection]}
          // onChange={handleChange}
          label={selection}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {selections[selection].map((values) => {
            return (
            <MenuItem value={values}>
              <em>{values}</em>
            </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    );
  });


  return (
    <Box height={'80vh'} mt={2}>
      <div className='listing-browser'>
        <TextField
          className='listing-browser__search'
          size='small'
          variant='outlined'
          placeholder='Search...'
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          sx={{ml: '0.25rem', mr: '0.25rem'}}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon/>
              </InputAdornment>
              )
            }
          }
        />
        <Button variant='outlined'>
          Search
        </Button>
        <div className="listing-browser__update">
          {selected.length > 0 && selectUpdate}
        </div>
      </div>
      {<ListingTable
        selectRow={setSelected}
      />}
    </Box>
  );
};