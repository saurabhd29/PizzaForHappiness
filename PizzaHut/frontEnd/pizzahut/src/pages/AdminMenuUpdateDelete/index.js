import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify"
import { Navigate, useNavigate } from "react-router"
// import AdminPizzaDetails from "../AdminPizzaDetails";
import NavBarAdmin from "../components/NavBarAdmin";
import { Link } from "react-router-dom";
import { URL } from "../../config";
import TotalSales from "../components/TotalSales";

const AdminMenuUpdateDelete = () => {
  const [menuData, setMenuData] = useState([]);
  const [currentMenu, setCurrentMenu] = useState({ menuId: 0, name: "", description: "", imageAddress: "", type: "", category: "" })

  const [menuId, setMenuId] = useState();
  const [name, setMenuName] = useState("");
  const [description, setDescription] = useState("");
  const [imageAddress, setImageAddress] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [changes, setChanges] = useState([])

  const { userId, firstName, role } = sessionStorage;

  const navigate = useNavigate();


  function getMenu() {
    const url= `${URL}/menu/gelAllMenu`
    axios.get(url).then((response) => {
      setMenuData(response.data.data);
      console.log(response.data)
      // setImages(result["data"])
    });
  }

  useEffect(() => {

    if (userId != undefined && role == "admin") {
      // axios.get("http://localhost:8080/menu/gelAllMenu").then((response) => {
      //   setMenuData(response.data.data);
      //   console.log(response.data)
      //   // setImages(result["data"])
      // });
      getMenu();
    }
    else {
      toast.warning("Login First")
      navigate("/login")
    }

  }, []);



  const deleteMenu = (id) => {

    const url = `${URL}/pizzaMenu/delete/${id}`

    axios.delete(url).then((response) => {

      const result = response.data
      console.log(result)
      getMenu();
      if (result['status'] == 'success') {
        toast.success(result['data'].affectedRows)
        // window.location.reload();
        changes.push(0);

      }
    })
  }

  const deleteSize = (id) => {

    const url = `${URL}/sizes/delete/${id}`

    axios.delete(url).then((response) => {

      const result = response.data
      console.log(result)
      getMenu();
      if (result['status'] == 'success') {
        toast.success(result['data'].affectedRows)
        // window.location.reload();
        // setChanges(0);

      }
    })



  }

  const updateMenu = (id) => {
    const url = `${URL}/menu/getMenuById/${id}`
    axios.get(url).then((response) => {

      console.log('current updated menu data= ')
      console.log(response.data)
      getMenu();

      setCurrentMenu(response.data.data)
      setMenuId(id)
      setMenuName(response.data.data.name)
      setDescription(response.data.data.description)
      setImageAddress(response.data.data.imageAddress)
      setType(response.data.data.type)
      setCategory(response.data.data.category)
    });
  }




  const updatePizzaInDatabase = () => {
    setMenuId(currentMenu.pizzaid)

    const body = {
      menuId,
      name,
      description,
      imageAddress,
      type,
      category,
    }

    const url = `${URL}/pizzaMenu/updatePizzaInDatabase`



    axios.put(url, body).then((response) => {
      const result = response.data
      console.log(result)
      getMenu();
      if (result['status'] == 'success') {
        toast.success('updated successfully')
        // window.location.reload();
        setMenuId();
        setMenuName("");
        setDescription("");
        setImageAddress("");
        setType("");
        setCategory("");
      }
      else {
        toast.error(result['error'])
      }
    });
  }


  const AddSize = (id, menuName) => {
    navigate("/adminaddsize", { state: { menuId: id, name: menuName } })

  }



  const goToVariantsPage = (name, id, size) => {

    // sessionStorage.setItem("id",pizzaid)
    navigate("/adminmenuvariantupdatedelete", { state: { sizeId: id, name, size } })
    // navigate("/AdminPizzaDetails")  
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
      {/* <div>
        <h1>Welcome</h1>
        <h1>{firstName}</h1>
        <h1>{userId}</h1>
        <h1>{role}</h1>
        
      </div> */}
      {/* <div>{currentMenu.type}</div> */}

      <div>
        <TotalSales/>
      <h1 style={{textAlign:'center'}}>Welcome Admin <b>{firstName}</b></h1>
        <br></br>
        
      </div>

      <table class="table table-bordered table-striped table-hover table-responsive">
        <thead className="table-primary">
          <tr>
            {/* <th scope="col">#</th> */}
            <th scope="col">menuId</th>
            <th scope="col">name</th>
            <th scope="col">description</th>
            <th scope="col">imageAddress</th>
            <th scope="col">type</th>
            <th scope="col">category</th>
            <th scope="col">Delete</th>
            <th scope="col">Update</th>
            <th scope="col">Sizes</th>
          </tr>
        </thead>
        <tbody>
          {menuData.map((menu) => {

            // if(menu.type !== 'xyz')
            //   { 
            return (
              <tr key={menu.pizzaId}>
                {/* <th scope="row">1</th> */}
                <td>{menu.menuId}</td>
                <td><b>{menu.name}</b></td>
                <td><b>{menu.description}</b></td>
                <td>
                  <img src={menu.imageAddress} height={80} width={100}></img>
                </td>
                <td><b>{menu.type}</b></td>
                <td><b>{menu.category}</b></td>
                <td><button onClick={() => deleteMenu(menu.menuId)} type="button" class="btn btn-danger">Delete</button></td>
                <td><button type="button" class="btn btn-dark" onClick={() => updateMenu(menu.menuId)} >Update</button></td>

                <td>

                  <div>


                  </div>

                  {/* {menu.size.map((x)=>{
                      return( */}
                  <tr>

                    {/* Table */}
                    <table class="table">
                      <thead className="table-primary">
                        <tr>
                          {/* <th scope="col">#</th> */}
                          <th scope="col">Sizes</th>
                          <th scope="col">Delete</th>
                          <th scope="col">Details</th>
                        </tr>
                      </thead>
                      <tbody>

                        {menu.size.map((x) => {
                          return (

                            <tr>
                              {/* <th scope="row">1</th> */}
                              <td>{x.size}</td>
                              <td><td>


                                <button type="button" class="btn btn-danger" onClick={() => (deleteSize(x.sizeId))}>Delete</button>

                              </td></td>
                              <td><button type="button" class="btn btn-dark" onClick={() => goToVariantsPage(menu.name, x.sizeId, x.size)}>Details</button></td>
                            </tr>

                          )


                        })
                        }
                        <button type="button" class="btn btn-primary pull-right" onClick={() => (AddSize(menu.menuId, menu.name))}  >Add Size</button>
                      </tbody>
                    </table>

                    {/* Table */}


                  </tr>
                  {/* ) */}
                  {/* })} */}
                </td>

              </tr>
            );
            // }



          })
          }
        </tbody>
      </table>

      <div>





      </div>

      <br></br>

      <div className='table-responsive'>
        <table className='table table-bordered'>
          <thead className="table-warning">
            <tr>
              <th>menuId</th>
              <th>Name</th>
              <th>description</th>
              <th>imageAddress</th>
              <th>type</th>
              <th>category</th>
              <th>update</th>
            </tr>
          </thead>
          <tbody>
            <tr>

              <td>
                {currentMenu.menuId}

              </td>
              <td>
                <input
                  onChange={(e) => {
                    setMenuName(e.target.value);
                  }}
                  type="text"
                  Value={currentMenu.name}
                />

              </td>
              <td>
                <input
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  type="text"
                  Value={currentMenu.description}
                />

              </td>

              <td>
                <input
                  onChange={(e) => {
                    setImageAddress(e.target.value);
                  }}
                  type="text"
                  Value={currentMenu.imageAddress} />
              </td>

              <td>
                <input
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                  type="text"
                  Value={currentMenu.type} />
              </td>

              <td>
                <input
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  type="text"
                  Value={currentMenu.category} />
              </td>


              <td>
                <button className='btn btn-primary'
                  onClick={updatePizzaInDatabase}
                >
                  Update
                </button>
              </td>
            </tr>
          </tbody>
        </table>

      </div>




    </div>





  );
};

export default AdminMenuUpdateDelete;
























// code to access nested objects
{/* <td>
<table className="table table-dark">
  <thead>
    <tr>
    <th scope="col">id(pk)</th>
    
      <th scope="col">size</th>
      <th scope="col">crust</th>
      <th scope="col">price</th>
    </tr>
  </thead>
  <tbody>
    {image.pizzaPriceSizeCrusts.map((item) => {
      return (
        <tr key={item.id}>
          <th scope="col">{item.id}</th>
          
          <th scope="col">{item.size}</th>
          <th scope="col">{item.crust}</th>
          <th scope="col">{item.price}</th>
        </tr>
      );
    })}
  </tbody>
</table>
</td> */}