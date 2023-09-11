import React from 'react'
import {useState} from 'react'
import {Form,Button} from 'react-bootstrap'
import FormContainer from '../components/FormContainer.jsx'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'

const NewUserScreen = () => {
    const [name,setName]=useState()
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const [confirmPassword,setConfirmPassword]=useState()

    const navigate=useNavigate()

    const submitHandler=async(e)=>{
        e.preventDefault();
        if(name.length<5 || name.length>10 ){
          toast.error('Name should contain 5-10 letters')
     }else  if(email.length<13 || email.length>23){
      toast.error('Type email correctly') 
  }else  if(password.length<5){
      toast.error('Password Should contain atleast 5 characters') 
  }else  if(password!== confirmPassword){
      toast.error('passwords do not match') 
  }else{
    try{
     const response=await fetch('http://localhost:9000/api/users/createuser',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            name,
            email,
            password,
            confirmPassword
        })
     })
     if(response.status===200){
        navigate('/admin/adminhome')
     }else{
      toast.error('Registration failed')
     }
    }catch(err){
      toast.error(err?.data?.message||err.error)
             }
    }
    }

    function validateEmail(event) {
      const inputField = event.target;
      const regex = /^[A-Za-z0-9@.]+$/;
      const value = inputField.value;
    
      if (!regex.test(value)) {
        inputField.value = value.slice(0, -1);
      }
    }
    function validateName(event) {
      const inputField = event.target;
      const regex = /^[A-Za-z]+$/;
      const value = inputField.value;
    
      if (!regex.test(value)) {
        inputField.value = value.slice(0, -1);
      }
    }
    function validatePassword(event) {
      const inputField = event.target;
      const regex = /^[^\s]*$/;
      const value = inputField.value;
    
      if (!regex.test(value)) {
        inputField.value = value.replace(/\s/g, '');
      }
    }

  return (
    <FormContainer>
    <h1>Create User</h1>
    <Form onSubmit={submitHandler}>
    <Form.Group className='my-2' controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control 
            type='text'
            placeholder='Enter Name'
            onInput={(e)=>{validateName(e)}}
            value={name}
            onChange={(e)=> setName(e.target.value)}
             ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control 
            type='email'
            placeholder='Enter Email'
            onInput={(e)=>{validateEmail(e)}}
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
             ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control 
            type='password'
            placeholder='Enter Password'
            onInput={(e)=>{validatePassword(e)}}

            value={password}
            onChange={(e)=> setPassword(e.target.value)}
             ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control 
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e)=> setConfirmPassword(e.target.value)}
             ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-3' >
          Create
        </Button>
        
    </Form>
</FormContainer>
  )
}

export default NewUserScreen
