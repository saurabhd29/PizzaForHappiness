import React from 'react'
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import Navbar from "../components/NavBar";
import { URL } from "../../config";
import { Link } from "react-router-dom";

// export default function TotalSales() {
const TotalSales = () => {
    const { userId, firstName, role } = sessionStorage;
    const [totalAmount, setTotalAmount] = useState('');

    sessionStorage['totalAmount'] = totalAmount


    useEffect(() => {

        if (userId != undefined && (role == 'Manager' || role == 'admin')) {
            fetch(`${URL}/orders/getTotalAmount`)
                .then(res=>res.json())
                .then(valueFromAPI=>{
                console.log('API DATA CALLED');
                console.log(valueFromAPI);
                
                setTotalAmount(valueFromAPI)
                console.log(totalAmount);
                })
           
        }
        else {
            toast.warning("Login as Manager first")
            //navigate("/Login")
        }
    }, []);
  return (
    <div>
        <h3 style={{textAlign:'right'}}>Total Sales Rs. <b style={{color:'blue'}}>
            <Link to="/Orders">{totalAmount}</Link>   &nbsp;&nbsp;</b></h3>
    </div>
  )
}

export default TotalSales
