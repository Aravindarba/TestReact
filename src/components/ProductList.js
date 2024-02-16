import React, { useState, useEffect } from 'react';
import { Button, Grid, Paper, Typography, Tab, Tabs, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ProductDataGrid from './ProductDataGrid'; // Import the DataGridComponent

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState('grid');
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ productName: '', productPrice: '', productDescription: '' });

   useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:8080/CRM/GetAllProducts');
      setProducts(response.data);
        };

    fetchProducts();
  }, []);

  
  const Product = ({ product, listView, handleDelete }) => (
    <Grid item xs={listView ? 12 : 3}>
      <Paper elevation={3} style={{ padding: '8px', margin: '8px' }}>
        <Typography variant="h5">{product.productName}</Typography>
        <Typography variant="body1">{product.productDescription}</Typography>
        <Typography variant="body2">Price: {product.productPrice}</Typography>
        <IconButton onClick={() => handleDelete(product.id)}>
          <DeleteIcon />
        </IconButton>
        {/* Add more product details here */}
      </Paper>
    </Grid>
  );

  const handleChange = (event, newValue) => {
    setView(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async () => {
    await axios.post('http://localhost:8080/CRM/AddProduct', newProduct);
    setOpen(false);
    setNewProduct({ productName: '', productPrice: '', productDescription: '' });
    // Refresh the products list
    const response = await axios.get('http://localhost:8080/CRM/GetAllProducts');
    setProducts(response.data);
  };

  const handleDeleteProduct = async (id) => {
    await axios.delete(`http://localhost:8080/CRM/DeleteProduct/${id}`);
    // Refresh the products list
    const response = await axios.get('http://localhost:8080/CRM/GetAllProducts');
    setProducts(response.data);
  };

  return (
    <div style={{ overflowY: 'auto'}}>
      <Paper elevation={3} style={{ padding: '8px', margin: '8px' }}>
        <div>
          <h2> Products List</h2>
          <Button variant="contained" color="primary" onClick={handleOpen} style={{ float: 'right' }}>
            Add Product
          </Button>
          <Tabs value={view} onChange={handleChange}>
            <Tab value="grid" label="Grid View" />
            <Tab value="list" label="List View" />
          </Tabs>
          {view === 'list' ? (
  <ProductDataGrid products={products} handleDelete={handleDeleteProduct} />
) : (
  <Grid container spacing={2}>
    {products.map((product, index) => (
      <Product key={index} product={product} listView={view === 'list'} handleDelete={handleDeleteProduct} />
    ))}
  </Grid>
)}

        </div>
      </Paper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" name="productName" label="Product Name" type="text" fullWidth value={newProduct.productName} onChange={handleInputChange} />
          <TextField margin="dense" name="productPrice" label="Product Price" type="number" fullWidth value={newProduct.productPrice} onChange={handleInputChange} />
          <TextField margin="dense" name="productDescription" label="Product Description" type="text" fullWidth value={newProduct.productDescription} onChange={handleInputChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddProduct} type="submit" variant="contained" color="primary">
            Save
          </Button>
          <Button onClick={handleClose} variant="contained" color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductList;
