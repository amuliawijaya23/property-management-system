// import { formatDistanceToNow, subHours } from 'date-fns';
import { Box, Button, Card, CardHeader, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useSelector } from 'react-redux';

import formatDistanceToNowStrict from 'date-fns/esm/formatDistanceToNowStrict';

const products = [
	{
		id: 1,
		name: 'Dropbox',
		imageUrl: '/static/images/products/product_1.png',
		updatedAt: 1
	},
	{
		id: 2,
		name: 'Medium Corporation',
		imageUrl: '/static/images/products/product_2.png',
		updatedAt: 1
	},
	{
		id: 3,
		name: 'Slack',
		imageUrl: '/static/images/products/product_3.png',
		updatedAt: 1
	},
	{
		id: 4,
		name: 'Lyft',
		imageUrl: '/static/images/products/product_4.png',
		updatedAt: 1
	},
	{
		id: 5,
		name: 'GitHub',
		imageUrl: '/static/images/products/product_5.png',
		updatedAt: 1
	}
];

export const LatestProducts = (props) => {
	const dashboard = useSelector((state) => state.dashboard.value);

	return (
		<Card {...props}>
			<CardHeader subtitle={`${dashboard?.properties?.length} in total`} title='Recent Properties' />
			<Divider />
			<List>
				{dashboard.properties.map((property, i) => (
					<ListItem divider={i < dashboard?.properties?.length - 1} key={`LIST-${property.id}`} button>
						<ListItemText primary={`LIST-${property?.id} ${property?.title}`} secondary={`Updated ${formatDistanceToNowStrict(new Date(property?.updated_at), { addSuffix: true })}`} />
						<IconButton edge='end' size='small'>
							<MoreVertIcon />
						</IconButton>
					</ListItem>
				))}
			</List>
			<Divider />
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'flex-end',
					p: 2
				}}>
				<Button color='primary' endIcon={<ArrowRightIcon />} size='small' variant='text'>
					View all
				</Button>
			</Box>
		</Card>
	);
};
