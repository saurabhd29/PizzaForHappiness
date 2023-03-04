import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";



const AdminAddMenu = () => {

  const [imageName, setImageName] = useState("")
  let imageAddress;

  //for menu Table
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // const [imageAddress, setImageAddress]= useState("");

  const [type, setType] = useState("");
  const [category, setCategory] = useState("");

  //for Sizes Table
  const [size, setSize] = useState("");


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
    else if (variant.length == 0) {
      toast.warning('please enter variant')
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
      const url = `http://localhost:8080/menu/AddMenuItem`
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



  return (
    <div>{/* Starting of Div 1 */}



      <div className="row"> {/* Starting of Div 2 */}
        <div className="col"></div>
        <div className="col">
          <div className="form">
            <h1 className="title">Add Menu Item</h1>

            <div className="mb-3">
              <label htmlFor="" className="label-control">
                name
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
                description
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
                <br></br>
                copy image in public/images/
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
              <label htmlFor="" className="label-control">
                type (pizza/dessert/sides/beverages)
              </label>
              <input
                onChange={(e) => {
                  setType(e.target.value);
                }}
                type="text"
                className="form-control"
              />
            </div>


            <div className="mb-3">
              <label htmlFor="" className="label-control">
                category (veg or non_veg)
              </label>
              <input
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                type="text"
                className="form-control"
              />
            </div>


            <div className="mb-3">
              <label htmlFor="" className="label-control">
                Size (small/medium/large)
              </label>
              <input
                onChange={(e) => {
                  setSize(e.target.value);
                }}
                type="text"
                className="form-control"
              />
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
              <button onClick={addNewMenuItem} className="btn btn-primary" style={{ marginRight: 10 }}>
                Add New Menu Item
              </button>
              <button className="btn btn-primary" >
                <Link style={{ color: 'white' }} to={'/AdminMenuUpdateDelete'}>
                  Back
                </Link>
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
