import {useState,useEffect} from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import {Form,Button} from 'react-bootstrap'
import FormContainer from '../components/FormContainer.jsx'
import Image from 'react-bootstrap/Image';
import {toast} from 'react-toastify'


const EditScreen =()=>{
    
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [image,setImage]=useState(null)
    const navigate=useNavigate()
    

const {state}=useLocation()
const userData=state.userData


useEffect(()=>{
  setName(userData.name)
  setEmail(userData.email)
  setImage(userData.image)

},[userData.name,userData.email,userData.image])

    const submitHandler=async (e)=>{
        e.preventDefault()  
        if(name.length<5 || name.length>10 ){
            toast.error('Name should contain 5-10 letters')
       }else  if(email.length<13 || email.length>23){
        toast.error('Type email correctly') 
    }else{   
       try{
        const res=await fetch('http://localhost:9000/api/users/edituser',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                _id:userData._id,
                name,
                email,
                image
            })
        })
if(res.status===200){
    toast.success('User Profile Editted')
    navigate('/admin/adminhome')
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
    return (
<FormContainer>
    <div style={{display:'flex', justifyContent:'space-between' }}>
    <h1>Edit User</h1>
   
    <Image style={{height:150, width:150}} src={`/images/${image}`}  rounded /> 

    </div>

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
       
        <Form.Group className='my-2' controlId='profilePhoto'>
            <Form.Label>Profile Photo</Form.Label>
            <Form.Control 
            type='file'
            onChange={(e)=> setImage(e.target.files[0].name )}
             ></Form.Control>
        </Form.Group>


      
        <Button type='submit' variant='primary' className='mt-3' >
          Update
        </Button>
        
    </Form>
</FormContainer>
    )
}

export default EditScreen

