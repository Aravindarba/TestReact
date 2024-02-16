import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const ProductDataGrid = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/CRM/GetAllProducts')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const columns = [
    { field: 'id', headerName: 'Product ID', width: 150 },
    { field: 'productName', headerName: 'Name', width: 150 },
    { field: 'productDescription', headerName: 'Description', width: 200 },
    { field: 'productPrice', headerName: 'Price', width: 100 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={products}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default ProductDataGrid;
