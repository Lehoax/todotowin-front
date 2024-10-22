import axios from 'axios';
import { refreshAccessToken } from './authHelper';

export const fetchProtectedData = async (accessToken, setAccessToken, setProtectedData, setError, setIsConnected) => {
  if (!accessToken) return; // Ne rien faire si le token n'est pas présent

  try {
    const email = localStorage.getItem('email');
    const response = await axios.post(
      'http://localhost:3001/api/user/profile',
      { email: email }, // Envoyer l'email dans le corps de la requête
      {
        headers: {
          Authorization: `Bearer ${accessToken}` // Corriger la syntaxe ici
        },
        withCredentials: true
      }
    );

    console.log('Données protégées récupérées:', response.data);
    setProtectedData(response.data);
    setError(null);

  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log('Access token expiré, tentative de rafraîchissement...');

      try {
        const newAccessToken = await refreshAccessToken();
        setAccessToken(newAccessToken);
        localStorage.setItem('accessToken', newAccessToken); // Met à jour le local storage
        
        // Retenter la requête avec le nouveau Access Token
        const retryResponse = await axios.post(
          'http://localhost:3001/api/user/profile',
          { email: localStorage.getItem('email') }, // Réutiliser l'email
          {
            headers: {
              Authorization: `Bearer ${newAccessToken}` // Corriger la syntaxe ici aussi
            },
            withCredentials: true
          }
        );

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
