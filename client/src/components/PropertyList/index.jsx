import './styles.scss';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import Form from '../Form';
import ListMenu from './ListMenu';
import ListTable from './ListTable';

import useTableData from '../../hooks/useTableData';


import { 
  Routes,
  Route,
  useNavigate
} from 'react-router';

export default function PropertyList() {
  const app = useSelector((state) => state.app.value);
  const table = useSelector((state) => state.table.value);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState('');

  const { updateData } = useTableData();

  const navigate = useNavigate();

  const selections = {
    status: ['Open', 'Showing', 'Offer Received', 'Offer Accepted', 'Closing'],
    seller_id: app.agents.map((agent) => agent.email)
  };

  return (
    <Box width={'100%'} mt={2} > 
      <div className='listing-browser'>
        <div className='listing-browser__navigation'>
          <Button variant='text' onClick={() => navigate('/properties')}>List</Button>
          <Button variant='text' onClick={() => navigate('/properties/table')}>Table</Button>
          <Button variant='text' onClick={() => navigate('/properties/new')}>New</Button>
        </div>
        <div className="listing-browser__search">
          <TextField
            className='search-bar'
            size='small'
            variant='outlined'
            placeholder='Search...'
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            sx={{ml: '0.25rem', mr: '0.25rem'}}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon/>
                </InputAdornment>
              )
          }}/>
          <Button variant='contained'>Search</Button>
        </div>
        {selected.length > 0 && (
        <div className='listing-browser__edit'>
          {Object.keys(table.edit).map((key) => (
            <FormControl
              key={`${key}-update`}
              variant="outlined" 
              size='small'
              sx={{ m: 1, minWidth: 100 }}
            >
              <InputLabel id={`${key}-select-label`}>
                {key === 'seller_id' ?
                  'Agent' :
                  key[0].toUpperCase() + key.substring(1)
                }
              </InputLabel>
              <Select
                labelId={`${key}-select-label`}
                value={table[key]}
                onChange={updateData(key, selected)}
                label={key === 'seller_id' ? 'Agent' :key[0] + key.substring(1)}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {selections[key]?.map((values) => {
                  return (
                    <MenuItem key ={`selection-${values}`} value={values}>
                      <em>{values}</em>
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>

          ))}
        </div>
        )}        
      </div>
      <Routes>
        <Route path='/new' element={<Form />} />
        <Route path={'/table'} element={<ListTable selectRow={setSelected} />} />
        <Route path={'/*'} element={<ListMenu />} />
      </Routes>
    </Box>
  );
};