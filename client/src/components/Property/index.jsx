import './styles/index.scss';
import './styles/gallery.scss';
import './styles/messages.scss';

import PropertyDetail from './PropertyDetail';
import MediaGallery from './MediaGallery';

import { Routes, Route, useNavigate, useParams } from 'react-router-dom';

export default function Property(props) {
	return (
		<Routes>
			<Route path='/:id' element={<PropertyDetail />} />
			<Route path='/media/:id' element={<MediaGallery />} />
		</Routes>
	);
}
