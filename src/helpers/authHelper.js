    import axios from 'axios';


    export const refreshAccessToken = async () => {
        const serveurURL = process.env.REACT_APP_SERVER_URL;

        try {
        const response = await axios.post(serveurURL+'/user/refreshToken', {}, {
            withCredentials: true
        });
    
        if (response.status === 200) {
            console.log(response);
            
            const token  = response.data.accessToken;

            console.log('Nouveau access token reçu:', token);
            return token; 
        }
        } catch (error) {
        console.error('Erreur lors du rafraîchissement du token:', error);
        throw error; 
        }
    };