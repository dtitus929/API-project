import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Card/card'
import { Link } from "react-router-dom";

import { getSpots } from '../../store/spots';

export default function ManageSpots() {

    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch]);

    const spots = useSelector((state) => state.spots.allSpots);
    // console.log("The spots are:", spots);

    const arrSpots = Object.values(spots).filter(item => item.ownerId === sessionUser.id);
    console.log("The arrSpots is:", arrSpots);

    return (

        <>
            <div className='page-title-holder'>
                <div className='page-title' style={{ paddingBottom: '5px' }}>Manage Your Spots</div>
                <Link to='/spots/new'><button className="dark-button">Create a New Spot</button></Link>
            </div>

            <div className="spot-holder">
                <div className='spot-card-holder' style={{ paddingTop: '0px' }}>
                    <Card arrSpots={arrSpots} showUpdateDelete={true} />
                </div>
            </div>

        </>

    );

};
