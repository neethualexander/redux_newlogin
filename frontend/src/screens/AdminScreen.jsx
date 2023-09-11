import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';


const AdminScreen = () => {
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')

const navigate=useNavigate()


const handleSubmit=async(e)=>{
e.preventDefault()
const response= await fetch('http://localhost:9000/api/users/adminlogin',{
  method:'POST',
  headers:{
      'Content-Type':'application/json'
  },
  body:JSON.stringify({
      email,
      password
  })
})

if(response.status===200){

  navigate('/admin/adminhome')
}else{
   alert('Invalid credentials')
}
}
      return (
        <>
        <h1>ADMIN</h1>
        <Form onSubmit={handleSubmit} >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            
            <Form.Control type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email" />
            
          </Form.Group>
    
          <Form.Group className="mb-3" value={password} onChange={(e)=>setPassword(e.target.value)} controlId="formBasicPassword">
            
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
         
          <Button variant="primary" type="submit"  >
            Submit
          </Button>
        </Form>
        </>
      );
    
  
}

export default AdminScreen