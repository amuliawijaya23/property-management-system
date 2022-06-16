import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import ListItem from './ListItem';



export default function Listings(props) {

  const listItems = props.properties?.map((property, i) => {
    const seller = props.agents?.find((agent) => agent.user_id === property.seller_id);

    return (
      <ListItem
        key={`list-item-${i}`}
        id={`list-item-${i}`}
        agent={seller}
        {...property}
      />
    )
  });

  return (
    <Box>
      <Stack spacing={1}>
        {listItems}
      </Stack>
      <AddCircleOutlineIcon
        className='add-listing__button'
        sx={{fontSize: "5rem"}}
      />
    </Box>
  );
};