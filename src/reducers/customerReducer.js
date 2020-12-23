import * as actions from '../actions/actionTypes';

let customerReducer = (state = { customers: [] }, action) => {
    switch (action.type) {
        case actions.GET_ALL_CUSTOMERS:
            return { customers: [...action.payload] }   
        case actions.DELETE_CUSTOMER:
            return { customers: state.customers.filter(c => c._id !== action.payload._id) }
        case actions.SAVE_CUSTOMER:
            return { customers: [...state.customers, { ...action.payload }] }
        case actions.UPDATE_CUSTOMER:
            return {customers:state.customers.map(c=>c._id===action.payload._id?action.payload:c)}
        default:
            return state;
    }
}
export default customerReducer;