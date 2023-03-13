// import axion from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import axios from "axios";
import { URL } from '../../config'
import Navbar from "../components/NavBar";


const Register = () => {
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("customer");

  const navigate= useNavigate();

    const registerUser= () =>{
    if(firstName.length==0){ 
    toast.warning('please enter first name')
    }else if(lastName.length==0){
      toast.warning('please enter last Name ')}
    else if(email.length==0){
    toast.warning('please enter email')
    }else if(password.length==0){
    toast.warning('please enter Password')
    }else if(confirmPassword.length==0){
    toast.warning('please enter Confirm password')
    }else if(mobileNo.length==0){
    toast.warning('please enter Mobile Number ')
    }else if(address.length==0){
    toast.warning('please enter address')
    }else if(email.length==0){
    toast.warning('please enter email')
    }else if(password!=confirmPassword){
    toast.warning('password did not match')
    }else{ 
      toast.info('Registration in process', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
      const body = {
        firstName,
        lastName,
        email,
        password,
        mobileNo,
        address,
        role,
                  }
            

          const url= `${URL}/users/register`
          axios.post(url, body).then((response) =>
          {
            

            const result= response.data
            console.log(result)
            if(result['status']== 'success')
            {
              toast.success('Successfully registered new user')
              navigate('/login')
            }
            else
            {
              toast.error(result['error'])
            }


          })
  
        }   

  }

  const logoutUser= ()=> {

    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('firstName');
    sessionStorage.removeItem('role');
    toast.success("Logged out Successfully")
    navigate("/")
    
    }




  return (
    <div>
      <Navbar logoutUser={logoutUser}/>

      <div className="row ">
        <div className="col"></div>
        <div className="col ">
          <div className=" form border border-primary p-4">
          
          <h1 className="text-center m-1">Register New User</h1>
              
              
              <div className="mb-3">
                <label htmlFor="" className="label-control">
                  First Name
                </label>
                <input
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="" className="label-control">
                  Last Name
                </label>
                <input
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="" className="label-control">
                  Email
                </label>
                <input 
                  onChange={(e)=>{
                     setEmail(e.target.value) 
                  }}
                  type="email"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="" className="label-control">
                  password
                </label>
                <input
                onChange={(e)=>{
                  setPassword(e.target.value)
                }}
                type="password"
                className="form-control"
                />
              </div>    

              <div className="mb-3">
                <label htmlFor="" className="label-control">
                  Confirm Password
                </label>
                <input
                onChange={(e)=>{
                  setConfirmPassword(e.target.value)
                }}
                type="password"
                className="form-control"
                />
              </div> 


              <div className="mb-3">
                <label htmlFor="" className="label-control">
                  Mobile Number
                </label>
                <input
                onChange={(e)=>{
                  setMobileNo(e.target.value)
                }}
                type="text"
                className="form-control"
                maxlength="10" 
                />
              </div> 


              <div className="mb-3">
                <label htmlFor="" className="label-control">
                  Address
                </label>
                <input
                onChange={(e)=>{
                   setAddress(e.target.value)
                }}
                type="text"
                className="form-control"
                />
              </div> 

              <div className="mb-3">
                <div>
                  Already Have an Account? <Link to="/login">Login Here</Link>
                </div>
                <br></br>
                <button onClick={registerUser} className="btn btn-primary form-control">
                  Register
                </button>

              </div> 





          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default Register;
