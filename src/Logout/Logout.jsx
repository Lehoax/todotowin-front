import React from "react";
import logoutimg from '../img/logout.png'
import './style.css'
import { useAuth } from '../helpers/AuthContext';


const Logout = () =>{
    const { isConnected, setIsConnected } = useAuth();

    const OnClickLogout = () =>{
        localStorage.removeItem('accessToken'); 
        localStorage.removeItem('email');
        setIsConnected(false)
    }

    return(
    <button id="lougout_btn" onClick={OnClickLogout}>
        <img id="logout_logo" src={logoutimg} alt="Logout" />
    </button>
    )
}

export default Logout;
