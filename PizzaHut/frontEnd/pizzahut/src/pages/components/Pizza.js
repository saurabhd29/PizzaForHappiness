import axios from "axios";
import react, { useEffect, useState } from "react";
import "./pizza.css" 
import { URL } from "../../config";


const Pizza= ({item, onAdd})=>{

const [variants, setVariants]= useState(item.size[0].variants);


const [selectedVariantId, setSelectedVariantId]= useState(item.size[0].variants[0].variantId)

const [selectedSize, setSelectedSize]= useState(item.size[0].size)

const [selectedVariantData, SetSelectedVariantData]= useState(item.size[0].variants[0]);


const bodyToCart={
variantId: selectedVariantId,
name: item.name,
selectedSize,
variant: selectedVariantData.variant,
price: selectedVariantData.price,
imageAddress:item.imageAddress,
}




const SelectVariant= (varId)=>{
    console.log("Variant called");
    setSelectedVariantId(varId);
    const url= `${URL}/variants/getVariantById/${varId}`
axios.get(url).then((response)=>{   
SetSelectedVariantData(response.data.data)
})


}



const selectSizes= (e)=>{

var id= e.target.value;
console.log(id);
const url= `${URL}/variants/getById/${id}`
axios.get(url).then((response)=>{
setVariants(response.data.data);
setSelectedVariantId(response.data.data[0].variantId);

console.log("Called : "+response.data.data[0].variantId);
SelectVariant(response.data.data[0].variantId)
})


axios.get(`${URL}/sizes/getSizeById/${id}`).then((response)=>{
setSelectedSize(response.data.data.size);
console.log(response.data.data.size);
})

}



    return (
        <div className="pizzaContainer" >
                {/* <h1>{selectedSize}</h1>
                <h1>{selectedVariantId}</h1>
                <h1>{selectedVariantData.variant}</h1> */}
                
                {/* <h5 style={{textAlign : "center", textTransform:"uppercase"   }}>{item.name}</h5> */}
                <img src={item.imageAddress} className="img-fluid" style={{borderRadius:"5px",height:'200px', width:'100%', alignItems: "center"}}/>
                <div className=".itm-dsc__nm "><b>{item.name}</b></div>
                <div className=".itm-dsc__dscrptn">{item.description}</div>
                
                {/* --------------------------------------------------------- */}
                {/* <div className="flex-container optionFlex"> */}
                <div className="optionFlex">

                {/* <div className="w-100" > */}
                <div className="leftSideSelect">
                    {/* <p>Size</p> */}
                    <select class="form-select" aria-label="Default select example" onChange={selectSizes}  >
                    { item.size.map((s)=>{
                        return(
                            <option value={s.sizeId} >{s.size}</option>
                           
                        )
                    })}
                </select>
                </div>

                {/* <div  className="w-100"> */}
                <div >
                {/* <p>Variants</p> */}
                <select class="form-select" aria-label="Default select example"  onClick={(e)=>{SelectVariant(e.target.value)}}>
                    {variants && variants.map((s)=>{
                        return(
                            
                            
                            
                            <option value={s.variantId} >{s.variant} ₹{s.price}</option>
                            
                           
                        )
                    })}
                    </select>


                    {/* <select class="form-select" aria-label="Default select example">
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select> */}

                </div>
                
                </div>  
                {/* End Of firsr Flex Container */}
                {/* --------------------------------------------------------- */}
                
                <div className="flex-container">
                     <div className="w-100">
                   
                    
                     <div className="w-100">

                         
                     <button  onClick={() => onAdd(bodyToCart)} className="button-33">Add To Cart</button>
                     </div>
                     </div>   

                </div> 
                        {/* End Of second Flex Container */}

        </div>



    )


}


export default Pizza