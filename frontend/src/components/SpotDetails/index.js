import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getOneSpot } from '../../store/spots';
import { getSpotReviews } from '../../store/reviews';

export default function SpotDetails() {
    const [hasReviews, setHasReviews] = useState(false);
    const [isSpot, setIsSpot] = useState(false);

    const { spotId } = useParams();

    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);

    const handleReserve = () => {
        alert('Feature coming soon')
    }

    useEffect(() => {
        dispatch(getOneSpot(spotId))
            .then(async () => {
                setIsSpot(true)
            })
            .catch(async () => {
                setIsSpot(false)
            })

        dispatch(getSpotReviews(spotId))
            .then(async () => {
                setHasReviews(true)
            })
            .catch(async () => {
                setHasReviews(false)
            })

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

    const reviews = useSelector((state) => state.reviews.spot);
    const arrReviews = Object.values(reviews);
    // console.log("The arrReviews are:", arrReviews);

    let reviewUserIds = [];

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    for (let i = 0; i < arrReviews.length; i++) {
        reviewUserIds.push(arrReviews[i].userId);

        const createdDate = new Date(arrReviews[i].createdAt);
        const month = monthNames[createdDate.getUTCMonth()];
        const year = createdDate.getUTCFullYear();
        // console.log(createdDate);
        // console.log(month);
        // console.log(year);

        arrReviews[i].createdAt = month + ' ' + year;
    }


    return (

        <>
            <div className='issue-box' style={isSpot ? { display: 'none' } : {}}>Spot Not Found</div>

            <div className="spotdetail-holder" style={!isSpot ? { display: 'none' } : {}}>

                <div key={spot.id}>
                    <h2 style={{ marginBottom: '8px' }}>{spot.name}</h2>
                    <div style={{ marginBottom: '10px' }}>{spot.city}, {spot.state}, {spot.country}</div>
                    <div className="spotdetail-image-container">
                        <div className="spotdetail-image-left" style={{ borderTopLeftRadius: '14px', borderBottomLeftRadius: '14px', width: '100%', height: '100%' }}>
                            <img src={spot.SpotImages && spotImagePreview} alt={spot.id} style={{ borderTopLeftRadius: '14px', borderBottomLeftRadius: '14px', width: '100%', height: '100%' }} />
                        </div>

                        <img src={spot.SpotImages && arrImages[0]} alt={spot.id} style={{ width: '100%', height: '100%' }} />
                        <img src={spot.SpotImages && arrImages[1]} alt={spot.id} style={{ borderTopRightRadius: '14px', width: '100%', height: '100%' }} />
                        <img src={spot.SpotImages && arrImages[2]} alt={spot.id} style={{ width: '100%', height: '100%' }} />
                        <img src={spot.SpotImages && arrImages[3]} alt={spot.id} style={{ borderBottomRightRadius: '14px', width: '100%', height: '100%' }} />


                    </div>

                    <div style={{ display: 'flex', gap: '20px', borderBottom: '1px solid #CCCCCC', paddingBottom: '20px', marginBottom: '30px' }}>
                        <div style={{ marginRight: '60px' }}>
                            <h3>Hosted by {spot.Owner && spot.Owner.firstName} {spot.Owner && spot.Owner.lastName}</h3>
                            <p>{spot.description}</p>
                            <p>Phasellus dictum venenatis nisi, sit amet eleifend diam cursus eget. Quisque congue,
                                tortor eu venenatis auctor, urna elit consequat augue, eget tempor urna ligula vulputate augue. Fusce velit dui, rutrum eu pulvinar nec,
                                porttitor at felis. Nam sit amet elit in enim gravida cursus. In hendrerit risus et ante consectetur pellentesque. Sed vulputate est nec
                                accumsan lacinia. Aliquam vulputate blandit felis quis maximus. Nulla tortor magna, ultrices id orci ac, laoreet pulvinar nibh. Praesent
                                venenatis sapien vitae ipsum euismod posuere. Suspendisse egestas laoreet massa, dictum mollis nisl viverra vitae. Nam porta sagittis
                                neque ac bibendum. Sed venenatis dignissim ipsum, in malesuada ex efficitur ut. Phasellus metus ante, ullamcorper at sodales quis,
                                hendrerit vel metus. Praesent interdum justo purus, id rhoncus ligula condimentum nec. Sed venenatis sed ante a suscipit. Sed ac feugiat urna.</p>
                        </div>
                        <div style={{ padding: '20px 0px 0px 20px' }}>

                            <div className="spotdetail-infobox">

                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                    <div style={{ fontWeight: '500', fontSize: '16px' }}>${Number(spot.price).toFixed(2)}&nbsp;<span style={{ fontWeight: '300' }}>night</span></div>
                                    <div style={{ fontWeight: '300' }}><i className="fa-solid fa-star" style={{ color: '#993399' }} />&nbsp;{spot.avgStarRating === 'No reviews yet' ? 'New' : (Math.round(spot.avgStarRating * 100) / 100).toFixed(1)} <span style={spot.numReviews === 0 ? { display: 'none' } : {}}>&nbsp;·&nbsp; {spot.numReviews} {spot.numReviews === 1 ? 'Review' : 'Reviews'} </span></div>
                                </div>

                                <button onClick={() => { handleReserve() }}>RESERVE</button>

                            </div>
                        </div>
                    </div>

                    <h3><i className="fa-solid fa-star" style={{ color: '#993399' }} />&nbsp;{spot.avgStarRating === 'No reviews yet' ? 'New' : (Math.round(spot.avgStarRating * 100) / 100).toFixed(1)} <span style={spot.numReviews === 0 ? { display: 'none' } : {}}>&nbsp;·&nbsp; {spot.numReviews} {spot.numReviews === 1 ? 'Review' : 'Reviews'} </span></h3>

                    {sessionUser && spot.Owner && sessionUser.id !== spot.Owner.id && !reviewUserIds.includes(sessionUser.id) && (
                        <div style={{ marginBottom: '18px' }}>
                            <button id={spot.id}>Post Your Review</button>
                            {spot.numReviews === 0 ? (<p>Be the first to post a review!</p>) : ''}
                        </div>
                    )}



                </div>

                {hasReviews && arrReviews?.map(({ id, User, review, createdAt, userId }) => (

                    <div key={id} style={{ padding: '10px 0px 26px 0px', width: '70%' }}>
                        <div style={{ fontSize: '15px', fontWeight: 'bold', paddingBottom: '3px' }}>{User['firstName']}</div>
                        <div style={{ color: '#adadad', paddingBottom: '8px' }}>{createdAt}</div>
                        <div>{review} Aliquam vulputate blandit felis quis maximus. Nulla tortor magna, ultrices id orci ac, laoreet pulvinar nibh. Praesent venenatis sapien vitae ipsum euismod posuere. Suspendisse egestas laoreet massa, dictum mollis nisl viverra vitae. </div>
                        {sessionUser && sessionUser.id === userId && (<button style={{ marginTop: '12px' }}>Delete</button>)}
                    </div>


                ))}

            </div>

        </>

    );

};
