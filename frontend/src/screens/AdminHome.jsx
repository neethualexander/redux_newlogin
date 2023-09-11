import {useState,useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';




function Search(props) {
    const [searchInput,setSearchInput]=useState()
  
    const search = ()=>{
     const data= props.filterData(searchInput)
      return data;
    }

    return (
        <div>
            <input type="text" placeholder="Search" value={searchInput} onChange={(e)=>{setSearchInput(e.target.value)}} />
            <button onClick={search} >Search</button>
           
        </div>

    )
}
Search.propTypes = {
  filterData: PropTypes.func.isRequired, // Expects 'filterData' to be a function
};


const AdminHome = () => {
    const [users,setUsers]=useState([])
    const [filtered,setFiltered]=useState([])
    
    

    const getUsers=async()=>{
        const res=await fetch('http://localhost:9000/api/users/userslist')
        const allusers=await res.json()
        setUsers(allusers)
        setFiltered(allusers)
    }

useEffect(()=>{
getUsers()
},[])

const navigate=useNavigate()

const filter=(input)=>{
    const filteredUsers=users.filter((user)=>{
      const userName=user.name
      const res=userName.toLowerCase()
      const searchText=input.toLowerCase()
    return res.includes(searchText)
    })
    setFiltered(filteredUsers)
 }

 const handleDelete=async(id)=>{
  
    const response= await fetch('http://localhost:9000/api/users/deleteuser',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
           _id:id
        })
      })
      
      if(response.ok){
        const userdata=await response.json()
        setFiltered(userdata.users)
        navigate('/admin/adminhome')
      }else{
         alert('delete failed')
      }
 }

 const handleEdit=async(id)=>{

  const response=await fetch('http://localhost:9000/api/users/userdetails',{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
        _id:id
    })
})
if(response.status===200){
  const userData=await response.json()
  navigate('/admin/edituserscreen',{state:{userData}})
}

 }

 const handleCreateNewUser=()=>{
  navigate('/admin/newuserscreen')
 }
const handleLogout=()=>{
  navigate('/')
}

  return (
    <>
    <div style={{display:'flex',justifyContent:'space-between'}} className='mb-3' >
     <Search filterData={filter} />
     <Button variant="danger" size="md" onClick={handleLogout} >
         Logout
        </Button>
     </div>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>User Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
{  
     filtered.map((user)=>{
        return  <tr key={user._id}>
        <td>{user._id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td><button onClick={()=>handleEdit(user._id)} >Edit</button></td>
        <td><button onClick={()=>handleDelete(user._id)} >Delete</button></td>

      </tr>
     })

}
       
      </tbody>
    </Table>
    <div className="mb-2">
        <Button variant="primary" size="lg" onClick={handleCreateNewUser} >
          Create User
        </Button>
      
      </div>
    </>
  )
}


export default AdminHome




   




      
     
  