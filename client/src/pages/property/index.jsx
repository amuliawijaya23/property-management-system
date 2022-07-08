import './styles/index.scss';
import './styles/gallery.scss';
import './styles/messages.scss';

import PropertyDetail from './PropertyDetail';

import { Routes, Route } from 'react-router-dom';

export default function Property(props) {
	return (
		<Routes>
			<Route path='/:id' element={<PropertyDetail />} />
		</Routes>
	);
}
