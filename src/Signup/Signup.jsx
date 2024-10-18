import React, { useState } from 'react';
import axios from 'axios';



const Signup = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Repetepassword, setRepetepassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!email || !password) {
        setError('Veuillez entrer un email et un mot de passe.');
        return;
    }
    if (Repetepassword !== password) {
        setError('Les mots de passes ne correspondent pas.');
        return;
    }
    try {
        // Envoi de la requête POST à l'API avec axios
        const response = await axios.post('http://localhost:3001/api/user/signup', {
          email,
          password,
        });
  
        // Vérification de la réponse
        if (response.status === 200) {
          setSuccess('Inscription réussie!');
          setError('');
        }
      } catch (err) {
        if (err.response) {  
            console.log(err);
                      
          setError('Cette uttilisateur existe déja.');
        } else if (err.request) {
            console.log(err);

          setError('Erreur réseau ou serveur.');
        } else {
          setError('Erreur inconnue.');
        }
        setSuccess('');
      }}
    return (
      <>
    <div id="Signup" >
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
          <input
          placeholder='Repéter le mot de passe'
            type="password"
            value={Repetepassword}
            onChange={(e) => setRepetepassword(e.target.value)} // Mise à jour de l'état pour le mot de passe
            required
          />
        </div>
        <div>
          <button type="submit" className='button end_button'>S'inscrire</button>
        </div>
      </form>
    </div>
      </>
    )
  }
  export default Signup