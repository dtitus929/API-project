import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { postNewSpot } from "../../store/spots"
import { editSpot } from "../../store/spots"
import { getSpots } from "../../store/spots";

function SpotForm(props) {

    const { spot } = props;

    const { spotId } = useParams();

    const dispatch = useDispatch();

    const [address, setAddress] = useState(spot?.address || '');
    const [city, setCity] = useState(spot?.city || '');
    const [state, setState] = useState(spot?.state || '');
    const [country, setCountry] = useState(spot?.country || '');
    const [name, setName] = useState(spot?.name || '');
    const [description, setDescription] = useState(spot?.description || '');
    const [price, setPrice] = useState(spot?.price || '');
    const [photo1, setPhoto1] = useState('');
    const [photo2, setPhoto2] = useState('');
    const [photo3, setPhoto3] = useState('');
    const [photo4, setPhoto4] = useState('');
    const [photo5, setPhoto5] = useState('');
    const lat = 37.7645358;
    const lng = -122.4730327;
    const [errors, setErrors] = useState({});
    const [isDisabled, setIsDisabled] = useState(false);
    const [hasSumbitted, setHasSubmitted] = useState(false)

    const history = useHistory();

    const pageErrors = {};

    useEffect(() => {

        if (
            address === '' ||
            city === '' ||
            state === '' ||
            country === '' ||
            name === '' ||
            description === '' ||
            price === '' ||
            photo1 === ''
        ) {
            setIsDisabled(true)
        } else {
            setIsDisabled(false)
        }

        if (hasSumbitted && description.length < 30) {
            pageErrors.description = 'Description needs a minimum of 30 characters'
            setIsDisabled(true)
        } else {
            setErrors(delete errors.description)
        }

        if (hasSumbitted && !/^-{0,1}\d*\.{0,1}\d+$/.test(price)) {
            pageErrors.price = 'Price must inlude dollar a value only (ex: 200 or 195.95)'
            setIsDisabled(true)
        } else {
            setErrors(delete errors.price)
        }

        if (hasSumbitted && (!photo1.includes('.png') && !photo1.includes('.jpg') && !photo1.includes('.jpeg'))) {
            pageErrors.imgtype1 = 'Image URL needs to end in .png, .jpg or .jpeg';
            setIsDisabled(true)
        } else {
            setErrors(delete errors.imgtype1)
        }

        if (hasSumbitted && photo2.length >= 1 && (!photo2.includes('.png') && !photo2.includes('.jpg') && !photo2.includes('.jpeg'))) {
            pageErrors.imgtype2 = 'Image URL needs to end in .png, .jpg or .jpeg';
            setIsDisabled(true)
        } else {
            setErrors(delete errors.imgtype2)
        }

        if (hasSumbitted && photo2.length >= 1 && (!photo2.includes('.png') && !photo2.includes('.jpg') && !photo2.includes('.jpeg'))) {
            pageErrors.imgtype2 = 'Image URL needs to end in .png, .jpg or .jpeg';
            setIsDisabled(true)
        } else {
            setErrors(delete errors.imgtype2)
        }

        if (hasSumbitted && photo3.length >= 1 && (!photo3.includes('.png') && !photo3.includes('.jpg') && !photo3.includes('.jpeg'))) {
            pageErrors.imgtype3 = 'Image URL needs to end in .png, .jpg or .jpeg';
            setIsDisabled(true)
        } else {
            setErrors(delete errors.imgtype3)
        }

        if (hasSumbitted && photo4.length >= 1 && (!photo4.includes('.png') && !photo4.includes('.jpg') && !photo4.includes('.jpeg'))) {
            pageErrors.imgtype4 = 'Image URL needs to end in .png, .jpg or .jpeg';
            setIsDisabled(true)
        } else {
            setErrors(delete errors.imgtype4)
        }


        if (hasSumbitted && photo5.length >= 1 && (!photo5.includes('.png') && !photo5.includes('.jpg') && !photo5.includes('.jpeg'))) {
            pageErrors.imgtype5 = 'Image URL needs to end in .png, .jpg or .jpeg';
            setIsDisabled(true)
        } else {
            setErrors(delete errors.imgtype5)
        }

        setErrors(pageErrors);

    }, [hasSumbitted, address, city, state, country, name, description, price, photo1, photo2, photo3, photo4, photo5]);


    const handleSubmit = (e) => {
        e.preventDefault();

        setHasSubmitted(true);

        if (description.length < 30) return null;
        if (!/^-{0,1}\d*\.{0,1}\d+$/.test(price)) return null;
        if (photo1.length >= 1 && !photo1.includes('.png') && !photo1.includes('.jpg') && !photo1.includes('.jpeg')) return null;
        if (photo2.length >= 1 && !photo2.includes('.png') && !photo2.includes('.jpg') && !photo2.includes('.jpeg')) return null;
        if (photo3.length >= 1 && !photo3.includes('.png') && !photo3.includes('.jpg') && !photo3.includes('.jpeg')) return null;
        if (photo4.length >= 1 && !photo4.includes('.png') && !photo4.includes('.jpg') && !photo4.includes('.jpeg')) return null;
        if (photo5.length >= 1 && !photo5.includes('.png') && !photo5.includes('.jpg') && !photo5.includes('.jpeg')) return null;

        if (!spotId) {
            return dispatch(postNewSpot({ address, city, state, country, name, description, price, lat, lng }))
                .then(async (res) => {
                    const data = await res.json();
                    // console.log(data);
                    await dispatch(getSpots());
                    history.push(`/spots/${data.id}`)
                })
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        setIsDisabled(true)
                        // console.log(Object.values(data.errors))
                        setErrors(data.errors);
                    }
                });
        } else {
            const payload = {
                address,
                city,
                state,
                country,
                name,
                description,
                price,
                lat,
                lng
            };
            return dispatch(editSpot({ payload, spotId }))
                .then(async (res) => {
                    const data = await res.json();
                    // console.log(data);
                    await dispatch(getSpots());
                    history.push(`/spots/${data.id}`)
                })
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        setIsDisabled(true)
                        // console.log(Object.values(data.errors))
                        setErrors(data.errors);
                    }
                });
        }


    };

    // console.log('Errors:', { errors });

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
                        Country{errors.country && (<span className='error1'>{errors.country}</span>)}
                        <input
                            type="text"
                            placeholder="Country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Street Address{errors.address && (<span className='error1'>{errors.address}</span>)}
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
                            City{errors.city && (<span className='error1'>{errors.city}</span>)}
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
                            State{errors.state && (<span className='error1'>{errors.state}</span>)}
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
                            placeholder="Please write at least 30 characters..."
                            rows={5}
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        {errors.description && (<div className='error2'>{errors.description}</div>)}
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
                        {errors.name && (<div className='error2'>{errors.name}</div>)}
                    </label>

                    <div className='spot-form-divider'></div>

                    <div className='spot-form-subheader-holder'>
                        <div className='spot-form-subheader'>Set a base price for your spot</div>
                        Competitive pricing can help your listing stand out and rank higher in search results.
                    </div>

                    <label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ padding: '0px 5px 13px 0px' }}>$</div>
                            <input
                                type="text"
                                placeholder="Price per night (USD)"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>
                        {errors.price && (<div className='error2'>{errors.price}</div>)}
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
                            onChange={(e) => setPhoto1(e.target.value)}
                            required
                        />
                        {errors.imgtype1 && (<div className='error3'>{errors.imgtype1}</div>)}
                        <input
                            type="text"
                            placeholder="Image URL"
                            value={photo2}
                            onChange={(e) => setPhoto2(e.target.value)}
                        />
                        {errors.imgtype2 && (<div className='error3'>{errors.imgtype2}</div>)}
                        <input
                            type="text"
                            placeholder="Image URL"
                            value={photo3}
                            onChange={(e) => setPhoto3(e.target.value)}
                        />
                        {errors.imgtype3 && (<div className='error3'>{errors.imgtype3}</div>)}
                        <input
                            type="text"
                            placeholder="Image URL"
                            value={photo4}
                            onChange={(e) => setPhoto4(e.target.value)}
                        />
                        {errors.imgtype4 && (<div className='error3'>{errors.imgtype4}</div>)}
                        <input
                            type="text"
                            placeholder="Image URL"
                            value={photo5}
                            onChange={(e) => setPhoto5(e.target.value)}
                        />
                        {errors.imgtype5 && (<div className='error3'>{errors.imgtype5}</div>)}
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
