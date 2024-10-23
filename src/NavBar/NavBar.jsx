import React, { useState } from "react";
import './style.css';
import add from '../img/add.png';
import back from '../img/left-arrow.png';
import friends from '../img/friends.png';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate(); 
    const [currentView, setCurrentView] = useState('mytask'); 

    const handleNavigation = (view) => {
        setCurrentView(view);
        navigate(`/${view}`);
    };

    const renderContent = () => (
        <>
            {currentView !== 'mytask' ? (
                <div className="nav_bar_back">
                    <button className="back_btn" onClick={() => handleNavigation('mytask')}>
                        <img src={back} alt="Retour" />
                    </button>
                </div>
            ) : (
                <div className="nav_bar">
                    <button className="logo_btn left" onClick={() => handleNavigation('newFriend')}>
                        <img src={friends} alt="Amis" />
                    </button>
                    <button className="logo_btn center" onClick={() => handleNavigation('newtask')}>
                        <img src={add} alt="Ajouter" />
                    </button>
                    <button className="logo_btn right" onClick={() => handleNavigation('newFriend')}>
                        <img src={friends} alt="Amis" />
                    </button>
                </div>
            )}
        </>
    );
    

    return <>{renderContent()}</>;
};

export default NavBar;
