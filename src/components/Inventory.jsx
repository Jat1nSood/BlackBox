import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import {useNavigate} from 'react-router-dom'
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../CSS/inventory.css'
import ProductDataService from '../services/product.js';
import { useUser } from './userContext'; 
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, userRole } = useUser(); 
const navigate = useNavigate();
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const data = await ProductDataService.getAllProducts();
      setProducts(data.docs.map((doc) => ({...doc.data(), id : doc.id})));
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleUpdate = (id) =>{
    navigate(`/update/${id}`)

  }
const handleDelete = async(id) =>{
try {
  await ProductDataService.deleteProduct(id);
  console.log("deleted")
  getProducts();
} catch (error) {

  
}

}
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Price (Per Kg)</TableCell>
                <TableCell align="right">Quantity(Kgs)</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="center">Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell component="th" scope="row">
                    {product.name}
                  </TableCell>
                  <TableCell align="right">{product.category}</TableCell>
                  <TableCell align="right">{product.price}</TableCell>
                  <TableCell align="right">{product.quantity}</TableCell>
                  <TableCell align="right">{product.description}</TableCell>
                  <TableCell align="center">
                  {userRole === "admin" && (
                      <>
                        <button onClick={() => handleUpdate(product.id)}>Update</button> or <button onClick={() => handleDelete(product.id)}>Delete</button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default function Inventory() {
  return (
    <div className="inventory">
      <div className="inventoryHeading">
        <h3>Inventory</h3>
      </div>
      <ProductList />
    </div>
  );
}
