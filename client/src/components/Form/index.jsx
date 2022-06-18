import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
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
    size: 0,
    bedrooms: 0,
    bathrooms: 0,
    parking: 0,
    price: 0,
    organization_id: props.user.org_id,
    seller_id: props.user.sub
  });

  const [error, setError] = useState('');

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

    let validation = true;
    const fields = Object.keys(state);

    fields.forEach((field) => {
      if(state[field] === '' || state[field] === undefined || state[field] === null) {
        validation = false;
        setError('Missing required Field');
        return;
      } else if (typeof state[field] === 'string' && state[field].length > 255) {
        validation = false;
        setError(`${field} field exceeds character limit`);
        return;
      } else if (typeof state[field] === 'number' && state[field] < 1) {
        validation = false;
        setError(`${field} cannot be 0`);
        return;
      }
    });

    if(isNaN(state.postalCode)) {
      validation = false;
      setError('Postal code is not a number');
    };

    if(validation) {
      const listing = {...state};
      props.onSubmit(listing);
      setError('');
      
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
        size: 0,
        bedrooms: 0,
        bathrooms: 0,
        parking: 0,
        price: 0,
      });
    };
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
                <p>Drop image here...</p> :
                <p>Drop or click to select image</p>
            }
          </div>
          )}
        </div>
        <TextField
          required={error && !state.title ? true : false}
          error={error && !state.title ? true : false}
          helperText={error && !state.title ? 'Required' : ''}
          fullWidth
          label="Title"
          id='form-title'
          value={state.title}
          onChange={setTextField('title')}
          size='small'
          margin='dense'
        />
        <TextField
          required={error && !state.description ? true : false}
          error={error && !state.description ? true : false}
          helperText={error && !state.description ? 'Required' : ''}
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
          required={error && !state.streetAddress ? true : false}
          error={error && !state.streetAddress ? true : false}
          helperText={error && !state.streetAddress ? 'Required' : ''}
          fullWidth
          id='form-address'
          label="Street Address"
          value={state.streetAddress}
          onChange={setTextField('streetAddress')}
          size='small'
          margin='dense'
        />
        <TextField
          required={error && !state.city ? true : false}
          error={error && !state.city ? true : false}
          helperText={error && !state.city ? 'Required' : false}
          fullWidth
          id='form-city'
          label="City"
          value={state.city}
          onChange={setTextField('city')}
          size='small'
          margin='dense'
        />
        <TextField
          required={error && !state.province ? true : false}
          error={error && !state.province ? true : false}
          helperText={error && !state.province ? 'Required' : ''}
          fullWidth
          id='form-province'
          label="Province"
          value={state.province}
          onChange={setTextField('province')}
          size='small'
          margin='dense'
        />
        <TextField
          required={error && !state.postalCode ? true : false}
          error={error && !state.postalCode ? true : false}
          helperText={error && !state.postalCode ? 'Required' : ''}
          fullWidth
          id='form-postal-code'
          label="Postal Code"
          value={state.postalCode}
          onChange={setTextField('postalCode')}
          size='small'
          margin='dense'
        />
        <TextField
          required={error && !state.country ? true : false}
          error={error && !state.country ? true : false}
          helperText={error && !state.country ? 'Required' : ''}
          fullWidth
          id='form-country'
          label="Country"
          value={state.country}
          onChange={setTextField('country')}
          size='small'
          margin='dense'
        />
        <TextField
          required={error && !state.type ? true : false}
          error={error && !state.type ? true : false}
          helperText={error && !state.type ? 'Required' : ''}
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
          required={error && !state.size ? true : false}
          error={error && !state.size ? true : false}
          helperText={error && !state.size ? 'Required' : ''}
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
          required={error && !state.bedrooms ? true : false}
          error={error && !state.bedrooms ? true : false}
          helperText={error && !state.bedrooms ? 'Required' : ''}
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
          required={error && !state.bathrooms ? true : false}
          error={error && !state.bathrooms ? true : false}
          helperText={error && !state.bathrooms ? 'Required' : ''}
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
          required={error && !state.parking ? true : false}
          error={error && !state.parking ? true : false}
          helperText={error && !state.parking ? 'Required' : ''}
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
          required={error && !state.price ? true : false}
          error={error && !state.price ? true : false}
          helperText={error && !state.price ? 'Required' : ''}
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
        {error && (
            <div className='listing-form__error'>
              <Alert severity="error" fullWidth>
                {error}
              </Alert>
            </div>
          )}
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