import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { deleteSpot } from '../../store/spots'
import { getSpots } from '../../store/spots';

function DeleteSpot(props) {

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


        return dispatch(deleteSpot(props.currentSpot))
            .then(async () => {
                setShow(false);
                await dispatch(getSpots());
                history.push(`/spots/current`)
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    // console.log(Object.values(data.errors))
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
                Are you sure you want to remove this spot from the listings?


                <button
                    type="submit"
                    className='modal-yes-button'
                >Yes <span style={{ fontWeight: '300', paddingLeft: '20px' }}>(Delete Spot)</span></button>

            </form>

            <button className="modal-no-button" onClick={() => { handleClose() }}>No <span style={{ fontWeight: '300', paddingLeft: '28px' }}>(Keep Spot)</span></button>

        </>

    )


};

export default DeleteSpot;
