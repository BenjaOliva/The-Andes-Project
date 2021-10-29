import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './index.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { Rating } from 'primereact/rating';
import { InputSwitch } from 'primereact/inputswitch';

export const DataTableBasic = ({
  dataRows,
  searchText,
  cookedFilter,
  openRecipeDrawer,
}) => {
  const [products, setProducts] = useState(dataRows);
  const [globalFilter, setGlobalFilter] = useState('');
  const dt = useRef(null);

  useEffect(() => {
    setProducts(dataRows);
  }, [dataRows]);

  useEffect(() => {
    setGlobalFilter(searchText);
  }, [searchText]);

  useEffect(() => {
    setGlobalFilter(cookedFilter);
  }, [cookedFilter]);

  const ratingBodyTemplate = rowData => {
    return (
      <Rating
        disabled
        value={rowData.reviews}
        stars={4}
        readOnly
        cancel={false}
      />
    );
  };

  const cookedBodyTemplate = rowData => {
    return <InputSwitch checked={rowData.cooked} />;
  };

  return (
    <DataTable
      scrollable
      scrollHeight="50vh"
      rows={12}
      ref={dt}
      paginator
      value={products}
      className="p-datatable-sm p-datatable-responsive-demo"
      globalFilter={globalFilter}
      removableSort
      onRowClick={rowData => openRecipeDrawer(rowData.data)}
      rowHover
    >
      <Column field="name" style={{ width: '45%' }} header="Name"></Column>
      <Column
        field="reviews"
        sortable
        body={ratingBodyTemplate}
        header="Reviews"
        style={{ width: '25%' }}
      ></Column>
      <Column
        style={{ width: '20%', textAlign: 'center' }}
        field="cooked"
        header="Cooked"
        body={cookedBodyTemplate}
      ></Column>
    </DataTable>
  );
};
