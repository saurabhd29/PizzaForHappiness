import Navbar from "../components/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";



const UserOrder= () =>{

    const [allOrders, setAllOrders] = useState([]);
    const {userId, firstName, role}= sessionStorage;
    const navigate= useNavigate();

    const logoutUser= ()=> {

        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('firstName');
        sessionStorage.removeItem('role');
        toast.success("Logged out Successfully")
        navigate("/")
        
        }
        
        function userorder (){
            axios.get(`http://localhost:8080/orders/userOrderById/${userId}`).then((response)=>{

                // console.log(response.data.data);
                // console.log(response.data);
            
                setAllOrders(response.data.data);
                console.log('allOrders');
                console.log(allOrders);
                
                })
        }

useEffect(  ()=>{

    if(userId== undefined)
    {
        toast.warning("Login First");
        navigate("/Login")
    }
    else
    {
    //     axios.get(`http://localhost:8080/orders/userOrderById/${userId}`).then((response)=>{

    // // console.log(response.data.data);
    // // console.log(response.data);

    // setAllOrders(response.data.data);
    // console.log('allOrders');
    // console.log(allOrders);
    
    // })
    userorder()    

    }},[]);



return(
    
        <div>
            <div>
                <Navbar logoutUser={logoutUser} />
            </div>

            <div><h1>welcome {firstName}</h1></div>
            <br></br>
            <br></br>
            <br></br>
            
            
            <h1>Current Order</h1>
            <div>
            <table class="table">
            <thead>
                      

                <tr>
                
                <th scope="col">OrderId</th>
                <th scope="col">UserId</th>
                <th scope="col">TotalAmount</th>
                <th scope="col">OrderStatus</th>
                <th scope="col">PaymentStatus</th>
                </tr>
            </thead>
            <tbody>
            {allOrders.map((item)=>{
                   
                   if(item.orderStatus!='delivered') 
                   {
                       
                           return(
                            <tr>
                            <th scope="row">{item.orderId}</th>
                            <td>{item.user.userId}</td>
                            <td>{item.totalAmount}</td>
                            <td>{item.orderStatus}</td>
                            <td>{item.paymentStatus}</td>
                            </tr>
                        );

                       
                   
                    }         
                    
                    

                })}
             
            </tbody>
            </table>

            </div>


            <br></br>
            <br></br>
            <br></br>
            <br></br>




<h1>Delivered Orders</h1>
            <div>
            <table class="table">
            <thead>
                      

                <tr>
                
                <th scope="col">OrderId</th>
                <th scope="col">UserId</th>
                <th scope="col">TotalAmount</th>
                <th scope="col">OrderStatus</th>
                <th scope="col">PaymentStatus</th>
                </tr>
            </thead>
            <tbody>
            {allOrders.map((item)=>{
                   
                   if(item.orderStatus=='delivered') 
                   {
                       
                           return(
                            <tr>
                            <th scope="row">{item.orderId}</th>
                            <td>{item.user.userId}</td>
                            <td>{item.totalAmount}</td>
                            <td>{item.orderStatus}</td>
                            <td>{item.paymentStatus}</td>
                            </tr>
                        );

                       
                   
                    }         
                    
                    

                })}
             
            </tbody>
            </table>
            </div>


</div>

)
}


export default UserOrder