import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { refreshAccessToken } from '../helpers/authHelper'; // Import du helper
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../helpers/AuthContext'; // Importez le hook
import './style.css';

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

  const fetchProtectedData = async () => {
    if (!accessToken) return; // Ne rien faire si le token n'est pas présent
    try {
      const email = localStorage.getItem('email');
      const response = await axios.get('http://localhost:3001/api/user/profile', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        body:{
          email: email
        },
        withCredentials: true
      });

      console.log('Données protégées récupérées:', response.data);
      setProtectedData(response.data); 
      setError(null);
      
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('Access token expiré, tentative de rafraîchissement...');

        try {
          const email = localStorage.getItem('email');
          const newAccessToken = await refreshAccessToken();
          setAccessToken(newAccessToken);
          localStorage.setItem('accessToken', newAccessToken); // Met à jour le local storage
          
          // Retenter la requête avec le nouveau Access Token
          const retryResponse = await axios.get('http://localhost:3001/api/user/profile', {
            headers: {
              Authorization: `Bearer ${accessToken}`
            },
            body:{
              email: email
            },
            withCredentials: true
          });

          console.log('Données protégées après rafraîchissement:', retryResponse.data);
          setProtectedData(retryResponse.data);
          setError(null);
        } catch (refreshError) {
          console.error('Échec du rafraîchissement du token:', refreshError);
          setError('Impossible de rafraîchir le token. Veuillez vous reconnecter.');
          setIsConnected(false); 
        }
      } else {
        console.error('Erreur lors de la récupération des données protégées:', error);
        setError('Une erreur est survenue lors de la récupération des données.');
        setIsConnected(false); 
      }
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchProtectedData();
    }
  }, [accessToken]);

  const renderContent = () => {
    if (isConnected) {
      return (
        <>
          <h1>Bienvenue, utilisateur !</h1>
          {protectedData ? (
            <div>Données protégées: {JSON.stringify(protectedData)}</div>
          ) : (
            <p>Chargement des données protégées...</p>
          )}
        </>
      );
    } else {
      return (
        <>
          <button className="button" onClick={handleClickLogin}>Connection</button>
          <button className="button" onClick={handleClickSignup}>Inscription</button>
        </>
      );
    }
  };

  return (
    <div id="home">
      {renderContent()} 
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default Home;
