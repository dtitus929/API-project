import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Card/card'
import { Link, Redirect } from "react-router-dom";

import { getSpots } from '../../store/spots';

export default function ManageSpots(props) {

    const { setShow, setCurrentModal, setCurrentSpot } = props;

    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);


    const spots = useSelector((state) => state.spots.allSpots);
    // console.log("The spots are:", spots);

    const arrSpots = Object.values(spots).filter(item => item.ownerId === sessionUser.id);
    // console.log("The arrSpots is:", arrSpots);

    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch]);

    if (!sessionUser) return (
        <Redirect to="/" />
    );

    return (

        <>

            <div className='page-title-holder'>
                <div className='page-title' style={{ paddingBottom: '5px' }}>Manage Your Spots</div>
                <Link to='/spots/new'><button className="dark-button">Create a New Spot</button></Link>
            </div>

            {arrSpots.length === 0 && (<div className="issue-box">Post your vacation castle or cottage rental by clicking "Create a New Spot" above.</div>)}

            <div className="spot-holder">
                <div className='spot-card-holder' style={{ paddingTop: '0px' }}>
                    <Card setShow={setShow} setCurrentModal={setCurrentModal} setCurrentSpot={setCurrentSpot} arrSpots={arrSpots} showUpdateDelete={true} />
                </div>
            </div>

        </>

    );

};
