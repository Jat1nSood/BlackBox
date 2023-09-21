import React, { useState } from 'react';
import '../CSS/addproduct.css';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ProductDataService from '../services/product.js';
import { useNavigate } from 'react-router-dom';

export default function Addproduct() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState({error : false, msg : ''});


  const handleAddProduct = async() => {
    if( name =="" || category == '' || quantity =="" || price == '' || description =="" ){
        setMessage({error : true, msg : 'All feilds are Mandatory'});
        return;
    }
    
    const newProduct = {
      name: name,
      category: category,
      price: parseFloat(price), 
      quantity: parseInt(quantity),
      description: description,
    };
    console.log({name : name});

    try {
        await ProductDataService.addProduct(newProduct);
        setMessage({error : false, msg : 'Product Added'});
        console.log("added")
        setTimeout(() => {
          
          navigate('/dashboard')
        }, 1000);
        
    } catch (err) {
        setMessage({error : true, msg : 'Server Error'})
        console.log(err);
        
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
          <button onClick={handleAddProduct} className='button'>
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}
