import { useLocation } from "react-router";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useEffect } from "react/cjs/react.production.min";
import Navbar from "../components/NavBar";
import { URL } from "../../config";

const AdminAddSize= () =>{

const { state } = useLocation();
const { menuId, name }= state;

//Sizes Table
const [size, setSize]= useState("small");
// const [size, setSize]= useState("small");

//Variants Table
const[variant, setVariant]= useState("");
const[price, setPrice]= useState("");
const {userId ,firstname, role} = sessionStorage

const navigate= useNavigate();

const addSizeInDatabase= ()=>{


if(size.length==0)
{
  toast.warning("enter size (small,medium,large)")
}
else if(variant.length==0)
{
  toast.warning("enter variant")
}
else if(price.length==0)
{
  toast.warning('enter price')
}
else{
  const body={
    menuId,
    size,
    variant,
    price,
  }

  const url= `${URL}/sizes/addSizeInDatabase/`
  axios.post(url,body).then((response)=>{

    const result= response.data
    if(result['status']=='success')
    {
      toast.success("Successfully Added in database")
      navigate("/adminmenuupdatedelete")

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


return(
<div>
  
  <Navbar logoutUser={logoutUser}/>
  <div>
    <h1>menuId= {menuId}</h1>
    <h1>name= {name}</h1>
    <h1>size= {size}</h1>
  </div>
<div className="row"> {/* Starting of Div 2 */}
          <div className="col"></div>
              <div className="col">
                <div className="form">
                <h1 className="title">Add Menu Size</h1>

                <div className="mb-3">
              <label htmlFor="" className="label-control">
                  size
                </label>
                {/* <input 
                onChange={(e)=>{
                    setSize(e.target.value)
                }}
                type="text"
                className="form-control"
                /> */}

            <select class="form-select" aria-label="Default select example" onChange={(e)=>{setSize(e.target.value)}}>
                  <option value={"small"}>small</option>
                  <option value={"medium"}>medium</option>
                  <option value={"large"}>large</option>
                </select>


              </div>



                <div className="mb-3">
                <label htmlFor="" className="label-control">
                  variant
                </label>
                <input
                onChange={(e)=>{
                    setVariant(e.target.value)
                }}
                type="text"
                className="form-control"
                />
              </div>

            


              <div className="mb-3">
              <label htmlFor="" className="label-control">
                  price
                </label>
                <input 
                onChange={(e)=>{
                    setPrice(e.target.value)
                }}
                type="number"
                className="form-control"
                />
              </div>

              <div className="mb-3">
                <button onClick={addSizeInDatabase} className="btn btn-primary">
                  Add New Size
                </button>
              </div> 
                </div>
              </div>
          <div className="col"></div>
          


      </div>  

</div>

)
    

}


export default AdminAddSize;