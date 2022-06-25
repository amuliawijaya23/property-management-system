import axios from "axios";

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { 
  setDefault,
  setTableData, 
  setEditValue,
} from "../state/reducers/tableReducer";


export default function useTableData() {
  const app = useSelector((state) => state.app.value);
  const table = useSelector((state) => state.table.value);

  const dispatch = useDispatch();

  const updateData = (type, selected) => (event) => {
    const editData = {...table.edit};
    editData[type] = event.target.value;
    dispatch(setEditValue({...editData}));

    let appProps = [...app.properties];
    let tableProps = [...table.properties];
      
    selected?.forEach((select) => {
      const appData = appProps.find((prop) => prop.id === select.id);
      let selectData = {...tableProps.find(prop => prop.id === select.id)};
      const index = tableProps.map(prop => prop.id).indexOf(selectData.id);
      let data = event.target.value;

      if (Object.keys(table.edit).indexOf(type) === 1) {
        const seller = app.agents.find((agent) => agent.email === event.target.value).user_id;
        data = seller;
      };

      data ? (selectData[type] = data) : selectData[type] = appData[type];

      tableProps[index] = selectData;
    });
    dispatch(setTableData(tableProps));
  };

  const resetTableData = (selected) => {
    const tableProps = [...table.properties];
    selected.forEach(property => {
      const index = tableProps.map(prop => prop.id).indexOf(property.id);
      tableProps[index] = app.properties[index];
    });
    dispatch(setTableData(tableProps));
  }

  const cancelUpdate = () => {
    dispatch(setDefault({
      properties: app.properties,
      edit: {
        status: '',
        seller_id: '',
      }
    }));
  };

  return {
    updateData,
    resetTableData,
    cancelUpdate
  };
}