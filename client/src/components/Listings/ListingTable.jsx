import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function ListingTable(props) {

  const columns = [
    {field: 'id', headerName: 'ID', width: '100'},
    {field: 'propertyName', headerName: 'Property Name', width: '350'},
    {field: 'propertyAddress', headerName: 'Address', width: '350'},
    {field: 'propertyZipCode', headerName: 'Zip Code', width: '150'},
    {field: 'propertyAgent', headerName: 'Agent', width: '200'},
    {field: 'propertyStatus', headerName: 'Status', width: '200'}
  ];

  const rows = [];
  
  props.properties.forEach(property => {
    const seller = props.agents?.find((agent) => agent.user_id === property.seller_id);

    const createProperty = {
      id: property.id,
      propertyName: property.title,
      propertyAddress: property.address,
      propertyZipCode: property.zip_code,
      propertyAgent: seller.name,
      propertyStatus: property.status
    };

    rows.push(createProperty);
  });

  console.log('rows', rows);

  return (
    <div style={{height: '80vh', width: '100%'}}>
      <DataGrid
        experimentalFeatures={{ newEditingApi: true }}
        columns={columns}
        rows={rows}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
};