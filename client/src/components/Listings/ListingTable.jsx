import { DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid';



import { useSelector } from 'react-redux';

export default function ListingTable(props) {
  const app = useSelector((state) => state.app.value);

  const columns = [
    {field: 'id', headerName: 'ID', width: '100'},
    {field: 'propertyName', headerName: 'Property Name', width: '350'},
    {field: 'propertyAddress', headerName: 'Address', width: '350'},
    {field: 'propertyZipCode', headerName: 'Zip Code', width: '150'},
    {field: 'propertyAgent', headerName: 'Agent', width: '200'},
    {field: 'propertyStatus', headerName: 'Status', width: '200'}
  ];

  const createRows = () => {
    const rows = [];
    app.properties?.forEach((property) => {
      const seller = app.agents?.find((agent) => agent.user_id === property.seller_id)
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
    return rows;
  };

  const rows = createRows();

  return (
    <DataGrid
      experimentalFeatures={{ newEditingApi: true }}
      columns={columns}
      rows={rows}
      onSelectionModelChange={(ids) => {
        const selectedIds = new Set(ids);
        const selectedRowData = rows.filter((row) =>
          selectedIds.has(row.id));
          props.selectRow(selectedRowData);
      }}
      pageSize={10}
      rowsPerPageOptions={[10]}
      checkboxSelection
      disableSelectionOnClick
      components={{Toolbar: GridToolbar}}
    />
  );
};
