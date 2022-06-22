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
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FileUploadIcon from '@mui/icons-material/FileUpload';


export default function MediaGallery(props) {
  const [edit, setEdit] = useState(false);
  const [media, setMedia] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles[0].type === "image/jpeg" || acceptedFiles[0].type === "image/png") {
      const newMedia = media;
      newMedia.push(acceptedFiles[0])
      setMedia(newMedia);
    };
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop});

  const saveHandler = () => {
    const images = {
      images: media,
      listing_id: props.property.details.id,
      organization_id: props.property.details.organization_id,
      seller_id: props.property.details.seller_id
    };
    props.uploadImages(images)
    setMedia([]);
  };

  const selectedImages = media.map((image, i) => {
    if (media[0]) {
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

  const currentImages = props.property?.images?.map((image, i) => {
    if (props.property?.images[0]) {
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
            <ArrowBackIcon sx={{fontSize: '2rem', color: 'white'}} />
          </IconButton>
          <Typography variant='h6' component='div'>
            Media Gallery
          </Typography>
          <div>      
            {media.length > 0 && (
              <Button variant='text' onClick={saveHandler}>
                Save
              </Button>
            )}
          </div>
        </div>
        <div className='image-form__manager-gallery'>  
          <ImageList 
            sx={{ width: '100%', height: '95%'}}
            cols={4}
            rowHeight={250}
          >
            <ImageListItem key={`cover-image`}>
              <img 
                src={props.property?.details?.cover_image_url}
                srcSet={props.property?.details?.cover_image_url}
                alt={`cover`}
              />
            </ImageListItem>
            {props.property.images?.length > 0 && currentImages}
            {media.length > 0 && selectedImages}
          </ImageList>
        </div>
        {media.length < 1 && (
          <Typography variant='body2' component={'span'} alignSelf={'start'}>
            You can upload JPEG or PNG files of up to 5 mb each.
          </Typography>
        )}
        <div {...getRootProps()} className='image-form__manager-dropzone' >
          <input {...getInputProps()} />
          {
            isDragActive ?
              <FileUploadIcon fontSize='large'/> :
              <CloudUploadIcon fontSize='large'/>
          }
        </div>
      </div>
    </Box>
    
  )
}