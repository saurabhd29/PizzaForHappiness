import { useEffect, useState } from "react";

import { NavigationType, useLocation, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router";
import { URL } from "../../config";

const AdminMenuVariantUpdateDelete = () => {
  // const id=sessionStorage.getItem("id")
  const { state } = useLocation();
  const { sizeId, name, size } = state;
  const [menuVarients, setMenuVarients] = useState([]);


  const [currentVariantUpdate, setCurrentVariantUpdate]= useState({variantId: 0, variant:"",  price:"" })

  const[ variantId, setVariantId]= useState("");
  const[ variant, setVariant]= useState("");
  const[ price, setPrice]= useState("");

  const {userId, firstname, role}= sessionStorage


const navigate= useNavigate();

  useEffect(() => {

    if(userId!=undefined && role=="admin")
    {
      const url = `${URL}/variants/getById/${id}`
      const id = sizeId;
    axios
      .get(url)
      .then((response) => {
        setMenuVarients(response.data.data);
        console.log(response.data)
      });

    }
    else{
      toast.warning("Login As Admin First");
      navigate("/Login")
    }


    
  }, []);




  const deleteItem= (id) =>{

    const url= `${URL}/variants/delete/${id}`
  
    axios.delete(url).then((response)=>{
  
      const result= response.data
      console.log(result)
      if(result['status']== 'success')
      {
        toast.success(result['data'].affectedRows)
        window.location.reload();
  
      }
    })
  
  }



  const updateVariant=(id)=>{
    
    const url= `${URL}/variants/getVariantById/${id}`
    
    axios.get(url).then((response)=>{
      setCurrentVariantUpdate(response.data.data)
      console.log(response.data)
      
      setVariantId(response.data.data.variantId);
      setVariant(response.data.data.variant);
      setPrice(response.data.data.price);
      
    });

  
  }



  const updateVariantInDatabase=()=>{
    // setPizzaId(currentPizza.pizzaid)
    
    const body={
      sizeId,
      variantId,
      variant,
      price,
    }
    
    const url= `${URL}/variants/update/`
    
    
    
    axios.put(url,body).then((response)=>{
      const result= response.data
              console.log(result)
              if(result['status']== 'success')
              {
                toast.success('updated successfully')
                window.location.reload();
                
              }
              else
              {
                toast.error(result['error'])
              }
    });
    }
   
    const addNewVariant=()=>{
  
      // navigate("/adminaddmenuvariant", { state: { PizzaMenuId: pId} });
      navigate("/adminaddmenuvariant", {state:{sizeId, name, size }});
        
    }

  return (
  <div>
    <h1>sizeId= {sizeId}</h1>
    <h1>name= {name}</h1>
    <h1>size= {size}</h1>


<div>
  <h1>UserId= {userId}</h1>
  <h1>Name= {firstname}</h1>
  <h1>role= {role}</h1>
</div>

    <div class="text-right">
      <button type="button" class="btn btn-primary pull-right" onClick={addNewVariant} >Add New</button>
      </div>

      <div>
        <table class="table table-bordered table-striped table-hover table-responsive">
          <thead className="table-primary">
            <tr>
              {/* <th scope="col">#</th> */}
              <th scope="col">variantId</th>
              <th scope="col">variant</th>
              <th scope="col">price</th>
              <th scope="col">Delete</th>
              <th scope="col">Update</th>
            </tr>
          </thead>
          <tbody>

            {menuVarients.map((item) => {
              return (
                <tr key={item.variantId}>
                  {/* <th scope="row">1</th> */}
                  <td>{item.variantId}</td>
                  <td>{item.variant}</td>
                  <td>{item.price}</td>
                  <td><button onClick={()=> deleteItem(item.variantId)} type="button" class="btn btn-danger">Delete</button></td>
                   <td><button onClick={()=>updateVariant(item.variantId)} type="button" class="btn btn-dark"  >Update</button></td>
                  
                  {/* <td><button  type="button" class="btn btn-dark"  >Update</button></td> */}
                </tr>
              ); // end of return
            })}
          </tbody>
        </table>
      </div>


      <div>  

          <div className='table-responsive'>
              <table className='table table-bordered'>
                  <thead>
                      <tr>
                          <th>variantId</th>
                          <th>variant</th>
                          <th>price</th>
                          <th>update</th>
                      </tr>
                  </thead>
                  <tbody>
                     <tr>

                           <td>
                             {currentVariantUpdate.variantId}
                            </td> 
                          
                          
                          <td>
                          <input 
                          onChange={(e) => {
                            setVariant(e.target.value);
                          }}
                          type="text"
                          Value={currentVariantUpdate.variant}  
                          />
                          </td>

                          <td>
                          <input  
                          onChange={(e) => {
                            setPrice(e.target.value);
                          }}
                          type="text"
                          Value={currentVariantUpdate.price} 
                          />

                          </td>

                          
                          <td>
                          <button className='btn btn-primary'
                          onClick={updateVariantInDatabase}
                          >
                                  Update 
                            </button>
                          </td>

                        </tr> 
                  </tbody>
              </table>
              </div>
              {/* table end div */}

        </div>

  </div>
  );
};

export default AdminMenuVariantUpdateDelete;
