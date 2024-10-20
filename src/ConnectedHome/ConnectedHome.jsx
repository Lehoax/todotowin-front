import React, { useState } from 'react';
import axios from 'axios';
import { refreshAccessToken } from '../helpers/authHelper'; // Import du helper

const ProtectedData = () => {
  const [accessToken, setAccessToken] = useState(null); // Token initialement null
  const [protectedData, setProtectedData] = useState(null);
  const [error, setError] = useState(null);

  // Fonction pour récupérer les données protégées
  const fetchProtectedData = async () => {
    try {
      // Requête initiale avec l'Access Token
      const response = await axios.get('http://localhost:3001/api/user/protected', {
        headers: {
          Authorization: `Bearer ${accessToken}` // Inclure le token dans les headers
        }
      });

      console.log('Données protégées récupérées:', response.data);
      setProtectedData(response.data);
      setError(null); 

    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('Access token expiré, tentative de rafraîchissement...');

        try {
          const newAccessToken = await refreshAccessToken();
          setAccessToken(newAccessToken); 

          const retryResponse = await axios.get('http://localhost:3001/api/user/protected', {
            headers: {
              Authorization: `Bearer ${newAccessToken}` 
            }
          });

          console.log('Données protégées après rafraîchissement:', retryResponse.data);
          setProtectedData(retryResponse.data);
          setError(null); 

        } catch (refreshError) {
          console.error('Échec du rafraîchissement du token:', refreshError);
          setError('Impossible de rafraîchir le token. Veuillez vous reconnecter.');
        }

      } else {
        console.error('Erreur lors de la récupération des données protégées:', error);
        setError('Une erreur est survenue lors de la récupération des données.');
      }
    }
  };

  return (
    <div>
      <button onClick={fetchProtectedData}>
        Récupérer les données protégées
      </button>

      {protectedData && <div>Data: {JSON.stringify(protectedData)}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default ProtectedData;