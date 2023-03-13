import axios from "axios"
import { updateLocale } from "moment";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import Navbar from "../components/NavBar";
import { URL } from "../../config";
import TotalSales from "../components/TotalSales";
import NavbarAdmin from "./NavBarAdmin";


const Orders = () => {

   
    const [allOrders, setAllOrders] = useState([]);
    const { userId, firstName, role , totalAmount} = sessionStorage;
    const navigate = useNavigate();

    const logoutUser= ()=> {

        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('firstName');
        sessionStorage.removeItem('role');
        toast.success("Logged out Successfully")
        navigate("/")
        
        }


        function getOrder(){
            axios.get(`${URL}/orders/getAllOrders`).then((response) => {
                setAllOrders(response.data.data);
                console.log('allOrders');
                console.log(allOrders);
        })
        }

    useEffect(() => {

        if (userId != undefined && (role == 'Manager' || role == 'admin' )) {
            
            getOrder();
        }
        else {
            toast.warning("Login as Manager first")
            //navigate("/Login")
        }
    }, []);


   



    return (<div>
                <div>
                    {role == "admin" ? <NavbarAdmin logoutUser={logoutUser} /> :
                     <Navbar logoutUser={logoutUser} />}
                
            </div>
        {/* <div>
            <h1>userId={userId}</h1>
            <h1>firstname= {firstName}</h1>
            <h1>role= {role}</h1>
        </div> */}
                <TotalSales />
               <h1 style={{textAlign:'center'}}>Welcome <b>{firstName}</b></h1>
            <table class="table table-bordered table-striped table-hover table-responsive">
            <thead className="table-primary">
                      

                <tr>
                <th scope="col">OrderId</th>
                <th scope="col">Items</th>
                <th scope="col">TotalAmount</th>
                <th scope="col">OrderStatus</th>
                <th scope="col">PaymentStatus</th>
                
                </tr>
            </thead>
            <tbody>
            {allOrders.map((item)=>{
                   
                   
                   
                       
                           return(
                            <tr>
                            <th scope="row">{item.orderId}</th>
                            <td>{item.items}</td>
                            <td>{item.totalAmount}</td>
                            <td>{item.orderStatus}</td>
                            <td>{item.paymentStatus}</td>
                            </tr>
                        );

                       
                   
                            
                    
                    

                })}
                <tr>

                </tr>
            </tbody>
            <thead>
            <tr>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col">{totalAmount}</th>
                <th scope="col"></th>
                <th scope="col"></th>
                
                </tr>
            <tr>
                <th scope="col">OrderId</th>
                <th scope="col">Items</th>
                <th scope="col">TotalAmount</th>
                <th scope="col">OrderStatus</th>
                <th scope="col">PaymentStatus</th>
                
                </tr>
            </thead>
            </table>

        </div >);



}



export default Orders