import Header from './Header/Header';
import {
  Routes,
  Route
} from "react-router-dom";
import Home from './Home/Home'
import Login from './Login/Login';
import Signup from './Signup/Signup';
import NewPassword from './ResetPassword/ResetPassword';
import ResetPassword from './ResetPassword/ResetPassword';

import './App.css';

function App() {
  return (
    <>

    <div className="App">
    
      <Header/>
      <Home/>
      <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/newpassword" element={<NewPassword/>} />
      <Route path="/resetPassword/:token" element={<ResetPassword />} />
      <Route path="/signup" element={<Signup/>} />
    </Routes>

    </div>  

    </>
  );
}

export default App;
