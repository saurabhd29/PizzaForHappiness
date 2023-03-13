import axios from "axios"
import { updateLocale } from "moment";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import Navbar from './../components/NavBar'
import { URL } from "../../config";


const DeliveryPerson= ()=>{

   
    const [allOrders, setAllOrders] = useState([]);

    const { userId, firstName, role} = sessionStorage
    const navigate= useNavigate();

    const logoutUser= ()=> {

        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('firstName');
        sessionStorage.removeItem('role');
        toast.success("Logged out Successfully")
        navigate("/")
        
        }


        function getOrder(){
            axios.get(`${URL}/orders/getAllOrders`).then((response)=>{
    
                // console.log(response.data.data);
                // console.log(response.data);
                setAllOrders(response.data.data);
                console.log('allOrders');
                console.log(allOrders);
                })
        }

    useEffect(  ()=>{

        if(userId != undefined && role=="delivery_person")
        {
            
            getOrder()
        }
        else{
            toast.warning("Login As delivery person First");
        navigate("/Login")
        }



      },[]);


        const update= (id)=>{
            const orderStatus= "delivered"
            const orderId= id
            const paymentStatus= "Paid";

            const body={
                orderStatus,
                paymentStatus,
            }


            // console.log("orderId"+orderId)
            // console.log("orderStatus"+orderStatus)
            // console.log("paymentStatus"+paymentStatus)
            toast.warning('please Wait')
            const url=`${URL}/orders/acceptOrder/${orderId}`

            axios.patch(url, body).then((response)=>{
                const result= response.data
                        // console.log(result)
                        getOrder();
                        
                        if(result['status']== 'success')
                        {
                          toast.success('delivered successfully')
                        //   window.location.reload();
                          
                        }
                        else
                        {
                          toast.error(result['error'])
                        }
              });
            }

        

            return(<div>
                <div><Navbar logoutUser={logoutUser}/></div>
                <div><h1 style={{textAlign:'center'}}>Delivery Partner {firstName}</h1>

                </div>
            <table class="table table-bordered table-striped table-hover table-responsive">
            <thead className="table-primary">
                      

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
                   
                   if(item.orderStatus=='accepted') 
                   {
                       
                           return(
                            <tr>
                            <th scope="row">{item.orderId}</th>
                            <td>{item.user.userId}</td>
                            <td>{item.totalAmount}</td>
                            <td>{item.orderStatus}</td>
                            <td>{item.paymentStatus}</td>
                            <td><button type="button" class="btn btn-dark" onClick={()=>update(item.orderId)} >Deliver</button></td>
                            </tr>
                        );

                       
                   
                    }         
                    
                    

                })}
             
            </tbody>
            </table>

        </div>);



}



export default DeliveryPerson