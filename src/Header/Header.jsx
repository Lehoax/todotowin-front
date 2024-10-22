import React,{ useEffect, useState } from 'react';
import logo from '../img/logo.png'
import './style.css'
import Logout from '../Logout/Logout';
import { useAuth } from '../helpers/AuthContext';
import { useNavigate } from 'react-router-dom';
import back from '../img/left-arrow.png'
import profile from '../img/user.png'
import { useXP } from '../helpers/XpContext';
import axios from 'axios';




const Header = () =>{
  const { isConnected, setIsConnected } = useAuth();
  const [ seeProfile, setSeeProfile ] = useState(false);
  const { xp, setXP } = useXP();
  const [error, setError] = useState(null);
  const [lvl, setLvl] = useState(null);



  const navigate = useNavigate(); 

  
  const fetchData = async () => {
    try {
      const userToken = localStorage.getItem('accessToken');
      const userEmail = localStorage.getItem('email');

      if (!userToken || !userEmail) {
        setError('Veuillez vous reconnecter');
        return; 
      }

      const response = await axios.post('http://localhost:3001/api/user/profile', 
        { email: userEmail }, 
        {
          headers: {
            Authorization: `Bearer ${userToken}` 
          },
          withCredentials: true
        }
      );

      if (response.status === 200) {
        setError(null);        
        return setXP(response.data.user.xp)
      }
    } catch (err) {
      if (err.response) {
        setError('Veuillez vous reconnecter');
      } else if (err.request) {
        setError('Erreur réseau ou serveur.');
      } else {
        setError('Erreur inconnue.');
      }
    }
  };
  const calculateLevel = (xp) => {    
    const xpBase = 40; 
    return Math.floor(Math.sqrt(xp / xpBase)) + 1;
  };
  useEffect(() => {    
    if (isConnected) {
      fetchData();
      if(xp !=null){
      const lvl = calculateLevel(xp)
      setLvl(lvl)
      }
    }
  }, [isConnected, xp]);


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
      {isConnected ?
      <p id="xp"style={{ position: 'absolute', zIndex: 1 }}>{lvl}</p>
      :<p id="xp"style={{ position: 'absolute', zIndex: 1 }}></p>
      }

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