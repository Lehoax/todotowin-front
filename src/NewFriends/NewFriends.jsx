import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css'


const NewFriend = () =>{
    const navigate = useNavigate(); 
    const [email, setEmail] = useState('');
    const serveurURL = process.env.REACT_APP_SERVER_URL;
    const userToken = localStorage.getItem('accessToken');
    const [error, setError] = useState(null);
    const [emailFind, setEmailFind] = useState('');




    const handleSubmit = async (e) => {
        e.preventDefault();        
        try {
            const response = await axios.post(serveurURL + '/user/findUser', 
                { email: email }, 
                {
                  headers: {
                    Authorization: `Bearer ${userToken}` 
                  },
                  withCredentials: true
                }
            );
    
            if (response.status === 200) {
                setEmailFind(response.data.user.email)
                setError(null);
            }
        } catch (err) {
            
            if (err.status = 404) {
                setError("Ce compte n\'existe pas")
            }
    
        }
    };
    
    return (
                <div>
              <form id="friend_form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Rechercher un utilisateur"
                />
                {error && (
                  <div
                    style={{
                      color: 'red',
                      position: 'absolute',
                      zIndex: 1,
                      width: '100%',
                      textAlign: 'center',
                    }}
                  >
                    {error}
                  </div>
                )}
                <button id="friend_btn" type="submit">
                  Rechercher
                </button>
              </form>
            </div>
          );
          
}


export default NewFriend;