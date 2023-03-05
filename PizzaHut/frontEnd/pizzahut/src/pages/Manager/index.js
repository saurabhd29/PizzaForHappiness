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

        if (userId != undefined && role == 'Manager') {
            // axios.get(`http://localhost:8080/orders/getAllOrders`).then((response) => {
            //     setAllOrders(response.data.data);
            //     console.log('allOrders');
            //     console.log(allOrders);
            // })
            getOrder();
        }
        else {
            toast.warning("Login as Manager first")
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

    const reject = (id) => {
        const orderStatus = "Denied"
        const orderId = id
        const paymentStatus = "Refunded";
        
        const body = {
            orderStatus,
            paymentStatus,
            
        }

        toast.warning('please Wait')
        const url = `http://localhost:8080/orders/denyOrder/${orderId}`

        axios.patch(url, body).then((response) => {
            const result = response.data
            console.log(result)
            getOrder();
            if (result['status'] == 'success') {
                toast.error('Order Denied successfully')
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

               <h1 style={{textAlign:'center'}}>Welcome Manager <b>{firstName}</b></h1>
            <table class="table table-bordered table-striped table-hover table-responsive">
            <thead className="table-primary">
                      

                <tr>
                <th scope="col">OrderId</th>
                <th scope="col">Items</th>
                <th scope="col">TotalAmount</th>
                <th scope="col">OrderStatus</th>
                <th scope="col">PaymentStatus</th>
                <th scope="col">Action</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
            {allOrders.map((item)=>{
                   
                   if(item.orderStatus=='placed') 
                   {
                       
                           return(
                            <tr>
                            <th scope="row">{item.orderId}</th>
                            <td>{item.items}</td>
                            <td>{item.totalAmount}</td>
                            <td>{item.orderStatus}</td>
                            <td>{item.paymentStatus}</td>
                            <td><button type="button" class="btn btn-success" onClick={()=>update(item.orderId)} >Accept</button></td>
                            <td><button type="button" class="btn btn-danger" onClick={()=>reject(item.orderId,{firstName})} >Deny</button></td>
                            </tr>
                        );

                       
                   
                    }         
                    
                    

                })}
             
            </tbody>
            </table>

        </div >);



}



export default Manager