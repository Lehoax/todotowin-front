import logo from './logo.png'
import './style.css'

const Header = () =>{
  return (
    <>
  <div id="header" style={{ position: 'relative' }}>
      <img style={{ position: 'absolute', zIndex: 1 }} src={logo} alt="logo to do to win" />
      <p style={{ position: 'absolute', zIndex: 2 }}>12</p>
  </div>
    </>
  )
}
export default Header