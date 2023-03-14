import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from './aircnc-logo.svg';


function Navigation({ isLoaded, setShow, setCurrentModal }) {

    const sessionUser = useSelector(state => state.session.user);

    const handleModal = modal => {
        setCurrentModal(modal);
        setShow(true);
    }

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div>
                <ProfileButton user={sessionUser} />
            </div>
        );
    } else {
        sessionLinks = (
            <div>
                <button className='logsign-button' onClick={() => handleModal('login')}>Login</button>
                <button className='logsign-button' onClick={() => handleModal('signup')}>Signup</button>
            </div>
        );
    }

    return (
        <div className='nav-div-holder'>
            <div className='nav-div'>
                <NavLink exact to="/"><img src={logo} alt="logo" style={{ height: '38px' }} /></NavLink >
                {isLoaded && sessionLinks}
            </div >
        </div>
    );
}

export default Navigation;
