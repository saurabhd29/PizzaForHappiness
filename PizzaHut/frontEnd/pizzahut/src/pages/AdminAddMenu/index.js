import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import NavBarAdmin from "../components/NavBarAdmin";
import { URL } from "../../config";


const AdminAddMenu = () => {

  const [imageName, setImageName] = useState("")
  let imageAddress;

  //for menu Table
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // const [imageAddress, setImageAddress]= useState("");

  const [type, setType] = useState("Pizza");
  const [category, setCategory] = useState("Veg");

  //for Sizes Table
  const [size, setSize] = useState("Small");


  //for variants Table
  const [variant, setVariant] = useState("");
  const [price, setPrice] = useState("");


  const navigate = useNavigate();

  const addNewMenuItem = () => {

    if (name.length == 0) {
      toast.warning('please enter name of menu Item')
    }
    else if (description.length == 0) {
      toast.warning('please enter description of menu Item')
    }
    else if (imageName.length == 0) {
      toast.warning('please enter Image Address of menu Item')
    }
    else if (type.length == 0) {
      toast.warning('please enter type of menu item  (pizza/dessert/sides/beverages)')
    }
    else if (category.length == 0) {
      toast.warning('please enter category of menu item (veg or non_veg)')
    }
    else if (size.length == 0) {
      toast.warning('please enter Size (small, Medium, or Large)')
    }
    
    else if (price.length == 0) {
      toast.warning('please enter price of variant')
    }
    // else if( typeof(price) != Number )
    // {
    //   toast.warning('Only integer numbers are allowed in price')
    // }


    else {

      imageAddress = './images/' + imageName;

      console.log(imageAddress)
      const body = {
        name,
        description,
        imageAddress,
        type,
        category,
        size,
        variant,
        price,
      }

      console.log(body)
      const url = `${URL}/menu/AddMenuItem`
      
      axios.post(url, body).then((response) => {

        const result = response.data
        if (result['status'] == 'success') {
          toast.success('Successfully added new Menu Item')
          // navigate('/HomePage')
          navigate('/AdminMenuUpdateDelete')
        }
        else {
          toast.error(result['error'])
        }

      })

    }

  }
  const logoutUser = () => {

    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('firstName');
    sessionStorage.removeItem('role');
    toast.success("Logged out Successfully")
    // navigate("/")
     navigate("/")

  }


  return (
    
    <div>
       <NavBarAdmin logoutUser={logoutUser} />
       <h1 className="title" style={{textAlign:'center'}}>Add Menu Item</h1>
      <br></br>

      <div className="row"> {/* Starting of Div 2 */}
        <div className="col"></div>
        <div className="col" style={{ border:'1px solid #000000'}}>
        
          <div className="form">
            
            <div className="mb-3">
              <label htmlFor="" className="label-control">
                Name
              </label>
              <input

                onChange={(e) => {
                  setName(e.target.value)
                }}
                type="text"
                className="form-control"
              />
            </div>



            <div className="mb-3">
              <label htmlFor="" className="label-control">
                Description
              </label>
              <input
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
                type="text"
                className="form-control"
              />
            </div>


            <div className="mb-3">
              <label htmlFor="" className="label-control">
                imageName (ex: image_Name.jpg)
                
                
              </label>
              <input
                onChange={(e) => {
                  setImageName(e.target.value);
                }}
                type="text"
                className="form-control"
              />
            </div>


            <div className="mb-3">
              <label htmlFor="" className="label-control" style={{}}>
                Type
              </label>
              <br></br>
              <select style={{width:500}} onClick={(e) => {
                  setType(e.target.value);    }}>
                <option value="Pizza">Pizza</option>
                <option value="Dessert">Dessert</option>
                <option value="Sides">Sides</option>
                <option value="Beverages">Beverages</option>
                
              </select>
              {/* <input
                onChange={(e) => {
                  setType(e.target.value);
                }}
                type="text"
                className="form-control"
              /> */}
            </div>


            <div className="mb-3">
              <label htmlFor="" className="label-control">
                Category 
              </label>
              <br></br>
              <select style={{width:500}} onClick={(e) => {
                  setCategory(e.target.value);   }}>
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
                
              </select>
              {/* <input
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                type="text"
                className="form-control"
              /> */}
            </div>


            <div className="mb-3">
              <label htmlFor="" className="label-control">
                Size 
              </label>
              <br></br>
              <select style={{width:500}} onClick={(e) => {
                  setSize(e.target.value); }}>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
              {/* <input
                onChange={(e) => {
                  setSize(e.target.value);
                }}
                type="text"
                className="form-control"
              /> */}
            </div>


            <div className="mb-3">
              <label htmlFor="" className="label-control">
                variant
              </label>
              
              <input
                onChange={(e) => {
                  setVariant(e.target.value);
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
              <button onClick={addNewMenuItem} className="btn btn-primary form-control" style={{ marginRight: 10 }}>
                Add New Menu Item
              </button>
              
            </div>
          </div>
        </div>
        <div className="col"></div>



      </div>
      {/* //end of div 2    */}









    </div>);  // end of div 1  






}

export default AdminAddMenu
