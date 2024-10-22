import React,{ useState } from 'react';
import logo from '../img/logo.png'
import './style.css'
import Logout from '../Logout/Logout';
import { useAuth } from '../helpers/AuthContext';
import { useNavigate } from 'react-router-dom';
import back from '../img/left-arrow.png'
import profile from '../img/user.png'



const Header = () =>{
  
  const { isConnected, setIsConnected } = useAuth();
  const [ seeProfile, setSeeProfile ] = useState(false);

  const navigate = useNavigate(); 

  const getProfile = () => {
    if (!seeProfile) {
        navigate('/profile');
        setSeeProfile(true);
    }else{
      navigate('/');
      setSeeProfile(false);
    }
    
  };

  return (
    <>

  <div id="header" style={{ position: 'relative' }}>
      <img id='img_head' style={{ position: 'absolute', zIndex: 0 }} src={logo} alt="logo to do to win" />
      <p id="xp"style={{ position: 'absolute', zIndex: 1 }}>12</p>
      <div id='logout_group'>
      {isConnected ?
      <>
          <Logout/>
          {seeProfile ?
          <img src={back} id='get_profile' onClick={getProfile} />
          :<img src={profile} id='get_profile' onClick={getProfile} />
        }
          </>
      : ''}
      </div>
  </div>
    </>
  )
}
export default Header