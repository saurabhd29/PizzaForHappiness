
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import axios from "axios";
import { URL } from '../../config'
import Navbar from "../components/NavBar";
import { useEffect } from "react";


const EditUserProfile = () => {

  const {userId}= sessionStorage;
  const [curUser, setCurUser]= useState([])
  


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [address, setAddress] = useState("");
  // const [role, setRole] = useState("customer");
  const navigate= useNavigate();


  useEffect(()=>{


  if(userId != undefined)
  {
  // axios.get(`http://localhost:8080/users/${userId}`).then((response)=>{
  axios.get(`${URL}/users/${userId}`).then((response)=>{
  setCurUser(response.data.data);
  setFirstName(response.data.data.firstName);
  setLastName(response.data.data.lastName);
  setEmail(response.data.data.email);
  setMobileNo(response.data.data.mobileNo);
  setAddress(response.data.data.address);

  })
}
  else
  {
    toast.warning("Login First")
    navigate("/Login")
  }

  


  },[]);


    const EditUser= () =>{
    if(firstName.length==0){ 
    toast.warning('please enter first name')
    }else if(lastName.length==0){
      toast.warning('please enter last Name ')}
    else if(email.length==0){
    toast.warning('please enter email')
    }
    else if(mobileNo.length==0){
    toast.warning('please enter Mobile Number ')
    }else if(address.length==0){
    toast.warning('please enter address')
    }else{ 
      const body = 
      {
        userId,
        firstName,
        lastName,
        email,
        mobileNo,
        address,
      }
            

          const url= `${URL}/users/update`
          axios.put(url, body).then((response) =>
          {
            

            const result= response.data
            console.log(result)
            if(result['status']== 'success')
            {
              toast.success('Successfully Updated')
              navigate('/edituserprofile')
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
      <h1 style={{textAlign:'left'}}>Hi  <b>{firstName}</b></h1>    
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <div className="form border border-primary p-4">
          
          <h1 className="title text-center m-3">Edit Profile</h1>
              
              
              <div className="mb-3 ">
                <label htmlFor="" className="label-control">
                  First Name
                </label>
                <input
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                  Value={curUser.firstName}
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
                  Value={curUser.lastName}
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
                  Value={curUser.email}
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
                type="number"
                className="form-control"
                Value={curUser.mobileNo}
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
                Value={curUser.address}
                />
              </div> 

              <div className="mb-3">
                <br></br>
                <button onClick={EditUser} className="btn btn-primary form-control">
                  Update Profile
                </button>

              </div> 





          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};



export default EditUserProfile
