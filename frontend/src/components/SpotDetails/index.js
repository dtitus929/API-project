import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getOneSpot } from '../../store/spots';

export default function SpotDetails() {

    const { spotId } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOneSpot(spotId));
    }, [dispatch, spotId]);

    const spot = useSelector((state) => state.spots.singleSpot);
    console.log("The spot is:", spot);
    // const spotName = spot.name

    return (

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', padding: '30px 30px 80px 30px', maxWidth: '1000px', margin: '0px auto' }}>
            {spot?.map(({ id, name, city, state, country, Owner, description, avgStarRating, price, SpotImages, numReviews }) => (

                <div key={id}>
                    <h2 style={{ marginBottom: '8px' }}>{name}</h2>
                    <div style={{ marginBottom: '10px' }}>{city}, {state}, {country}</div>
                    <div className="detail-container">
                        <div className="detail-left">
                            <img src={SpotImages[0].url} alt={id} style={{ borderRadius: '14px', marginBottom: '8px' }} />
                        </div>

                        <div style={{ paddingLeft: '8px' }}><img src={SpotImages[1].url} alt={id} style={{ borderRadius: '14px', marginBottom: '8px' }} /></div>
                        <div style={{ paddingLeft: '8px' }}><img src={SpotImages[2].url} alt={id} style={{ borderRadius: '14px', marginBottom: '8px' }} /></div>
                        <div style={{ paddingLeft: '8px' }}><img src={SpotImages[3].url} alt={id} style={{ borderRadius: '14px', marginBottom: '8px' }} /></div>
                        <div style={{ paddingLeft: '8px' }}><img src={SpotImages[4].url} alt={id} style={{ borderRadius: '14px', marginBottom: '8px' }} /></div>


                    </div>

                    <div style={{ display: 'flex', gap: '20px', borderBottom: '1px solid #CCCCCC', paddingBottom: '20px', marginBottom: '30px' }}>
                        <div>
                            <h3>Hosted by {Owner.firstName} {Owner.lastName}</h3>
                            <p>{description}</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dictum venenatis nisi, sit amet eleifend diam cursus eget. Quisque congue,
                                tortor eu venenatis auctor, urna elit consequat augue, eget tempor urna ligula vulputate augue. Fusce velit dui, rutrum eu pulvinar nec,
                                porttitor at felis. Nam sit amet elit in enim gravida cursus. In hendrerit risus et ante consectetur pellentesque. Sed vulputate est nec
                                accumsan lacinia. Aliquam vulputate blandit felis quis maximus. Nulla tortor magna, ultrices id orci ac, laoreet pulvinar nibh. Praesent
                                venenatis sapien vitae ipsum euismod posuere. Suspendisse egestas laoreet massa, dictum mollis nisl viverra vitae. Nam porta sagittis
                                neque ac bibendum. Sed venenatis dignissim ipsum, in malesuada ex efficitur ut. Phasellus metus ante, ullamcorper at sodales quis,
                                hendrerit vel metus. Praesent interdum justo purus, id rhoncus ligula condimentum nec. Sed venenatis sed ante a suscipit. Sed ac feugiat urna.</p>
                        </div>
                        <div style={{ padding: '10px 0px 0px 20px' }}>

                            <div style={{ border: '1px solid #ab7dab', borderRadius: '15px', width: '300px', padding: '20px', display: 'flex', flexDirection: 'column', textAlign: 'center' }}>

                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                    <div style={{ fontWeight: '500', fontSize: '16px' }}>${price.toFixed(2)}&nbsp;<span style={{ fontWeight: '300' }}>night</span></div>
                                    <div style={{ fontWeight: '300' }}><i className="fa-solid fa-star" style={{ color: '#993399' }} />&nbsp;{avgStarRating === 'No reviews yet' ? 'New' : (Math.round(avgStarRating * 100) / 100).toFixed(1)} &nbsp;·&nbsp; {numReviews} {numReviews > 1 ? 'Reviews' : 'Review'} </div>
                                </div>

                                <button>RESERVE</button>

                            </div>
                        </div>
                    </div>

                    <h3>Reviews</h3>



                </div>

            ))}
        </div>

    );

};
