import Login from './pages/Login'
import Register from './pages/Register'
import AdminAddMenu from './pages/AdminAddMenu'
import AdminMenuUpdateDelete from './pages/AdminMenuUpdateDelete'
import AdminMenuVariantUpdateDelete from './pages/AdminMenuVariantUpdateDelete'
import EditUserProfile from './pages/EditUserProfile'
import AdminAddMenuVariant from './pages/AdminAddMenuVariant'
import HomePage from './pages/HomePage/index' 
import UserOrder from './pages/UserOrder'
import AdminAddSize from './pages/AdminAddSize'
import Manager from './pages/Manager'
import DeliveryPerson from './pages/DeliveryPerson'
import AdminRoleChange from './pages/AdminRoleChange'

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Orders from './pages/components/Orders'







function App() {
  return (
    <div className="container">
    <BrowserRouter>
        <Routes>
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/adminaddmenu" element={<AdminAddMenu />} />
          <Route path="/adminmenuupdatedelete" element={<AdminMenuUpdateDelete />} />
          <Route path="/adminmenuvariantupdatedelete" element={<AdminMenuVariantUpdateDelete />} />
          <Route path="/edituserprofile" element={<EditUserProfile />} />
          <Route path="/adminaddmenuvariant" element={<AdminAddMenuVariant />} />
          <Route path="/" element={<HomePage/>} />
          <Route path="/userorder" element={<UserOrder/>} />
          <Route path="/adminaddsize" element={<AdminAddSize/>}/>
          <Route path="/Orders" element={<Orders/>}/>
          <Route path="/manager" element={<Manager/>}/>
          <Route path="/deliveryperson" element={<DeliveryPerson/>}/>
          <Route path="/adminrolechange" element={<AdminRoleChange/>}/>

        </Routes>
      </BrowserRouter>
      <ToastContainer theme="colored" />
    </div>
  );
}

export default App;
