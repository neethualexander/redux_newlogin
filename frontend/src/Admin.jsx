import {Outlet} from 'react-router-dom'
import { Container } from 'react-bootstrap';
import {ToastContainer} from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
function Admin() {
  return (
    <div>
      <ToastContainer/>
      <Container className='my-2'>
      <Outlet/>
      </Container>
      
    </div>
  );
}

export default Admin;