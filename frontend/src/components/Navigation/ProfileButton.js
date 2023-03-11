import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = (e) => {
        if (showMenu) return;
        setShowMenu(true);
        e.stopPropagation();
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <div className="profile-button-group">
            <button className="profile-button" onClick={openMenu}>
                <i className="fa-sharp fa-solid fa-bars"></i><i className="fas fa-user-circle" />
            </button>
            <div className={ulClassName} ref={ulRef}>
                <div>{user.username}</div>
                <div>{user.firstName} {user.lastName}</div>
                <div>{user.email}</div>
                <div>
                    <button onClick={logout}>Log Out</button>
                </div>
            </div>
        </div>
    );
}

export default ProfileButton;
