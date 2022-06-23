import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import  IconButton  from '@mui/material/IconButton';

import SearchFilter from './SearchFilter';
import ListItem from './ListItem';
import ListingTable from './ListingTable';
import FilterOptions from './FilterOptions';

const selections = {
  type: ['House', 'Apartment', 'Townhouse', 'Penthouse'],
  status: ['Open', 'Showing', 'Offer Received', 'Offer Accepted', 'Closing']
};

export default function Listings(props) {
  const app = useSelector((state) => state.app.value)

  const [edit, setEdit] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState({
    type: [],
    status: []
});

  const [filters, setFilters] = useState([]);

  const handleEdit = () => {
    edit ? setEdit(false) : setEdit(true);
  };

  const handleAnchor = (event) =>  {
    anchor ? setAnchor(false) : setAnchor(event.currentTarget);
  };

  const listItems = app.properties?.map((property, i) => (
    <ListItem
      key={`list-item-${i}`}
      id={`list-item-${i}`}
      property={property}
      setProperty={props.setProperty}
    />
  ));

  const searchFilters =  filters.map((filter) => (
    <SearchFilter
      filter={filter}
      selections={selections[filter]}
      addFilters={setOptions}
      options={options}
    />
  ));

  return (
    <Box>
      <Stack spacing={1} justifyContent="center" alignItems="center" mt="1rem">
        <div className='listing-browser'>
          <div className="listing-browser__left">
            <IconButton
              size='small'
              sx={{ml: '0.5rem'}}
              onClick={handleAnchor}
            >
              <FilterListIcon />
            </IconButton>
            <FilterOptions 
              options={Object.keys(options)}
              anchor={anchor}
              handleClose={handleAnchor}
              filters={filters}
              setFilters={setFilters}
              selectedOptions={options}
            />
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
          </div>
          <div className="listing-browser__right">
            {(filters.length > 0) && (
              <div className="listing-filters">
               {searchFilters}
              </div>
            )}
            <Button sx={{m: 1}} variant='outlined' onClick={handleEdit} > 
              {edit ? <>Cancel</> : <>Update</>}
            </Button>
          </div>
        </div>
        {edit && <ListingTable />} 
        {!edit && listItems}
      </Stack>
    </Box>
  );
};