import axios from "axios"
import { updateLocale } from "moment";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import Navbar from "../components/NavBar";



const Manager = () => {


    const [allOrders, setAllOrders] = useState([]);
    const { userId, firstName, role } = sessionStorage;
    const navigate = useNavigate();

    const logoutUser= ()=> {

        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('firstName');
        sessionStorage.removeItem('role');
        toast.success("Logged out Successfully")
        navigate("/")
        
        }


        function getOrder(){
            axios.get(`http://localhost:8080/orders/getAllOrders`).then((response) => {
                setAllOrders(response.data.data);
                console.log('allOrders');
                console.log(allOrders);
        })
        }

    useEffect(() => {

        if (userId != undefined && role == 'co_admin') {
            // axios.get(`http://localhost:8080/orders/getAllOrders`).then((response) => {
            //     setAllOrders(response.data.data);
            //     console.log('allOrders');
            //     console.log(allOrders);
            // })
            getOrder();
        }
        else {
            toast.warning("Login as co_admin first")
            //navigate("/Login")
        }
    }, []);


    const update = (id) => {
        const orderStatus = "accepted"
        const orderId = id
        const paymentStatus = "pending";

        const body = {
            orderStatus,
            paymentStatus,
        }


        // console.log("orderId"+orderId)
        // console.log("orderStatus"+orderStatus)
        // console.log("paymentStatus"+paymentStatus)
        toast.warning('please Wait')
        const url = `http://localhost:8080/orders/acceptOrder/${orderId}`

        axios.patch(url, body).then((response) => {
            const result = response.data
            console.log(result)
            getOrder();
            if (result['status'] == 'success') {
                toast.success('Accepted successfully')
                //   window.location.reload();

            }
            else {
                toast.error(result['error'])
            }
        });
    }



    return (<div>
                <div>
                <Navbar logoutUser={logoutUser} />
            </div>
        {/* <div>
            <h1>userId={userId}</h1>
            <h1>firstname= {firstName}</h1>
            <h1>role= {role}</h1>
        </div> */}

               <h1 style={{textAlign:'center'}}>Manager</h1>
            <table class="table">
            <thead>
                      

                <tr>
                <th scope="col">OrderId</th>
                <th scope="col">UserId</th>
                <th scope="col">TotalAmount</th>
                <th scope="col">OrderStatus</th>
                <th scope="col">PaymentStatus</th>
                <th scope="col">Accept order</th>
                </tr>
            </thead>
            <tbody>
            {allOrders.map((item)=>{
                   
                   if(item.orderStatus=='placed') 
                   {
                       
                           return(
                            <tr>
                            <th scope="row">{item.orderId}</th>
                            <td>{item.user.userId}</td>
                            <td>{item.totalAmount}</td>
                            <td>{item.orderStatus}</td>
                            <td>{item.paymentStatus}</td>
                            <td><button type="button" class="btn btn-dark" onClick={()=>update(item.orderId)} >Accept</button></td>
                            </tr>
                        );

                       
                   
                    }         
                    
                    

                })}
             
            </tbody>
            </table>

        </div >);



}



export default Manager