import './styles.scss';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ListTable from './ListTable';

import useTableData from '../../hooks/useTableData';

export default function PropertyList() {
  const app = useSelector((state) => state.app.value);
  const table = useSelector((state) => state.table.value);
  const [selected, setSelected] = useState([]);

  const { updateData } = useTableData();

  const selections = {
    status: ['Open', 'Showing', 'Offer Received', 'Offer Accepted', 'Closing'],
    seller_id: app.agents.map((agent) => agent.email)
  };

  return (
    <Box width={'100%'} height={'70vh'} mt={2} > 
      <div className='listing-browser'>
        {selected.length > 0 && (
          Object.keys(table.edit).map((key) => (
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
          ))
        )}        
      </div>
      <ListTable
        selectRow={setSelected}
      />
      {selected.length > 0 && (
        <Button variant='outlined' fullWidth>
          Update
        </Button>
      )}
    </Box>
  );
};