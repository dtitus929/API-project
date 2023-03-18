import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getOneSpot } from "../../store/spots";
import { useDispatch } from "react-redux";


export default function Card(props) {

    const { arrSpots, showUpdateDelete, setShow, setCurrentModal, setCurrentSpot } = props;

    const history = useHistory();

    const dispatch = useDispatch();

    const handleUpdate = async (id) => {
        dispatch(getOneSpot(id))
        history.push(`/spots/${id}/edit`)
    }

    const handleModal = (id) => {
        setCurrentModal('deletespot');
        setCurrentSpot(id)
        setShow(true);
    }

    return (

        <>

            {arrSpots?.map(({ id, name, city, state, avgRating, price, previewImage }) => (

                <div key={id}>

                    <Link title={name} className='spot-card-link' to={`/spots/${id}`}>
                        <div className="spot-card" style={{ backgroundImage: '' }}>
                            <img src={previewImage} alt={id} style={{ borderRadius: '14px', marginBottom: '8px' }} />
                            <div style={{ fontWeight: '500', fontSize: '15px' }}>{city}, {state}<span style={{ float: 'right', fontWeight: '300' }}><i className="fa-solid fa-star" style={{ color: '#993399' }} />&nbsp;{avgRating === 'No reviews yet' ? 'New' : Number(avgRating).toFixed(1)}</span></div>
                            <div style={{ fontWeight: '400', paddingTop: '5px' }}>${Number(price).toFixed(2)}&nbsp;<span style={{ fontWeight: '300' }}>night</span></div>
                        </div>
                    </Link>

                    <div style={!showUpdateDelete ? { display: 'none' } : {}}>
                        <div style={{ display: 'flex', gap: '5px', padding: '8px 0px 12px 0px' }}>
                            <button onClick={() => { handleUpdate(id) }} className="standard-button">Update</button><button onClick={() => { handleModal(id) }} className="standard-button">Delete</button>
                        </div>
                    </div>

                </div>

            ))}

        </>
    )


};
