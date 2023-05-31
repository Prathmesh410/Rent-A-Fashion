import React,{useState,useEffect} from "react";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import ImageHelper from "./helper/ImageHelper";


const Card = ({ product ,addtoCart = true,
  removeFromCart = false,setReload =f => f
  ,reload=undefined}) => {

    const [redirect, setRedirect] = useState(false);




    const cardTitle = product ? product.name :"A photo from Pixles"
    const cardDescription = product ? product.description :"Default "
    const cardPrice = product ? product.rent :"NA"
    const cardDeposit = product ? product.deposite : "NA"
    const cardavailableDuration = product? product.availableDuration : "3 days"


    const addToCart =( ) =>{
      addItemToCart(product,() => setRedirect(true))
    }

    const getARedirect =(redirect) =>{
      if(redirect){
        return <Redirect to="/cart/" />
      }
    }

    const showAddToCart = (addtoCart) =>
    {
      return (
        addtoCart &&
        <button
        onClick={addToCart}
        className="btn btn-block btn-outline mt-2 mb-2 rounded"
        style={{backgroundColor:"#B23B00",color:"#FFF9F5",fontSize:"17px" }}
      >
        Add a request
      </button>
      )
    }
    const showRemoveFromCart = (removeFromCart) =>
    {
      return(
        removeFromCart &&
        <button
              onClick={() => {removeItemFromCart(product._id);
                setReload(!reload);
              }}
              className="btn btn-block  mt-2 mb-2 rounded"
              style={{backgroundColor:"#B23B00",color:"#FFF9F5" }}
            >
              Remove request
            </button>
      )
    }

  
  return (
    <div className="card text-white border-solid"  >
      <div className="card-body" style={{backgroundColor:"#FFFFFF"}}>
        {getARedirect(redirect)}
        <ImageHelper product={product} />

        <p className="lead text-wrap " style={{color:"#212832" ,fontSize:"21px",fontWeight:"bold", marginBottom:"0px",alignContent:"start"}} >{cardTitle}</p>
        <p className="lead  text-wrap " style={{color:"#212832" ,fontSize:"17px",marginBottom:"0px"}} >{cardDescription}</p>
        <p className="lead  text-wrap " style={{color:"#212832" ,fontSize:"17px"}} >Available for: {cardavailableDuration}</p>
      
        <p className="btn  rounded  btn-sm px-4" style={{border:"1px  solid #B23B00" , color:"#212832" ,fontWeight:"normal" ,marginRight:"20px"}}>Rent :{cardPrice}</p>
        <p className="btn  rounded  btn-sm px-4" style={{border:"1px  solid #B23B00" , color:"#212832" ,fontWeight:"normal"}}>Deposite :{cardDeposit}</p>
        <div className="row">
          <div className="col-12">
           {showAddToCart(addtoCart)}
          </div>
          <div className="col-12">
            {showRemoveFromCart(removeFromCart)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
