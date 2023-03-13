import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';


function ProfileButton({ user }) {

    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const [ownsSpots, setOwnsSpots] = useState(null);
    const ulRef = useRef();

    const history = useHistory();

    const spots = useSelector((state) => state.spots.allSpots);
    // console.log("From Profile:", spots);

    const arrSpots = Object.values(spots);

    if (arrSpots && ownsSpots === null) {
        arrSpots.forEach(element => {
            // console.log(user.id, element.ownerId);
            if (user.id === element.ownerId) {
                setOwnsSpots(true)
                return
            }
        })
    };

    // console.log(ownsSpots);


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
        history.push("/")
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <div className="profile-button-group">
            <Link to='/spots/new' style={{ paddingRight: '10px' }}>Create a New Spot</Link>
            <button className="profile-button" onClick={openMenu}>
                <i className="fa-sharp fa-solid fa-bars" style={{ transform: 'scale(1.4, 1)', fontSize: '14px', color: '#993399', paddingRight: '10px' }}></i><i className="fas fa-user-circle" style={{ fontSize: '30px', color: '#993399' }} />
            </button>
            <div className={ulClassName} ref={ulRef}>
                <div>Hello, {user.firstName}</div>
                <div>{user.email}</div>
                {ownsSpots && (
                    <div>Manage Spots</div>
                )}
                <div>
                    <button onClick={logout}>Log Out</button>
                </div>
            </div>
        </div>
    );
}

export default ProfileButton;
