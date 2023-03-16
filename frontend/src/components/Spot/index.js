import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { useParams } from "react-router-dom";

function SpotForm() {

    const { spotId } = useParams();

    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [photo1, setPhone1] = useState("");
    const [photo2, setPhone2] = useState("");
    const [photo3, setPhone3] = useState("");
    const [photo4, setPhone4] = useState("");
    const [photo5, setPhone5] = useState("");
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true)

    const lat = 37.7645358;
    const lng = -122.4730327;

    // console.log('sessUserID:', sessionUser.id);
    // console.log('paramSpotID:', spotId);

    // if (!sessionUser || sessionUser.id !== spotId) return (
    //     <Redirect to="/" />
    // );

    // useEffect(() => {
    //     if (
    //         email === '' ||
    //         username === '' ||
    //         firstName === '' ||
    //         lastName === '' ||
    //         password === '' ||
    //         confirmPassword === ''
    //     ) {
    //         setIsDisabled(true)
    //     } else {
    //         setIsDisabled(false)
    //     }
    // }, [email, username, firstName, lastName, password, confirmPassword]);


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        setIsDisabled(false)
        setErrors([]);
        return dispatch(sessionActions.signup({ address, city, state, country, name, description, price, lat, lng }))
            .then(async () => {
                // setShow(false)
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

            <div className='page-title-holder'>
                <div className='page-title' style={{ paddingBottom: '5px' }}>
                    {!spotId ? 'Create a New Spot' : 'Update your Spot'}
                </div>
            </div>

            <div className="spot-form-holder">

                <form onSubmit={handleSubmit} className="modal-form">

                    {errors.length > 0 &&
                        <ul style={{ padding: '0px', margin: '2px 0px 20px 8px', color: 'red' }}>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                    }

                    <div className='spot-form-subheader-holder'>
                        <div className='spot-form-subheader'>Where's your place located?</div>
                        Guests will only get your exact address once they booked a reservation.
                    </div>

                    <label>
                        Country
                        <input
                            type="text"
                            placeholder="Country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Street Address
                        <input
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </label>
                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                        <label style={{ width: '60%' }}>
                            City
                            <input
                                type="text"
                                placeholder="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </label>
                        <div style={{ padding: '0px 8px 14px 4px' }}>,</div>
                        <label style={{ width: '40%' }}>
                            State
                            <input
                                type="text"
                                placeholder="State"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required
                            />
                        </label>
                    </div>

                    <div className='spot-form-divider'></div>

                    <label>

                        <div className='spot-form-subheader-holder'>
                            <div className='spot-form-subheader'>Describe your place to guests</div>
                            Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.
                        </div>

                        <textarea
                            placeholder="Description..."
                            rows={5}
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </label>

                    <div className='spot-form-divider'></div>

                    <div className='spot-form-subheader-holder'>
                        <div className='spot-form-subheader'>Create a title for your spot</div>
                        Catch guests' attention with a spot title that highlights what makes your place special.
                    </div>

                    <label>

                        <input
                            type="text"
                            placeholder="Name of your spot"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>

                    <div className='spot-form-divider'></div>

                    <div className='spot-form-subheader-holder'>
                        <div className='spot-form-subheader'>Set a base price for your spot</div>
                        Competitive pricing can help your listing stand out and rank higher in search results.
                    </div>

                    <label>
                        <input
                            type="text"
                            placeholder="Price per night (USD)"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </label>

                    <div className='spot-form-divider'></div>

                    <div className='spot-form-subheader-holder'>
                        <div className='spot-form-subheader'>Liven up your spot with photos</div>
                        Submit a link to at least one photo to publish your spot.
                    </div>

                    <label>
                        <input
                            type="text"
                            placeholder="Preview Image URL"
                            value={photo1}
                            onChange={(e) => setPhone1(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Image URL"
                            value={photo2}
                            onChange={(e) => setPhone2(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Image URL"
                            value={photo3}
                            onChange={(e) => setPhone3(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Image URL"
                            value={photo4}
                            onChange={(e) => setPhone4(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Image URL"
                            value={photo5}
                            onChange={(e) => setPhone5(e.target.value)}
                            required
                        />
                    </label>
                    <div className='spot-form-divider'></div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button
                            type="submit"
                            className='spot-submit-button'
                            style={{ width: 'fit-content' }}
                            disabled={isDisabled}
                        >{!spotId ? 'Create Spot' : 'Update Spot'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default SpotForm;
