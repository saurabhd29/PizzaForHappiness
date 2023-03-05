import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
// import { NavigationType } from "react-router";
import { useLocation, useNavigate } from "react-router";
import { URL } from "../../config";

const AdminAddMenuVariant = () => {
  const { state } = useLocation();
  const { sizeId, name, size } = state;
  
  const[variant, setVariant]= useState("");
  const[price, setPrice]= useState("");
  
  const navigate=useNavigate();
  

  const addNewMenuVariant=()=>{

    if(variant.length==0)
    {
      toast.warning('please enter Variant')
    }
    else if(price.length==0)
    {
      toast.warning('please enter price of menu Item')
    }
    else {
      
      const body={
        sizeId,
        variant,
        price,
        }

        console.log(body)
    const url= `${URL}/variants/AddNewVariant`
    axios.post(url,body).then((response)=>{

      const result= response.data

      if(result['status']=='success')
      {
        toast.success('Successfully added new Variant')
        
        navigate("/adminmenuvariantupdatedelete", { state: { sizeId, name, size} });
      }
      else
      {
        toast.error(result['error'])
      }

    })

    }

  }


 return(


  <div>{/* Starting of Div 1 */}
  <div>
    <h1>{sizeId}</h1>
    <h1>{name}</h1>
    <h1>{size}</h1>
  </div>

      <div className="row"> {/* Starting of Div 2 */}
          <div className="col"></div>
              <div className="col">
                <div className="form">
                <h3 className="title">Add New Menu Variant</h3>

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
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  type="number"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <button onClick={addNewMenuVariant} className="btn btn-primary">
                Add New Menu Variant
                </button>
              </div> 
                </div>
              </div>
          <div className="col"></div>
      </div>  {/* //end of div 2    */}
            
    </div>);  //end of div 1  

}
export default AdminAddMenuVariant

