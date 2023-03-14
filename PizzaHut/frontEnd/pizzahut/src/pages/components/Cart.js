import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { toast } from "react-toastify";
import "./cart.css";
import { Scrollbars } from 'react-custom-scrollbars';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { URL } from "../../config";

const Cart = ({ cartItems, onAdd, onRemove, cartFromLocalStorage }) => {
    const TotalPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    const { userId, firstName, role } = sessionStorage

    const [orderDetails, setOrderArray] = useState([]);
    const navigate = useNavigate();


    const onCheckout = () => {

        if (userId == undefined) {
            toast.warning("Login first")
            navigate("/Login")
        }
        else {

            {
                cartItems.map((item) => {
                    setOrderArray([])


                    const order =
                    {
                        name: item.name,
                        size: item.selectedSize,
                        variant: item.variant,
                        quantity: item.qty,
                        price: item.price,
                        variantId: item.variantId,
                        totalAmount: item.qty * item.price,
                    }
                    orderDetails.push(order);
                })
            }

            console.log(orderDetails);

            const order =
            {
                userId: sessionStorage['userId'],
                totalAmount: TotalPrice,
                orderStatus: "placed",
                paymentStatus: "online",

                orderDetails,
            }

            // console.log("order====");
            // console.log(order);

            if (order.totalAmount == 0) {
                toast.warning("select at least one item")
            }
            else {
                toast.info('please wait---- Working on Order', {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                const url1 = `${URL}/orders/placeOrder`;
                axios.post(url1, order).then((response) => {

                    const result = response.data
                    console.log(result)
                    if (result['status'] == 'success') {
                        toast.success('order placed successfully')

                        //   console.log(orderDetails)
                        //   console.log('cartItems Before []===');
                        //   console.log(cartItems);
                        //   console.log('-----------------------------------------------------------------------');
                        cartItems = [];

                        //   console.log('cartItems After []===');
                        //   console.log(cartItems);
                        localStorage.removeItem("cartItems");
                        navigate("/userorder")

                    }
                    else {
                        toast.error(result['error'])
                    }


                })


            }


        }



    }


    return (


        <div className="cartDivision border border-primary bg-light p-4">

            {/* <h1>Inside Cart</h1> */}
            <div  >
                {cartItems.length === 0 && <div>Cart is Empty</div>}
            </div>

            {cartItems.map((item) => (
                <div key={item.variantId} className="row bg-new">
                    <div className="col-12">
                        <b>{item.name}</b> <b>({item.selectedSize.charAt(0).toUpperCase()})</b>
                        <span className="f-right">
                            <b>{item.qty}x</b>  &nbsp;
                            <AddCircleIcon onClick={() => onAdd(item)}></AddCircleIcon>
                            <RemoveCircleIcon onClick={() => onRemove(item)}></RemoveCircleIcon>
                        </span>
                    </div>

                    <div className="col-12" ><small>({item.variant})</small>
                        <span className="f-right">
                                <b>Price: {item.price * item.qty}</b>
                        </span>
                    </div>

                </div>
            ))}




            <div className="row">
                <div className="col-xl-8">   <h4 className="text-primary">Total Price= {TotalPrice}</h4></div>
                <div className="col-xl-4">   <button type="button" class="btn btn-success btn-sm" onClick={onCheckout}>Place Order</button></div>

            </div>


        </div>

    )


}



export default Cart