import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../helpers/AuthContext';
import { fetchProtectedData } from '../helpers/GetdataHelper'; 
import './style.css';
import Displaytask from '../DisplayTask/DisplayTask';
import ListOfTasks from '../ListOfTasks/ListOfTasks';

const Home = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [protectedData, setProtectedData] = useState(null);
  const [error, setError] = useState(null);
  const { isConnected, setIsConnected } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        setAccessToken(token);
        setIsConnected(true);
    } else {
        setIsConnected(false);
    }
  }, [setIsConnected]);

  const handleClickLogin = () => {
    navigate('/login');
  };

  const handleClickSignup = () => {
    navigate('/signup');
  };

  useEffect(() => {
    if (accessToken) {
      fetchProtectedData(accessToken, setAccessToken, setProtectedData, setError, setIsConnected);
      console.log(protectedData);
      
    }
  }, [accessToken]);

  const renderContent = () => {
    if (isConnected) {
      return (
        <>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <ListOfTasks/>

        </>
      );
    } else {
      return (
        <>
        <div id='group_login_btn'>
          <button className="button" onClick={handleClickLogin}>Connection</button>
          <button className="button" onClick={handleClickSignup}>Inscription</button>
        </div>
        </>
      );
    }
  };

  return (
    <div id="home">
      {renderContent()} 
    </div>
  );
};

export default Home;
