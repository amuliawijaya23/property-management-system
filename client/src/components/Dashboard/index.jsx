import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

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
    <Box sx={{ width: '100%'}}>
      <Stack spacing={2}>
        {listItems}
      </Stack>
    </Box>
  )
};