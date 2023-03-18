import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getOneSpot } from '../../store/spots';
import { getSpotReviews } from '../../store/reviews';
import { deleteSpotReview } from '../../store/reviews'


function DeleteReview(props) {

    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    const { setShow } = props;

    const history = useHistory();

    const handleClose = () => {
        setShow(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);


        return dispatch(deleteSpotReview(props.currentReview))
            .then(async () => {
                setShow(false);
                await dispatch(getOneSpot(props.currentSpot));
                await dispatch(getSpotReviews(props.currentSpot));
                history.push(`/spots/${props.currentSpot}`)
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(Object.values(data.errors));
                }
            });

    };

    return (

        <>

            <div className='modal-header'>
                <div>&nbsp;</div>
                <div className='modal-title'>Confirm Delete</div>
                {/* <div>Current Review ID:{props.currentReview}</div>
                <div>Current Spot ID:{props.currentSpot}</div> */}
                <div><button className="modal-close" onClick={() => { handleClose() }}>X</button></div>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">

                {errors.length > 0 &&
                    <ul style={{ padding: '0px', margin: '2px 0px 20px 8px', color: 'red' }}>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                }
                Are you sure you want to delete this review?


                <button
                    type="submit"
                    className='modal-yes-button'
                >Yes <span style={{ fontWeight: '300', paddingLeft: '20px' }}>(Delete Review)</span></button>

            </form>

            <button className="modal-no-button" onClick={() => { handleClose() }}>No <span style={{ fontWeight: '300', paddingLeft: '28px' }}>(Keep Review)</span></button>

        </>

    )

};

export default DeleteReview;
