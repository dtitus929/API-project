import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';


function Navigation({ isLoaded, setShow }) {
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
                <button onClick={() => setShow(true)}>Login</button>
            </div>
        );
    }

    return (
        <div className='nav-ul'>
            <div>
                <NavLink exact to="/">Home</NavLink>
            </div>
            {isLoaded && sessionLinks}
        </div>
    );
}

export default Navigation;
