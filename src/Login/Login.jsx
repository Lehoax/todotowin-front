import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../helpers/AuthContext';
import { Navigate } from 'react-router-dom';
import ForgotPassword from '../ForgotPassword/ForgotPassword';


const Login = () => {
  const { setIsConnected } = useAuth();
  const [redirect, setRedirect] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Veuillez entrer un email et un mot de passe.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/api/user/login', {
        email,
        password,
      }, {
        withCredentials: true
      });

      if (response.status === 200) {
        const token = response.data.token; 
        localStorage.setItem('accessToken', token); 
        setSuccess('Connexion réussie!'); 
        localStorage.setItem('email', email);
        setIsConnected(true);
        setError(''); 
        setRedirect(true); 
      }
    } catch (err) {
      console.log(err);
      
      if (err.response) {
        setError('Email ou mot de passe incorrect.');
      } else if (err.request) {
        setError('Erreur réseau ou serveur.');
      } else {
        setError('Erreur inconnue.');
      }
      setSuccess(''); 
    }
  }
  if (redirect) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <div id="login">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>} 
        <form onSubmit={handleSubmit}>
          <div>
            <input
              placeholder='Email'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>
          <div>
            <input
              placeholder='Mot de passe'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>
          <div>
            <button type="submit" className='button end_button'>Se connecter</button>
          </div>
        </form>
        <ForgotPassword/>

      </div>
    </>
  )
}

export default Login;
