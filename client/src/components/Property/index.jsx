import { useState } from 'react';

import ListingDetail from './ListingDetail';
import MediaGallery from './MediaGallery';

import useVisualMode from '../../hooks/useVisualMode';

import { DETAILS, MEDIA } from '../../helper/modes';

export default function Property(props) {
  const {mode, transition, back} = useVisualMode(DETAILS);

  const returnHandler = () => {
    back();
  };

  const openGallery = () => {
    transition(MEDIA);
  };

  const onUpload = (images) => {
    props.uploadImages(images);
    // back();
  };

  return (
    <>
      {mode === DETAILS &&(
        <ListingDetail 
          property={props.property}
          agents={props.agents}
          onBack={props.onBack}
          onMedia={openGallery}
          user={props.user}
          sendMessage={props.sendMessage}
        />
      )}
      {mode === MEDIA && (
        <MediaGallery 
          property={props.property}
          agents={props.agents}
          onBack={returnHandler}
          uploadImages={onUpload}
        />
      )}
    </>
  );
};