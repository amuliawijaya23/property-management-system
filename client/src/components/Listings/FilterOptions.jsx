import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

 export default function FilterOptions(props) {

   const open = Boolean(props.anchor);

   const handleToggle = (value) => () => {
     const currentIndex = props.filters.indexOf(value);
     const newChecked = [...props.filters];

     (currentIndex === -1) ? newChecked.push(value) : newChecked.splice(currentIndex, 1);

     props.setFilters(newChecked);
   };

   return (
     <Menu
      id={`filter-options-menu`}
      aria-labelledby='demo-positioned-button'
      anchorEl={props.anchor}
      open={open}
      onClose={props.handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
     >
       {props.options.map((value) => {
         const labelId = `checkbox-label-${value}`;

         return (

           <MenuItem
              sx={{paddingLeft: 1}}
              key={labelId}
              id={labelId}
            >
            <Checkbox
              onClick={handleToggle(value)}
              checked={props.filters.find((filter) => filter === value)}
            />
            {value[0].toUpperCase() + value.substring(1)}
           </MenuItem>
         )
       })}
     </Menu>
   )

 };