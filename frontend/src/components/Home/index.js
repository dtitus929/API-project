
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

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
            {spots?.map(({ id, name, address, city, state }) => (
                <div key={id} style={{ border: '1px solid #CCCCCC', width: '300px', padding: '10px' }}>
                    <h3>{name}</h3>
                    <div>{address}</div>
                    <div>{city}, {state}</div>
                </div>
            ))}
        </div>

    );

};
