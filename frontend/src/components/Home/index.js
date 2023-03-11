
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getSpots } from '../../store/spots'


export default function Home() {

    const dispatch = useDispatch();

    const spots = useSelector((state) => state.spots.allSpots);
    console.log("The spots are:", spots);

    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch]);

    return (

        <div>
            {String(spots)}
        </div>

    );

};
