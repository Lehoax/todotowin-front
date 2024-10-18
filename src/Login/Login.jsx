import React, { useState } from 'react';

const Login = () =>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault(); 
  
    if (!email || !password) {
      setError('Veuillez entrer un email et un mot de passe.');
      return;
    }
    console.log(email);
    
  
  }
  return (
    <>
  <div id="login">
  {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input

            placeholder='Email'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Mise à jour de l'état pour l'email
            required
          />
        </div>
        <div>
          <input
          placeholder='Mot de passe'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Mise à jour de l'état pour le mot de passe
            required
          />
        </div>
        <div>
          <button type="submit" className='button end_button'>Se connecter</button>
        </div>
      </form>
    </div>
    </>
  )
}
export default Login