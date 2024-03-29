
import React,{useState,useEffct, useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import Base from '../core/Base';
import { deleteProduct, getProducts } from './helper/adminapicall';




const ManageProducts = () => {
  const [products, setProducts] = useState([])

  const {user,token} = isAutheticated();

  const preload = () => {
    getProducts().then(data => {
      if (data.error){
        console.log(data.error);

      }
      else{
        setProducts(data)
      }
    })
  }

  useEffect(() => {
   preload()
  }, []);

  const deleteThisProduct = productId =>{
    deleteProduct(productId, user._id,token).then(data =>{
      if (data.error){
        console.log(data.error);

      }
      else{
        preload()
      }

    })
     
  }

  

  
    return (
        <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-warning" to={`/admin/dashboard`}>
        <span className=""> Go back</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Products</h2>

         {products && products.map((product,index)=>{
            return( <div key={index} className="row text-center mb-2 ">
             <div className="col-4">
               <h3 className="text-left" style={{color :  "rgb(33, 40, 50)"}}>{product.name}</h3>
             </div>
             <div className="col-4">
               <Link
                 className="btn btn-success"
                 to={`/admin/product/update/${product._id}`}
               >
                 <span className="">Update</span>
               </Link>
             </div>
             <div className="col-4">
               <button onClick={()=>{
                 deleteThisProduct(product._id)
               }} className="btn btn-danger">
                 Delete
               </button>
             </div>
             </div>);
         })}
          
        </div>
      </div>
    </Base>
    )
}

export default ManageProducts;
