
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Card/card'

import { getSpots } from '../../store/spots';


export default function Home() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch]);

    const spots = useSelector((state) => state.spots.allSpots);
    // console.log("The spots are:", spots);

    const arrSpots = Object.values(spots);
    // console.log("The arrSpots is:", arrSpots);

    return (

        <div className="spot-holder">
            <div className='spot-card-holder'>
                <Card arrSpots={arrSpots} showUpdateDelete={false} />
            </div>
        </div>
    );

};
