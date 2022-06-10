import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import AddCircleIcon from '@mui/icons-material/AddCircle';

import ListItem from './ListItem';



export default function Dashboard(props) {

  const listItems = props.properties?.map((property, i) => (
    <ListItem
      key={`list-item-${i}`}
      id={`list-item-${i}`}
      {...property}
    />
  ));

  return (
    <Box>
      <Stack spacing={1}>
        {listItems}
      </Stack>
      <AddCircleIcon 
        className='add-listing__button'
        sx={{fontSize: "5rem"}}
      />
    </Box>
  );
};