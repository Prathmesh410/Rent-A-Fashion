import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My desription",
  className = " p-4",
  children
}) => (
  <div>
    <Menu />
    <div className="container-fluid min-vh-100 mh-100 "  style={{background: '#ffffff'}} >
      <div className="jumbotron text-center" style={{color : "#212832"}}>
        <h2 className="display-4">{title}</h2>
        <p style={{fontSize:'27px'}}>{description}</p>
      </div>
      <div className={className}>{children} </div>
    </div>
  </div>
);

export default Base;