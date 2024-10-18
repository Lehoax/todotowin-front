import { useNavigate } from 'react-router-dom';
import './style.css'

const Home = () =>{
    const navigate = useNavigate();

    const handleClickLogin = () => {
        navigate('/login');
    };
    const handleClickSignup = () => {
        navigate('/signup');
    };
    return (
      <>
    <div id="home">
        <button className="button" onClick={handleClickLogin}>Connection</button>
        <button className="button" onClick={handleClickSignup}>Inscription</button>
    </div>
      </>
    )
  }
  export default Home