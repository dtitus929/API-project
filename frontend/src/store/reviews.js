import { csrfFetch } from './csrf';

const LOAD_SPOT_REVIEWS = 'reviews/loadSpotReviews';
const CLEAR_SPOT_REVIEWS = 'reviews/clearSpotReviews'

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const loadSpotReviews = data => {
    return {
        type: LOAD_SPOT_REVIEWS,
        payload: data
    };
};
export const getSpotReviews = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/reviews`);

    if (response.ok) {
        const list = await response.json();
        dispatch(loadSpotReviews(list.Reviews));
    }
    return response;
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const deleteSpotReview = (id) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: "delete",
        headers: {
            "Content-Type": "application/json",
        }
    });
    return response;
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const clearSpotReviews = () => {
    return {
        type: CLEAR_SPOT_REVIEWS,
    };
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

export const postSpotReview = (data) => async () => {
    const response = await csrfFetch(`/api/spots/${data.theSpot}/reviews`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data.payload)
    });
    return response;
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const initialState = { spot: {}, user: {} };

const reviewsReducer = (state = initialState, action) => {

    switch (action.type) {
        case LOAD_SPOT_REVIEWS:
            const allReviews = {};
            action.payload.forEach((review) => (allReviews[review.id] = review));
            return {
                ...state, spot: { ...allReviews }
            }
        case CLEAR_SPOT_REVIEWS:
            return { ...state, spot: {} }
        default:
            return state;
    }
};

export default reviewsReducer;
