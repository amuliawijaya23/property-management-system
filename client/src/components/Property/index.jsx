import './styles/index.scss';
import './styles/gallery.scss';
import './styles/messages.scss';

import PropertyDetail from './PropertyDetail';
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

  return (
    <>
      {mode === DETAILS &&(
        <PropertyDetail 
          onBack={props.onBack}
          onMedia={openGallery}
        />
      )}
      {mode === MEDIA && (
        <MediaGallery onBack={returnHandler} />
      )}
    </>
  );
};