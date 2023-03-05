
import { Link } from "react-router-dom";
import {Navigate, useNavigate} from "react-router"

const NavbarAdmin= ({logoutUser})=> {
const {firstName, role} = sessionStorage
const navigate= useNavigate();


const goto= () =>{
if (role== undefined)
  navigate("/Login")

if (role== "admin")
  navigate("/adminmenuupdatedelete")
  
  if (role== "co_admin")
  navigate("/Manager")

  if (role== "delivery_person")
  navigate("/DeliveryPerson")

  if (role== "customer")
  navigate("/")
}


return(
    <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  
    <Link to="/" ><img src="../images/pizzaHut.png" width="100" height="50"/></Link> 
  
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">

    <a class="nav-item nav-link dropdown-item" onClick={goto}>Welcome {firstName}</a>
      {/* <a class="nav-item nav-link active" href="#">Home <span class="sr-only">(current)</span></a> */}
      <a class="nav-item nav-link" href="#">  <Link to="/adminmenuupdatedelete" className="dropdown-item">Home</Link></a>
      
      <a class="nav-item nav-link" href="#">  <Link to="/adminaddmenu" className="dropdown-item">Add Menu</Link></a>
      <a class="nav-item nav-link " href="#"><Link to="/adminrolechange" className="dropdown-item">Change Role</Link></a>
      
      {firstName!=null ?  <a class="nav-item nav-link" ><button onClick={() => logoutUser()} className="dropdown-item">Logout</button></a> 
      : <a class="nav-item nav-link" href="#"><Link to="/Login" className="dropdown-item">Login</Link></a> }
    </div>
  </div>
  </nav>
</div>
);



}

export default NavbarAdmin