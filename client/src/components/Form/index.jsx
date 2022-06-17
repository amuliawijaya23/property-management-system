import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


import './styles.scss';

export default function Form(props) {
  const [state, setState] = useState({
    thumbnailImage: null,
    title: '',
    description: '',
    streetAddress: '',
    city: '',
    province: '',
    postalCode: '',
    country: '',
    type: '',
    size: undefined,
    bedrooms: undefined,
    bathrooms: undefined,
    parking: undefined,
    price: undefined,
    organization_id: props.user.org_id,
    seller_id: props.user.sub
  });

  const onDrop = useCallback((acceptedFiles) => {
    setState({...state, thumbnailImage: acceptedFiles[0]})
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  const onRemove = () => {
    setState({...state, thumbnailImage: null});
  };

  const setTextField = (field) => (event) => {
    const newState = {...state};
    newState[field] = event.target.value;
    setState({...newState});
  };

  const submitForm = (event) => {
    event.preventDefault();

    const listing = {...state};
    props.onSubmit(listing);
    
    setState({...state,
      thumbnailImage: null,
      title: '',
      description: '',
      streetAddress: '',
      city: '',
      province: '',
      postalCode: '',
      country: '',
      type: '',
      size: undefined,
      bedrooms: undefined,
      bathrooms: undefined,
      parking: undefined,
      price: undefined,
    });
  };

  return (
    <Box className='new-listing'>
      <div className='listing-form'>
        <div className='listing-form__image'>          
          {state.thumbnailImage && (
            <div className='listing-form__image-preview'>
              <HighlightOffIcon 
                className='listing-form__image-remove'
                onClick={onRemove}
              />
              <img src={URL.createObjectURL(state.thumbnailImage)} alt='thumbnail' />
            </div>
          )}
          {!state.thumbnailImage && (
          <div {...getRootProps()} className='listing-form__dropzone' >
            <input {...getInputProps()} />
            {
              isDragActive ?
                <p>Drop the files here...</p> :
                <p>Drop files here or click to select a file</p>
            }
          </div>
          )}
        </div>
        <TextField
          fullWidth
          label="Title"
          id='form-title'
          value={state.title}
          onChange={setTextField('title')}
          size='small'
          margin='dense'
        />
        <TextField 
          fullWidth
          multiline
          id='form-description'
          label="Description"
          value={state.description}
          onChange={setTextField('description')}
          size='normal'
          margin='dense'
        />
        <TextField 
          fullWidth
          id='form-address'
          label="Street Address"
          value={state.streetAddress}
          onChange={setTextField('streetAddress')}
          size='small'
          margin='dense'
        />
        <TextField 
          fullWidth
          id='form-city'
          label="City"
          value={state.city}
          onChange={setTextField('city')}
          size='small'
          margin='dense'
        />
        <TextField 
          fullWidth
          id='form-province'
          label="Province"
          value={state.province}
          onChange={setTextField('province')}
          size='small'
          margin='dense'
        />
        <TextField 
          fullWidth
          id='form-postal-code'
          label="Postal Code"
          value={state.postalCode}
          onChange={setTextField('postalCode')}
          size='small'
          margin='dense'
        />
        <TextField 
          fullWidth
          id='form-country'
          label="Country"
          value={state.country}
          onChange={setTextField('country')}
          size='small'
          margin='dense'
        />
        <TextField
          fullWidth
          id='form-property-type'
          select
          label="Type"
          value={state.type}
          onChange={setTextField('type')}
          size='small'
          margin='normal'
        >
          <MenuItem key={'House'} value={'House'}>House</MenuItem>
          <MenuItem key={'Apartment'} value={'Apartment'}>Apartment</MenuItem>
          <MenuItem key={'Townhouse'} value={'Townhouse'}>Townhouse</MenuItem>
          <MenuItem key={'Penthouse'} value={'Penthouse'}>Penthouse</MenuItem>
        </TextField>
        <TextField
          fullWidth
          id='form-size'
          label='Size'
          type='number'
          value={state.size}
          onChange={setTextField('size')}
          size='small'
          margin='dense'
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          fullWidth
          id='form-bedrooms'
          label='Bedrooms'
          type='number'
          value={state.bedrooms}
          onChange={setTextField('bedrooms')}
          size='small'
          margin='dense'
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          fullWidth
          id='form-bathrooms'
          label='Bathrooms'
          type='number'
          value={state.bathrooms}
          onChange={setTextField('bathrooms')}
          size='small'
          margin='dense'
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          fullWidth
          id='form-parking'
          label='Parking'
          type='number'
          value={state.parking}
          onChange={setTextField('parking')}
          size='small'
          margin='dense'
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          fullWidth
          id='form-price'
          label='Price'
          type='number'
          value={state.price}
          onChange={setTextField('price')}
          size='small'
          margin='dense'
          InputLabelProps={{
            shrink: true
          }}
        />
        <div className='listing-form__submit'>
          <Button
            variant='outlined' 
            className='listing-form__submit-button'
            onClick={submitForm}
          >
            Submit
          </Button>
          <Button 
            variant='outlined'
            className='listing-form__submit-button'
            onClick={props.onCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Box>
  )
}