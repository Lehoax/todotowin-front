import React, { useState } from 'react';



const Signup = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Repetepassword, setRepetepassword] = useState('');
    const [error, setError] = useState('');

const handleSubmit = (e) => {
    e.preventDefault(); 

    if (!email || !password) {
        setError('Veuillez entrer un email et un mot de passe.');
        return;
    }
    if (!Repetepassword || !password) {
        setError('Les mots de passes ne correspondent pas.');
        return;
    }
console.log(email);
}
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