import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import SearchFilter from './SearchFilter';
import ListItem from './ListItem';
import { IconButton } from '@mui/material';

import FilterOptions from './FilterOptions';

export default function Listings(props) {

  const [properties, setProperties] = useState(props.properties);

  const [anchor, setAnchor] = useState(null);

  const [options, setOptions] = useState({
    type: false,
    status: false
  });

  const [filters, setFilters] = useState([]);


  const listItems = props.properties?.map((property, i) => {
    const seller = props.agents?.find((agent) => agent.user_id === property.seller_id);

    return (
      <ListItem
        key={`list-item-${i}`}
        id={`list-item-${i}`}
        agent={seller}
        property={property}
        setProperty={props.setProperty}
      />
    )
  });

  return (
    <Box>
      <Stack spacing={1} justifyContent="center" alignItems="center" mt="1rem">
        <div className='listing-browser'>
          <div className="listing-browser__left">
            <IconButton
              size='small'
              sx={{ml: '0.5rem'}}
              onClick={() => setAnchor(true)}
            >
              <FilterListIcon />
            </IconButton>
            <FilterOptions 
              options={['type', 'status']}
              anchor={anchor}
              handleClose={() => setAnchor(false)}
              filters={filters}
              setFilters={setFilters}
            />
            <TextField
              className='listing-browser__search'
              size='small'
              variant='outlined'
              placeholder='Search...'
              sx={{width: 'auto', ml: '0.25rem', mr: '0.25rem'}}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon/>
                  </InputAdornment>
                )
              }}
            />
          </div>
          <div className="listing-browser__right">
          <Button sx={{width: '5%'}}>Search</Button>
          </div>
        </div>
        {(filters.length > 0) && (
          <div className="listing-filters">
            {filters.find(filter => filter === 'type') && (
              <SearchFilter 
                options={['House', 'Apartments', 'Townhouse', 'Penthouse']}
                filter={'type'}
              />
            )}
            {filters.find(filter => filter === 'status') && (
              <SearchFilter
                filter={'status'}
                options={['Open', 'Showing', 'Offer Received', 'Offer Accepted', 'Closing']}
              />
            )}
          </div>
        )}
        {listItems}
      </Stack>
    </Box>
  );
};