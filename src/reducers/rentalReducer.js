import * as actions from '../actions/actionTypes';

let rentalReducer = (state = { rentals: [] }, action) => {
    switch (action.type) {
        case actions.GET_ALL_RENTALS:
            return { rentals: [...action.payload] }   
        case actions.DELETE_RENTAL:
            return { rentals: state.rentals.filter(r => r._id !== action.payload._id) }
        case actions.SAVE_RENTAL:
            return { rentals: [...state.rentals, { ...action.payload }] }
        case actions.UPDATE_RENTAL:
            return { rentals: state.rentals.map(r => r._id === action.payload._id ? action.payload : r) }
        case actions.RETURN_RENTAL:
            return { rentals: state.rentals.map(r => r._id === action.payload._id ? action.payload : r) }
        default:
            return state;
    }
}
export default rentalReducer;