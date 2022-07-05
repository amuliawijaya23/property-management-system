// import { formatDistanceToNow, subHours } from 'date-fns';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const products = [
  {
    id: 1,
    name: 'Dropbox',
    imageUrl: '/static/images/products/product_1.png',
    updatedAt: 1,
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

export const LatestProducts = (props) => (
  <Card {...props}>
    <CardHeader
      subtitle={`${products.length} in total`}
      title="Latest Products"
    />
    <Divider />
    <List>
      {products.map((product, i) => (
        <ListItem
          divider={i < products.length - 1}
          key={product.id}
        >
          <ListItemAvatar>
            <img
              alt={product.name}
              src={product.imageUrl}
              style={{
                height: 48,
                width: 48
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={product.name}
            secondary={`Updated ${(product.updatedAt)}`}
          />
          <IconButton
            edge="end"
            size="small"
          >
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
      }}
    >
      <Button
        color="primary"
        endIcon={<ArrowRightIcon />}
        size="small"
        variant="text"
      >
        View all
      </Button>
    </Box>
  </Card>
);
