import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { getCategory,updateCategory } from "./helper/adminapicall";
// You have to create update category page whos like is given in update button in manage category






const UpdateCategory = ({match}) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAutheticated();
  
  const preload = CategoryId =>{
    getCategory(CategoryId).then(data => {
        if(data.error){
            setError(true);
        }
        else{
           setName(data.name) 
           
        }
    })
  }
useEffect(() => {
    preload(match.params.categoryId)
},[]);
console.log(match.params.categoryId)
console.log(user._id)

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
      Go back
      </Link>
    </div>
  );

  const handleChange = event => {
    setError(false);
    setName(event.target.value);
  };

  const onSubmit = (event, val) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
  
    //backend request fired
    updateCategory(match.params.categoryId, user._id, token, { name:val }).then(
      (data) => {
        if (data.error) {
          setError(true);
        } else {
          setError("");
          setSuccess(true);
          setName("");
        }
      }
    );
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category created successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-success">Failed to create category</h4>;
    }
  };

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the category</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange}
          value={name}
          autoFocus
          required
          placeholder={name}
        />
        <button onClick={(e)=> onSubmit(e, name)} className="btn btn-outline-info">
         Update Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Create a category here"
      description="Add a new category for new tshirts"
      className="container bg-warning p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;