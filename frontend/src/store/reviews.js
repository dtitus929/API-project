import { csrfFetch } from './csrf';

const LOAD_SPOT_REVIEWS = 'reviews/loadSpotReviews';
// const LOAD_USER_REVIEWS = 'reviews/loadUserReviews';
// const POST_SPOT_REVIEW = 'reviews/postSpotReview'

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
        // console.log('BACK:', list.Reviews)
        dispatch(loadSpotReviews(list.Reviews));
    }

    return response;
};


export const sendSpotReview = (data) => async () => {
    // console.log('DATA:', data)
    const response = await csrfFetch(`/api/spots/${data.theSpot}/reviews`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data.payload)
    });

    return response;
};

const initialState = { spot: {}, user: {} };

const reviewsReducer = (state = initialState, action) => {

    switch (action.type) {
        case LOAD_SPOT_REVIEWS:
            // console.log('ERR Payload', action.payload);
            const allReviews = {};
            action.payload.forEach((review) => (allReviews[review.id] = review));
            return {
                ...state, spot: { ...allReviews }
            }
        default:
            return state;
    }
};

export default reviewsReducer;
