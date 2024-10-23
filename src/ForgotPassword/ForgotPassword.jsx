import React , {useState}from "react";
import axios from "axios";
import './style.css'

const ForgotPassword = () =>{
    const [forgot, setForgot] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');
    const serveurURL = process.env.REACT_APP_SERVER_URL;


    const OnClickForgot = () =>{
        setForgot(true)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!email) {
          setError('Veuillez entrer un email');
          return;
        }
        try {
          const response = await axios.post(serveurURL+'/user/forgotPassword', {
            email,
          }, {
            withCredentials: true
          });
    
          if (response.status === 200) {
            setSuccess('Email de réinitialisation envoyé '); 
            setForgot(false) 
          }
        } catch (err) {
          console.log(err);
          setError('Erreur veuillez réessayer plus tard'); 
        }
      }
    const renderContent = () => {
        if (forgot) {
          return (
            <>
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
          <button type="submit" className='button end_button'>Envoyer</button>
          </form>
            </>
          );
        } else {
          return (
            <>
              <a onClick={OnClickForgot} id="forgot_link">Mot de passe oublié</a>
            </>
          );
        }
      };
    return(
        <>
  
        {renderContent()}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {success && <div style={{ color: 'green' }}>{success}</div>}
        </>
    )
}

export default ForgotPassword;
