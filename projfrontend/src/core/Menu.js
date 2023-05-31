
import React,{Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout,isAutheticated } from '../auth/helper';


const currentTab = (history,path) =>{
    if(history.location.pathname === path){
        return{color :"#B23B00" }  
    }
    else{
        return {color :"#ffffff"}
    }
}
const Menu = ({history})=> (
    <div style={{backgroundColor:"#000000" }}>
        <ul className="nav nav-tabs" >
        <li className="nav-item">
            <Link style={currentTab(history,"/")} className="nav-link lead" to="/">
                Home
            </Link>
        </li>
        <li className="nav-item">
            <Link style={currentTab(history,"/cart")} className="nav-link lead" to="/cart">
                Cart
            </Link>
        </li>
       {isAutheticated()  && (
            <li className="nav-item">
            <Link style={currentTab(history,"/user/dashboard")} className="nav-link lead" to="/user/dashboard">
                User
            </Link>
        </li>
       )}
       
        {isAutheticated() && isAutheticated().user.role === 'admin' && (
            <li className="nav-item">
            <Link  style={currentTab(history,"/admin/dashboard")} className="nav-link lead" to="/admin/dashboard">
                Add Products
            </Link>
        </li>
        )}
        
      {
          !isAutheticated() && (
            <Fragment>
            <li className="nav-item">
                <Link style={currentTab(history,"/signup")} className="nav-link lead" to="/signup">
                    signup
                </Link>
            </li>
            <li className="nav-item">
                <Link style={currentTab(history,"/signin")} className="nav-link lead" to="/signin">
                    signin
                </Link>
            </li>
            </Fragment>
          )
      }
           {isAutheticated() && (
               <li className="nav-item">
                   <span 
                   className="nav-link lead "
                   style={{color : "#B23B00", fontWeight:"bold"}}
                   onClick={()=>{
                       signout(()=>{
                           history.push("/");
                       })
                   }}>
                       Signout
                   </span>
               </li>
           )} 
        
        </ul>
    </div>
)

export default withRouter(Menu);