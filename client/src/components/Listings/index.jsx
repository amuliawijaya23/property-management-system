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
import ListingTable from './ListingTable';

import  IconButton  from '@mui/material/IconButton';

import FilterOptions from './FilterOptions';

const selections = {
  type: ['House', 'Apartment', 'Townhouse', 'Penthouse'],
  status: ['Open', 'Showing', 'Offer Received', 'Offer Accepted', 'Closing']
};

export default function Listings(props) {
  const [edit, setEdit] = useState(false);
  const [properties, setProperties] = useState(props.properties);
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

  const filterProperties = (options) => {
    let result = [];

    if (options.type.length < 1 && options.status.length < 1) {
      setProperties([...props.properties]);
    } else {
        if (filters.find(filter => filter === 'type') && options.type.length > 0) {
          options.type.forEach((option) => {
            const getPropertiesByType = props.properties.filter(property => property.property_type === option);
            result = [...result, ...getPropertiesByType];
          });
        };
  
        if (filters.find(filter => filter === 'status') && options.status.length > 0) {
          options.status.forEach((status) => {
            const tempResult = filters.find(filter => filter === 'type') ? [...result] : props.properties;
            result = [];
            const getPropertiesByStatus = tempResult.filter(property => property.status === status);
            result = [...result, ...getPropertiesByStatus];
          });
        };
        setProperties(result);
      };
    };


  const listItems = properties?.map((property, i) => (
    <ListItem
      key={`list-item-${i}`}
      id={`list-item-${i}`}
      agent={props.agents?.find((agent) => agent.user_id === property.seller_id)}
      property={{
        details: property,
        images: null,
        messages: null
      }}
      setProperty={props.setProperty}
    />
  ));

  const searchFilters =  filters.map((filter) => (
    <SearchFilter
      filter={filter}
      selections={selections[filter]}
      addFilters={setOptions}
      onFilter={filterProperties}
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
              onClick={(event) => setAnchor(event.currentTarget)}
            >
              <FilterListIcon />
            </IconButton>
            <FilterOptions 
              options={Object.keys(options)}
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
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              sx={{ml: '0.25rem', mr: '0.25rem'}}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon/>
                  </InputAdornment>
                )
              }}
            />
            <Button variant='outlined'>Search</Button>
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
        {edit && (
          <ListingTable 
            properties={properties}
            agents={props.agents}
          /> 
        )}
        {!edit && listItems}
      </Stack>
    </Box>
  );
};