import { csrfFetch } from './csrf';

const LOAD_SPOTS = 'home/loadSpots';

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
        console.log('BACK:', list.Spots)
        dispatch(loadSpots(list.Spots));
    }
};


const initialState = { allSpots: null, singleSpot: null };

const spotsReducer = (state = initialState, action) => {

    switch (action.type) {
        case LOAD_SPOTS:
            console.log('PAYLOAD:', action.payload);
            return { ...state, allSpots: action.payload }

        // const allSpots = {};
        // action.payload.forEach((spot) => (allSpots[spot.id] = spot));
        // return {
        //     ...state, allSpots: { ...allSpots }
        // }
        default:
            return state;
    }
};

export default spotsReducer;
