import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';


function Navigation({ isLoaded, setShowLogin, setShowSignup }) {

    const sessionUser = useSelector(state => state.session.user);

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
                <NavLink to="/login">Log In</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
                <button onClick={() => setShowLogin(true)}>Login</button>
                <button onClick={() => setShowSignup(true)}>Signup</button>
            </div>
        );
    }

    return (
        <div className='nav-div'>
            <NavLink exact to="/">Home</NavLink>
            {isLoaded && sessionLinks}
        </div>
    );
}

export default Navigation;
