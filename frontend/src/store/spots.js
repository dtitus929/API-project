import { csrfFetch } from './csrf';

const LOAD_SPOTS = 'home/loadSpots';
const LOAD_ONE_SPOT = 'spotdetails/loadOneSpot';

const loadSpots = data => {
    return {
        type: LOAD_SPOTS,
        payload: data
    };
};

export const getSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const list = await response.json();
        // console.log('BACK:', list.Spots)
        dispatch(loadSpots(list.Spots));
    }
};

const loadOneSpot = data => {
    return {
        type: LOAD_ONE_SPOT,
        payload: data
    };
};

export const getOneSpot = (id) => async dispatch => {
    // console.log(id);
    const response = await csrfFetch(`/api/spots/${id}`);

    if (response.ok) {
        const spot = await response.json();
        // console.log('BACK:', spot)
        dispatch(loadOneSpot(spot));
    }
};


const initialState = { allSpots: {}, singleSpot: {} };

const spotsReducer = (state = initialState, action) => {

    switch (action.type) {
        case LOAD_SPOTS:
            const allSpots = {};
            action.payload.forEach((spot) => (allSpots[spot.id] = spot));
            return {
                ...state, allSpots: { ...allSpots }, singleSpot: {}
            }
        case LOAD_ONE_SPOT:
            return { ...state, singleSpot: action.payload }

        default:
            return state;
    }
};

export default spotsReducer;
