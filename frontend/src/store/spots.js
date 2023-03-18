import { csrfFetch } from './csrf';

const LOAD_SPOTS = 'home/loadSpots';
const LOAD_ONE_SPOT = 'spotdetails/loadOneSpot';

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

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
        dispatch(loadSpots(list.Spots));
    }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const loadOneSpot = data => {
    return {
        type: LOAD_ONE_SPOT,
        payload: data
    };
};

export const getOneSpot = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`);

    if (response.ok) {
        const spot = await response.json();
        dispatch(loadOneSpot(spot));
    }
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const addSpotImage = (id, url, preview) => async () => {
    const response = await csrfFetch(`/api/spots/${id}/images`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            {
                url,
                preview
            }
        )
    });
    return response;
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const postNewSpot = (data) => async dispatch => {
    const response = await csrfFetch(`/api/spots`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data.payload)
    })

    if (response.ok) {
        const newResponse = await response.json();
        return newResponse;
    }

    return response;
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const editSpot = (data) => async () => {
    const response = await csrfFetch(`/api/spots/${data.spotId}`, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data.payload)
    });
    return response;
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const deleteSpot = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: "delete",
        headers: {
            "Content-Type": "application/json",
        }
    });
    return response;
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

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
