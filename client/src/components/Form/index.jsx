import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import SearchLocationInput from './SearchLocationInput';

import './styles.scss';

export default function Form(props) {
  const [state, setState] = useState({
    thumbnailImage: null,
    title: '',
    description: '',
    address: '',
    property_type: '',
    zip_code: false,
    size: false,
    number_of_bedrooms: false,
    number_of_bathrooms: false,
    parking_space: false,
    price: false,
    organization_id: props.user.org_id,
    seller_id: props.user.sub
  });

  const [error, setError] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    setState({...state, thumbnailImage: acceptedFiles[0]})
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop});

  const onRemove = () => {
    setState({...state, thumbnailImage: null});
  };

  const setAddress = (location) => {
    setState({...state, address: location});
  };

  const setTextField = (field) => (event) => {
    const newState = {...state};
    newState[field] = event.target.value;
    setState({...newState});
  };

  const stringField = Object.keys(state).slice(1, 3).map((field) => (
    <TextField
      key={`form-${field}`}
      required={error && !state[field] ? true : false}
      error={error && !state[field] ? true : false}
      helperText={error && !state[field] ? 'Required' : ''}
      fullWidth
      label={field[0].toUpperCase() + field.substring(1)}
      id={`form-${field}`}
      value={state[field]}
      onChange={setTextField(field)}
      size='small'
      margin='dense'
    />
  ));

  const numberField = Object.keys(state).slice(5, 10).map((field) => (
    <TextField
      key={`form-${field}`}
      required={error && !state[field] ? true : false}
      error={error && !state[field] ? true : false}
      helperText={error && !state[field] ? 'Required' : ''}
      fullWidth
      id={`form-${field}`}
      label={field[0].toUpperCase() + field.split('_').join(' ').substring(1)}
      type='number'
      value={state[field]}
      onChange={setTextField(field)}
      size='small'
      margin='dense'
      InputLabelProps={{
        shrink: true
      }}
    />
  ));

  const submitForm = (event) => {
    event.preventDefault();

    let isValid = true;
    const fields = Object.keys(state);

    fields.forEach((field) => {
      if(state[field] === '' || state[field] === false || state[field] === null) {
        isValid = false;
        setError('Missing required Field');
        return;
      } else if (typeof state[field] === 'string' && state[field].length > 255) {
        isValid = false;
        setError(`${field} exceeds character limit`);
        return;
      } else if (typeof state[field] === 'number' && state[field] < 1) {
        isValid = false;
        setError(`${field} cannot be 0`);
        return;
      }
    });

    if(isValid) {
      const listing = {...state};
      props.onSubmit(listing);
      setError('');
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
        {stringField}
        <TextField
          required={error && !state.property_type ? true : false}
          error={error && !state.property_type ? true : false}
          helperText={error && !state.property_type ? 'Required' : ''}
          fullWidth
          id='form-property-type'
          select
          label="Type"
          value={state.property_type}
          onChange={setTextField('property_type')}
          size='small'
          margin='normal'
        >
          <MenuItem key={'House'} value={'House'}>House</MenuItem>
          <MenuItem key={'Apartment'} value={'Apartment'}>Apartment</MenuItem>
          <MenuItem key={'Townhouse'} value={'Townhouse'}>Townhouse</MenuItem>
          <MenuItem key={'Penthouse'} value={'Penthouse'}>Penthouse</MenuItem>
        </TextField>
        <SearchLocationInput 
          address={state.address}
          setAddress={setAddress}
          error={error}
        />
        {numberField}
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