
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { getSpots } from '../../store/spots';


export default function Home() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch]);

    const spots = useSelector((state) => state.spots.allSpots);
    // console.log("The spots are:", spots);

    return (

        <div className='spot-card-holder'>

            {spots?.map(({ id, city, state, avgRating, price, previewImage }) => (
                <Link key={id} className='spot-card-link' to={`/spots/${id}`}>
                    <div className="spot-card" style={{ backgroundImage: '' }}>
                        <img src={previewImage} alt={id} style={{ borderRadius: '14px', marginBottom: '8px' }} />
                        <div style={{ fontWeight: '400', fontSize: '15px' }}>{city}, {state}<span style={{ float: 'right', fontWeight: '300' }}><i className="fa-solid fa-star" style={{ color: '#993399' }} />&nbsp;{avgRating === 'No reviews yet' ? 'New' : Number(avgRating).toFixed(1)}</span></div>
                        <div style={{ fontWeight: '400', paddingTop: '5px' }}>${Number(price).toFixed(2)}&nbsp;<span style={{ fontWeight: '300' }}>night</span></div>
                    </div>
                </Link>
            ))}
        </div>

    );

};
