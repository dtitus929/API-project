import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { sendSpotReview } from '../../store/reviews'
import { getSpotReviews } from '../../store/reviews';

function AddReview(props) {

    const theSpot = props.currentSpot;

    // console.log('PRPS:', props.currentSpot)

    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true)

    const dispatch = useDispatch();

    const { setShow } = props;

    const history = useHistory();

    // const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        if (review.length < 10 || stars <= 0) {
            setIsDisabled(true)
        } else {
            setIsDisabled(false)
        }
    }, [review, stars]);



    const handleClose = () => {
        setShow(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        const payload = {
            review,
            stars
        };

        return dispatch(sendSpotReview({ payload, theSpot }))
            .then(async () => {
                setShow(false);
                await dispatch(getSpotReviews(props.currentSpot))
                history.push(`/spots/${props.currentSpot}`)
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setIsDisabled(true)
                    // console.log(Object.values(data.errors))
                    setErrors(Object.values(data.errors));
                }
            });

    };

    return (


        <>

            <div className='modal-header'>
                <div>&nbsp;</div>
                <div className='modal-title'>How was your stay?</div>
                <div><button className="modal-close" onClick={() => { handleClose() }}>X</button></div>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">

                {errors.length > 0 &&
                    <ul style={{ padding: '0px', margin: '2px 0px 20px 8px', color: 'red' }}>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                }

                <label>
                    <textarea
                        placeholder="Leave your review here..."
                        rows={5}
                        type="text"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                    />

                </label>
                <label>
                    Stars
                    <input
                        type="text"
                        value={stars}
                        onChange={(e) => setStars(e.target.value)}
                        required
                    />
                </label>
                <button
                    type="submit"
                    className='modal-submit-button'
                    disabled={isDisabled}
                >Submit Your Review</button>


            </form>

        </>

    )


};

export default AddReview;
