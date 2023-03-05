import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { toast } from "react-toastify";
import "./cart.css" ;
import { Scrollbars } from 'react-custom-scrollbars';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { URL } from "../../config";

const Cart= ({cartItems, onAdd, onRemove, cartFromLocalStorage})=>{
const TotalPrice =   cartItems.reduce((a,c)=> a+ c.price * c.qty, 0);  
const{userId, firstName, role} = sessionStorage

const[orderDetails, setOrderArray]= useState([]);
const navigate= useNavigate();


const onCheckout = () =>{

if(userId == undefined)
{
    toast.warning("Login first")
    navigate("/Login")
}
else{

    {cartItems.map((item)=>{
        setOrderArray([])
    
    
        const order =
        {
            name:item.name,
            size: item.selectedSize,
            variant:item.variant,
            quantity: item.qty,
            price: item.price,
            variantId: item.variantId,
            totalAmount: item.qty * item.price,        
        }
        orderDetails.push(order);
    })}
    
    console.log(orderDetails);
    
    const order=
    {
    userId : sessionStorage['userId'],
    totalAmount:TotalPrice,
    orderStatus: "placed",
    paymentStatus:"pending",
    
    orderDetails,
    }
    
    // console.log("order====");
    // console.log(order);
    
    if(order.totalAmount== 0)
    {
        toast.warning("select at least one item")
    }
    else
    {
        toast.warning('please wait---- Working on Order')
        const url1= `${URL}/orders/placeOrder`;
    axios.post(url1, order).then((response)=>{
    
        const result= response.data
        console.log(result)
        if(result['status']== 'success')
        {
          toast.success('order placed successfully')
          
        //   console.log(orderDetails)
        //   console.log('cartItems Before []===');
        //   console.log(cartItems);
        //   console.log('-----------------------------------------------------------------------');
          cartItems= [];
          
        //   console.log('cartItems After []===');
        //   console.log(cartItems);
        localStorage.removeItem("cartItems");
        navigate("/userorder")
        
        }
        else
        {
          toast.error(result['error'])
        }
    
    
    })
    

    }
    
    
    // console.log(orderDetails)
    // console.log('cartItems Before []===');
    // console.log(cartItems);
    // console.log('-----------------------------------------------------------------------');
    // cartItems= [];
    // console.log('cartItems After []===');
    // console.log(cartItems);
    
    // navigate("/userorder")
    


}

// {cartItems.map((item)=>{
//     setOrderArray([])


//     const order =
//     {
//         name:item.name,
//         size: item.selectedSize,
//         variant:item.variant,
//         quantity: item.qty,
//         price: item.price,
//         variantId: item.variantId,
//         totalAmount: item.qty * item.price,        
//     }
//     orderDetails.push(order);
// })}

// console.log(orderDetails);

// const order=
// {
// userId : 9,
// totalAmount:TotalPrice,
// orderStatus: "placed",
// paymentStatus:"pending",
// orderDetails,
// }

// console.log("order====");
// console.log(order);

// const url1= `http://localhost:8080/orders/placeOrder`;


// axios.post(url1, order).then((response)=>{

//     const result= response.data
//     console.log(result)
//     if(result['status']== 'success')
//     {
//       toast.success('order placed successfully')
      
//     //   console.log(orderDetails)
//     //   console.log('cartItems Before []===');
//     //   console.log(cartItems);
//     //   console.log('-----------------------------------------------------------------------');
//       cartItems= [];
//     //   console.log('cartItems After []===');
//     //   console.log(cartItems);


      
//       navigate("/userorder")
    
//     }
//     else
//     {
//       toast.error(result['error'])
//     }


// })


// console.log(orderDetails)
// console.log('cartItems Before []===');
// console.log(cartItems);
// console.log('-----------------------------------------------------------------------');
// cartItems= [];
// console.log('cartItems After []===');
// console.log(cartItems);

// // navigate("/userorder")

}


return(

  
<div className="cartDivision ">
    
        {/* <h1>Inside Cart</h1> */}
    <div  > 
        {cartItems.length===0 && <div>Cart is Empty</div>}
    </div>
    {cartItems.map((item)=>(
        <div key={item.variantId} className="row">
            <div className="col-2" style={{textAlign : "center"}}>{item.name}</div>
            <div className="col-2 " style={{textAlign : "center"}}>{item.selectedSize.charAt(0).toUpperCase()}</div>
            <div className="col-2" >{item.variant}</div>
            <div className="col-2">
                
                
                <AddCircleIcon  onClick={() => onAdd(item)}></AddCircleIcon>

                
                
                {/* <button onClick={() => onAdd(item)} className="add">
                    +
                </button> */}
                
                {/* <button onClick={() => onRemove(item)} className="remove">
                    -
                </button>     */}
                <RemoveCircleIcon onClick={() => onRemove(item)}></RemoveCircleIcon>
            </div >
            
            <div className="col-2 text-right" style={{textAlign : "center"}}>
            {item.qty}x 
            {/* {item.qty}x ${item.price.toFixed(2)} */}
            </div>
           
        </div>
    ))}
     <div>
    <h3>Total Price= {TotalPrice}</h3>
    </div>

    <div>
    <button type="button" class="btn btn-outline-success" onClick={onCheckout}>Place Order</button>
    </div>


   
</div>    

)


}



export default Cart