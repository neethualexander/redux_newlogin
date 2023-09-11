import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import store from './store'
import {Provider} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import PrivateRoute from './components/PrivateRoute';
import App from './App';
import Admin from './Admin'
import HomeScreen from './screens/HomeScreen.jsx';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminScreen from './screens/AdminScreen'
import AdminHome from './screens/AdminHome';
import NewUserScreen from './screens/NewUserScreen';
import EditScreen from './screens/EditScreen';

const router= createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={<App/>} >
      <Route index={true} path='/' element={<HomeScreen/>} />
      <Route  path='/login' element={<LoginScreen/>} />
      <Route  path='/register' element={<RegisterScreen/>} />
     <Route path="" element={<PrivateRoute/>}>
      <Route  path='/profile' element={<ProfileScreen/>} />
      </Route>     
    </Route>

<Route path='/admin' element={<Admin/>} >
<Route index={true} path='/admin' element={<AdminScreen/>} />
<Route path='/admin/adminhome' element={<AdminHome/>}/>
<Route path='/admin/newuserscreen' element={<NewUserScreen/>}/>
<Route path='/admin/edituserscreen' element={<EditScreen/>}/>    
</Route>
</>
  )
)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
  </Provider>
);


