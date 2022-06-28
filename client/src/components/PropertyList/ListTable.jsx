import Button from '@mui/material/Button';

import { DataGrid, GridToolBar, GridRowProps, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';

import useTableData from '../../hooks/useTableData';

export default function ListTable(props) {
  const app = useSelector((state) => state.app.value);
  const table = useSelector((state) => state.table.value);

  const { resetTableData } = useTableData();

  const columns = [
    {field: 'id', headerName: 'ID', width: '100', flex: 0.5},
    {field: 'propertyName', headerName: 'Property Name', flex: 2},
    {field: 'propertyAddress', headerName: 'Address', flex: 1},
    {field: 'propertyZipCode', headerName: 'Zip Code', flex: 0.5},
    {field: 'propertyAgent', headerName: 'Agent', flex: 1},
    {field: 'propertyStatus', headerName: 'Status', flex: 0.5}
  ];

  const createRows = () => {
    const result = [];
    table.properties?.forEach((property) => {
      const seller = app.agents?.find((agent) => agent?.user_id === property?.seller_id)
      const createProperty = {
        id: property.id,
        propertyName: property.title,
        propertyAddress: property.address,
        propertyZipCode: property.zip_code,
        propertyAgent: seller.name,
        propertyStatus: property.status
      };
      result.push(createProperty);
    });
    return result;
  };

  const rows = createRows();

  return (
    <>
      <DataGrid
        sx={{overflow: 'auto', minHeight: '85vh'}}
        fullWidth
        experimentalFeatures={{ newEditingApi: true }}
        columns={columns}
        rows={rows}
        onSelectionModelChange={(ids) => {
          const selectedIds = new Set(ids);
          const nonSelected = table?.properties?.filter(property => !selectedIds.has(property.id));
          resetTableData(nonSelected);
          const selectedRowData = rows.filter((row) =>
            selectedIds.has(row.id));
            props.selectRow(selectedRowData);
        }}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        components={{Toolbar: GridToolbar}}
        loading={table.properties.length < 1}
        rowHover={false}
        onRowClick={(params, event) => {
          event.defaultMuiPrevented = true;
          // console.log(params);
        }}
        onCellClick={(params, event) => {
          event.defaultMuiPrevented = true;
          // console.log(params);
        }}
        onCellDoubleClick={(params, event) => {
          event.defaultMuiPrevented = true;
          if (!event.ctrlKey) {
            // console.log(params);
          }
        }}
      />
      <Button variant='outlined' fullWidth>
            Update
      </Button>
    </>
  );
};
