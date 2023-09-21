import React, { useEffect, useState } from 'react';
import '../CSS/addproduct.css';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ProductDataService from '../services/product.js';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateProduct() {
    const navigate = useNavigate();
const {id} = useParams();
console.log(id)
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState({error : false, msg : ''});

  useEffect( () =>{

    const fetchData = async()=>{
        console.log("Hello")
        const data = await ProductDataService.getProduct(id);
        setName(data.name);
        setCategory(data.category);
        setPrice(data.price);
        setQuantity(data.quantity);
        setDescription(data.description);
    }
    fetchData();

  }, []);

  const handleUpdate = async () => {
    try {
      // Create an object with the updated data
      const updatedProduct = {
        name,
        category,
        price,
        quantity,
        description,
      };
  
      await ProductDataService.updateProduct(id, updatedProduct);
  
      setMessage({ error: false, msg: "Product updated successfully." });
      setTimeout(() => {
        navigate('/dashboard')
      }, 1000);
      
    } catch (error) {
      console.error("Error updating product:", error);
      setMessage({ error: true, msg: "Error updating product." });
    }
  };
  


  return (
   
    <div className='addProduct'>
         {message.msg && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity={message.error ? 'error' : 'success'}>{message.msg}</Alert>
        </Stack>
      )}
      <div className='addProductHeading'>
        Add Product to Inventory
      </div>
      <div className='formContainer'>
        <TextField
          id='outlined-basic'
          label='Name'
          variant='outlined'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id='outlined-basic'
          label='Category'
          variant='outlined'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <TextField
          id='outlined-basic'
          label='Price (per kg)'
          variant='outlined'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          id='outlined-basic'
          label='Quantity (in kgs)'
          variant='outlined'
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <TextField
          id='outlined-basic'
          label='Description'
          variant='outlined'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className='buttonContainer'>
          <button onClick={handleUpdate} className='button'>
            Update Product
          </button>
        </div>
      </div>
    </div>
  );
}
