import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { FunctionsTwoTone } from "@mui/icons-material";

const AdminRoleChange = () => {

    const [allUsers, setAllUsers] = useState([]);
    const [newRole, setNewRole] = useState("customer");
    const { userId, firstName, role } = sessionStorage;

    const navigate = useNavigate();

    const logoutUser = () => {

        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('firstName');
        sessionStorage.removeItem('role');
        toast.success("Logged out Successfully")
        navigate("/")

    }


    function getUser(){
        axios.get('http://localhost:8080/users/getAllUsers').then((response) => {
            setAllUsers(response.data.data)
        })
    }


    useEffect(() => {


        if (userId != undefined && role == "admin") {
            //   axios.get("http://localhost:8080/menu/gelAllMenu").then((response) => {
            //     setMenuData(response.data.data);
            //     console.log(response.data)
            //     // setImages(result["data"])
            //   });
            getUser();
            // axios.get('http://localhost:8080/users/getAllUsers').then((response) => {
            //     setAllUsers(response.data.data)
            // })

        }
        else {
            toast.warning("Login First")
            navigate("/login")
        }





        //     axios.get('http://localhost:8080/users/getAllUsers').then((response)=>{
        //         setAllUsers(response.data.data)
        //     })
    }, []);


    const updateRole = (id) => {

        const body = {
            userId: id,
            role: newRole
        }

        const URL = `http://localhost:8080/users/ChangeRole`


        axios.put(URL, body).then((response) => {
            const result = response.data
            getUser();
            if (result['status'] == 'success') {
                toast.success('Successfully Updated')
                // navigate('/HomePage')
                //   navigate('/AdminMenuUpdateDelete')
            }
            else {
                toast.error(result['error'])
            }


        })



    }



    return (
        <div>
            <Navbar logoutUser={logoutUser} />
            {/* <h1>{newRole}</h1>
     */}

            <br></br>
            <br></br>

            <div className="mb-3">
                <button className="btn btn-primary" >
                    <Link style={{ color: 'white' }} to={'/AdminMenuUpdateDelete'}>
                        Back
                    </Link>
                </button>
            </div>

            <br></br>
            <br></br>
            <table class="table">
                <thead>


                    <tr>


                        <th scope="col">UserId</th>
                        <th scope="col">firstName</th>
                        <th scope="col">lastName</th>
                        {/* <th scope="col">email</th> */}
                        <th scope="col">mobile Number</th>
                        <th scope="col">current Role</th>
                        <th scope="col">change Role</th>
                        <th scope="col">update</th>

                    </tr>
                </thead>
                <tbody>

                    {allUsers && allUsers.map((user) => {

                        //    if(item.orderStatus!='delivered') 
                        //    {

                        return (
                            <tr>
                                <th scope="row">{user.userId}</th>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                {/* <td>{user.email}</td> */}
                                <td>{user.mobileNo}</td>
                                <td>{user.role}</td>
                                <td>
                                    <select class="form-select" aria-label="Default select example" onClick={(e) => { setNewRole(e.target.value) }}>
                                        <option value={"customer"}>customer</option>
                                        <option value={"co_admin"}>co_admin</option>
                                        <option value={"delivery_person"}>delivery_person</option>
                                    </select>
                                </td>
                                <td><button type="button" class="btn btn-warning" onClick={() => { updateRole(user.userId) }}>Update</button></td>
                            </tr>
                        );



                    }



                        // }
                    )
                    }

                </tbody>
            </table>



        </div>


    );


}


export default AdminRoleChange;