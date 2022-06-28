import { useState } from 'react';

import ImagePanel from './ImagePanel';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { useSelector } from 'react-redux';

import { 
  Routes, 
  Route, 
  useNavigate, 
  useParams 
} from 'react-router-dom';

export default function MediaCarousel() {
  const app = useSelector((state) => state.app.value);
  const id = parseInt(useParams().id);
  const property = useSelector((state) => state.property.value);
  
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const currentImages = [{link: property?.details?.cover_image_url}];
  const imagePanel = [...currentImages, ...property?.images].map((image, i) => (
    <ImagePanel
      key={`image-${i}`}
      value={value}
      index={i}
      link={image.link}
    />
  ));

  const imageTabs = property.images.map((image, i) => (
    <Tab
      key={`thumbnail-${i}`}
      className='property-item__media'
      sx={{m: 0}}
      aria-controls={`full-width-tabpanel-${i}`}
      id={`full-width-tab-${i}`}
      label={(
        <img src={image.link} alt='property-gallery' />
      )}
    />
  ));

  return (
    <>
      {imagePanel}
        <Tabs
          className='property-item__gallery'
          value={value}
          onChange={handleChange}
          variant='scrollable'
          scrollButtons
          allowScrollButtonsMobile
          aria-label='scrollable tabs'
          sx={{m: 0}}
        >
          <Tab
            className='property-item__media'
            sx={{m: 0}}
            aria-controls={`full-width-tabpanel-${0}`}
            id={`full-width-tab-${0}`}
            label={(
            <img src={property?.details?.cover_image_url} alt='thumbnail-gallery'/>
            )}
          />
          {imageTabs}
        </ Tabs>
    </>
  );
};