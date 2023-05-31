import React from 'react'
import Base from  "../core/Base"
import Card from "../core/Card"


const  UserDashBoard = () => {
    return (
        <Base title ="UserDashBoard" description=''>
            <div className='row text-center rounded' style={{backgroundColor:"#fffaf4" , color:"#212832"}}>
                    <p className='lead display-6'>Account</p>
                    <div style={{display:"flex" , marginBottom:"15px"}}>
                        <p style={{fontWeight:"bold" , fontSize:"19px",marginRight:"15px" ,marginBottom:"0px"}}>Name :</p>
                        <p style={{fontWeight:"bold" , fontSize:"17px",marginBottom:"0px"}}>Prathmesh sonawane</p>
                    </div>
                    <div style={{display:"flex" , marginBottom:"15px"}}>
                        <p style={{fontWeight:"bold" , fontSize:"19px",marginRight:"15px" ,marginBottom:"0px"}}>email :</p>
                        <p style={{fontWeight:"bold" , fontSize:"17px",marginBottom:"0px"}}>prathmeshsonawane09528@gmail.com</p>
                    </div>
                    <div style={{display:"flex" , marginBottom:"15px"}}>
                        <p style={{fontWeight:"bold" , fontSize:"19px",marginRight:"15px" ,marginBottom:"0px"}}>City :</p>
                        <p style={{fontWeight:"bold" , fontSize:"17px",marginBottom:"0px"}}>Pune</p>
                    </div>
                    <div style={{display:"flex" , marginBottom:"15px"}}>
                        <p style={{fontWeight:"bold" , fontSize:"19px",marginRight:"15px" ,marginBottom:"0px"}}>State :</p>
                        <p style={{fontWeight:"bold" , fontSize:"17px",marginBottom:"0px"}}>Maharashtra</p>
                    </div>
            </div>

        </Base>
    )
}

export default UserDashBoard;