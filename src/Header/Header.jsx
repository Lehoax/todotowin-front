import logo from './logo.png'
import './style.css'
import Logout from '../Logout/Logout';
import { useAuth } from '../helpers/AuthContext';


const Header = () =>{
  const { isConnected, setIsConnected } = useAuth();

  return (
    <>

  <div id="header" style={{ position: 'relative' }}>
      <img id='img_head' style={{ position: 'absolute', zIndex: 0 }} src={logo} alt="logo to do to win" />
      <p id="xp"style={{ position: 'absolute', zIndex: 1 }}>12</p>
      <div id='logout_group'>
      {isConnected ?
          <Logout/>
      : ''}
      </div>
  </div>
    </>
  )
}
export default Header