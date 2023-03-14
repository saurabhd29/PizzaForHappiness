
import { useState, useEffect } from "react";
import "./HomePage.css"
import axios from "axios";
import Pizza from '../components/Pizza';
import Cart from "../components/Cart";

import { toast } from "react-toastify";
import { useNavigate } from 'react-router'
import Navbar from "../components/NavBar";
import Footer from "../components/Footer" ;
import "../components/cart.css"
import { URL } from "../../config";


const HomePage= ()=>{

    const cartFromLocalStorage= JSON.parse(localStorage.getItem("cartItems") || "[]" )
const[entireMenu, setEntireMenu]= useState([]);
const [cartItems, setCartItems]= useState(cartFromLocalStorage);

const navigate = useNavigate();





const onAdd= (bodyToCart) => {
    
    const exist= cartItems.find(x => x.variantId === bodyToCart.variantId);
    if(exist)
    {
        setCartItems(cartItems.map((x)=>
        x.variantId === bodyToCart.variantId ? {...exist, qty: exist.qty + 1} : x
        )
        )
    }
    else
    {
        setCartItems([...cartItems, {...bodyToCart, qty: 1}]);
    }


    console.log(cartItems);
    console.log(bodyToCart.name);

   
};


const onRemove= (bodyToCart) => {
    const exist= cartItems.find(x => x.variantId === bodyToCart.variantId);
    if(exist.qty === 1)
    {
        setCartItems(cartItems.filter((x)=>
        x.variantId !== bodyToCart.variantId ));
    }
    else
    {
        setCartItems(cartItems.map((x)=>
        x.variantId === bodyToCart.variantId ? {...exist, qty: exist.qty - 1} : x
        )
        )
    }
};







useEffect( ()=>{
axios.get(`${URL}/menu/gelAllMenu`).then((response)=>{
setEntireMenu(response.data.data); 
console.log("entireMenu"+response.data.data)

localStorage.setItem('cartItems', JSON.stringify(cartItems));
});
}, [cartItems]);


// useEffect(()=>{
    
// },[]); 

    



const logoutUser= ()=> {

sessionStorage.removeItem('userId');
sessionStorage.removeItem('firstName');
sessionStorage.removeItem('role');
toast.success("Logged out Successfully")
navigate("/")

}




return(
<div className="full">
    <Navbar logoutUser={logoutUser}  />
   

<div className="mainPageDiv">


        <div className="leftSideDiv">
                <div className="menuPage flex-container">
                    <div>

                    <div class="ref"><div class="menu-hr"></div><div class="cat-bar"><div class="menu-catname "><b>VEG PIZZA </b></div></div></div>
                    <div className="row">
                {entireMenu.map((item)=>{
                if(item.type==="Pizza" && item.category==='Veg' )
                {
                    return(
                    <div className="col-md-4" key={item.menuId}>
                            <div>
                                <Pizza onAdd={onAdd} item={item}/>                                 
                            </div>
                    </div>
                )
                // end of If

            }
            })}
                    </div>
                    


                <br></br>
                <br></br>
                <br></br>
                <br></br>


    <div class="ref"><div class="menu-hr"></div><div class="cat-bar"><div class="menu-catname "><b>NON VEG PIZZA</b></div></div></div>   
            <div className="row">
                {entireMenu.map((item)=>{
                if(item.type==="Pizza" && item.category==='Non-Veg')
                {
                    return(
                    <div className="col-md-4" key={item.menuId}>
                            <div>
                                <Pizza onAdd={onAdd} item={item}/>                                 
                            </div>
                    </div>
                )
            }
            })}
            </div>


            <br></br>
                <br></br>
                <br></br>
                <br></br>
                
                    

        <div class="ref"><div class="menu-hr"></div><div class="cat-bar"><div class="menu-catname "><b>DESSERT SECTION</b></div></div></div>   
            <div className="row">
                { entireMenu && entireMenu.map((item)=>{
                if(item.type==="Dessert")
                {
                    return(
                    <div className="col-md-4" key={item.menuId}>
                            <div>
                                <Pizza onAdd={onAdd} item={item}/>                                 
                            </div>
                    </div>
                )
            }
            })}
            </div>








                <br></br>
                <br></br>
                <br></br>
                <br></br>

        
        <div class="ref"><div class="menu-hr"></div><div class="cat-bar"><div class="menu-catname "><b>SIDES SECTION</b></div></div></div>   
            <div className="row">
                { entireMenu && entireMenu.map((item)=>{
                if(item.type==="Sides")
                {
                    return(
                    <div className="col-md-4" key={item.menuId}>
                            <div>
                                <div><h1>{item.name}</h1></div>
                                <Pizza onAdd={onAdd} item={item}/>                                 
                            </div>
                    </div>
                )
            }
            })}
            </div>


        <br></br>
                <br></br>
                <br></br>
                <br></br>


        <div class="ref"><div class="menu-hr"></div><div class="cat-bar"><div class="menu-catname "><b>BEVERAGES</b></div></div></div>   
            <div className="row">
                {entireMenu.map((item)=>{
                if(item.type==="Beverages")
                {
                    return(
                    <div className="col-md-4" key={item.menuId}>
                            <div>
                                <Pizza onAdd={onAdd} item={item}/>                                 
                            </div>
                    </div>
                )
            }
            })}
            </div>

           

 
      





                    </div>
                        {/* end of div after menu flec container-------------- */}        
                </div> 
              {/* end of menu flec container-------------- */}  


                


        </div>
        {/* leftside div */}    


            
            
            
            
            {/* right side cart div */}
            {/* <Scrollbars style={{ width: 50, height: 30 }}>    */}
            {/* <div className="rightSideDiv"> */}
        {/* <div className="scroll "> */}
        <div className="scroll">
        
            <Cart onAdd={onAdd} onRemove={onRemove} cartItems={cartItems} cartFromLocalStorage={cartFromLocalStorage} />
            
        </div>
        {/* </Scrollbars> */}
        {/* </div> */}
            {/* right side cart div */}
            
            

            
               

</div>
<br></br>
                <br></br>
                <br></br>
                <br></br>
 
 
<div className = "footer">
      <Footer/>
     </div>                    

</div>
// end of  div after return

      


); //End of Return
}; 

export default HomePage;