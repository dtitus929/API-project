import { Link } from "react-router-dom";

export default function Card(props) {

    const { arrSpots, showUpdateDelete } = props;

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

                    <div style={!showUpdateDelete ? { display: 'none' } : {}}><button>Update</button><button>Delete</button></div>

                </div>

            ))}

        </>
    )


};
