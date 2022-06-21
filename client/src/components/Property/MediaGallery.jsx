import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import '../Form/styles.scss';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


export default function MediaGallery(props) {
  const [edit, setEdit] = useState(false);

  const [state, setState] = useState({
    media: [],
    images: []
  });


  const onDrop = useCallback((acceptedFiles) => {
    const newState = {...state};
    newState.images.push(acceptedFiles[0])
    setState(newState);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop});

  const selectedImages = state.images.map((image, i) => {
    if (state.images[0]) {
      return (
        <ImageListItem key={`imageList-${i}`}>
          <img 
            src={URL.createObjectURL(image)}
            srcSet={URL.createObjectURL(image)}
            alt={`preview-${i}`}
          />
        </ImageListItem>
      )
    };
    return <></>
  });

  const currentImages = props.property.images.map((image, i) => {
    if (props.property.images[0]) {
      return(
        <ImageListItem key={`currentImage-${i}`}>
          <img 
            src={image.link}
            srcSet={image.link}
            alt={`preview-${i}`}
          />
        </ImageListItem>
      )
    };
    return <></>
  });
  

  return(
    <Box className='image-form'>  
      <div className="image-form__manager">
        <div className="image-form__manager-actions">
          <IconButton 
            size='large'
            onClick={() => props.onBack()}
          >
            <ArrowBackIcon sx={{fontSize: '2rem'}} />
          </IconButton>
          <Typography variant='h6' component='div'>
            Media Gallery
          </Typography>
          <div>      
            {state.images.length > 0 && (
              <Button variant='text'>
                Save
              </Button>
            )}
          </div>
        </div>
        <div className='image-form__manager-gallery'>  
          <ImageList 
            sx={{ width: '100%', height: '100%', maxHeight: '28rem'}}
            cols={4}
            maxRowHeight={200}
          >
            <ImageListItem key={`cover-image`}>
              <img 
                src={props.property.details.cover_image_url}
                srcSet={props.property.details.cover_image_url}
                alt={`cover`}
              />
            </ImageListItem>
            {props.property.images.length > 0 && currentImages}
            {state.images.length > 0 && selectedImages}
          </ImageList>
        </div>
        <div {...getRootProps()} className='image-form__manager-dropzone' >
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop image here...</p> :
              <p>Drop or click to select image</p>
          }
        </div>
      </div>
    </Box>
    
  )
}