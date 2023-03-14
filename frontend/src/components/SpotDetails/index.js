import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getOneSpot } from '../../store/spots';

export default function SpotDetails() {

    const { spotId } = useParams();

    const dispatch = useDispatch();

    const handleReserve = () => {
        alert('Feature coming soon')
    }

    useEffect(() => {
        dispatch(getOneSpot(spotId));
    }, [dispatch, spotId]);

    const spot = useSelector((state) => state.spots.singleSpot);
    // const ownerHolder = Object.entries(spot.Owner);
    // console.log('SpotOwnerIS:', spot.Owner && spot.Owner.firstName);
    // console.log("The spot is:", spot);

    let spotImagePreview = null;
    let arrImages = [];

    if (spot.SpotImages) {
        for (let i = 0; i < spot.SpotImages.length; i++) {
            if (spot.SpotImages[i].preview) {
                spotImagePreview = spot.SpotImages[i].url
            } else {
                arrImages.push(spot.SpotImages[i].url)
            }
        }
    }

    return (

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', padding: '30px 30px 80px 30px', maxWidth: '1000px', margin: '0px auto' }}>
            {/* {spot?.map(({ id, name, city, state, country, Owner, description, avgStarRating, price, SpotImages, numReviews }) => ( */}

            <div key={spot.id}>
                <h2 style={{ marginBottom: '8px' }}>{spot.name}</h2>
                <div style={{ marginBottom: '10px' }}>{spot.city}, {spot.state}, {spot.country}</div>
                <div className="detail-container">
                    <div className="detail-left" style={{ borderTopLeftRadius: '14px', borderBottomLeftRadius: '14px', width: '100%', height: '100%' }}>
                        <img src={spot.SpotImages && spotImagePreview} alt={spot.id} style={{ borderTopLeftRadius: '14px', borderBottomLeftRadius: '14px', width: '100%', height: '100%' }} />
                    </div>

                    <img src={spot.SpotImages && arrImages[0]} alt={spot.id} style={{ width: '100%', height: '100%' }} />
                    <img src={spot.SpotImages && arrImages[1]} alt={spot.id} style={{ borderTopRightRadius: '14px', width: '100%', height: '100%' }} />
                    <img src={spot.SpotImages && arrImages[2]} alt={spot.id} style={{ width: '100%', height: '100%' }} />
                    <img src={spot.SpotImages && arrImages[3]} alt={spot.id} style={{ borderBottomRightRadius: '14px', width: '100%', height: '100%' }} />


                </div>

                <div style={{ display: 'flex', gap: '20px', borderBottom: '1px solid #CCCCCC', paddingBottom: '20px', marginBottom: '30px' }}>
                    <div>
                        <h3>Hosted by {spot.Owner && spot.Owner.firstName} {spot.Owner && spot.Owner.lastName}</h3>
                        <p>{spot.description}</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dictum venenatis nisi, sit amet eleifend diam cursus eget. Quisque congue,
                            tortor eu venenatis auctor, urna elit consequat augue, eget tempor urna ligula vulputate augue. Fusce velit dui, rutrum eu pulvinar nec,
                            porttitor at felis. Nam sit amet elit in enim gravida cursus. In hendrerit risus et ante consectetur pellentesque. Sed vulputate est nec
                            accumsan lacinia. Aliquam vulputate blandit felis quis maximus. Nulla tortor magna, ultrices id orci ac, laoreet pulvinar nibh. Praesent
                            venenatis sapien vitae ipsum euismod posuere. Suspendisse egestas laoreet massa, dictum mollis nisl viverra vitae. Nam porta sagittis
                            neque ac bibendum. Sed venenatis dignissim ipsum, in malesuada ex efficitur ut. Phasellus metus ante, ullamcorper at sodales quis,
                            hendrerit vel metus. Praesent interdum justo purus, id rhoncus ligula condimentum nec. Sed venenatis sed ante a suscipit. Sed ac feugiat urna.</p>
                    </div>
                    <div style={{ padding: '20px 0px 0px 20px' }}>

                        <div style={{ border: '1px solid #ab7dab', borderRadius: '15px', width: '300px', padding: '20px', display: 'flex', flexDirection: 'column', textAlign: 'center' }}>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <div style={{ fontWeight: '500', fontSize: '16px' }}>${Number(spot.price).toFixed(2)}&nbsp;<span style={{ fontWeight: '300' }}>night</span></div>
                                <div style={{ fontWeight: '300' }}><i className="fa-solid fa-star" style={{ color: '#993399' }} />&nbsp;{spot.avgStarRating === 'No reviews yet' ? 'New' : (Math.round(spot.avgStarRating * 100) / 100).toFixed(1)} &nbsp;·&nbsp; {spot.numReviews} {spot.numReviews === 1 ? 'Review' : 'Reviews'} </div>
                            </div>

                            <button onClick={() => { handleReserve() }}>RESERVE</button>

                        </div>
                    </div>
                </div>

                <h3><i className="fa-solid fa-star" style={{ color: '#993399' }} />&nbsp;{spot.avgStarRating === 'No reviews yet' ? 'New' : (Math.round(spot.avgStarRating * 100) / 100).toFixed(1)} &nbsp;·&nbsp; {spot.numReviews} {spot.numReviews === 1 ? 'Review' : 'Reviews'} </h3>




            </div>


        </div>

    );

};
