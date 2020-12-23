import * as actions from '../actions/actionTypes';
let loginReducer = (state = { token: "" }, action) => {
    switch (action.type) {
        case actions.LOGIN_USER:                   
            return { token: action.payload }
        case actions.LOGOUT_USER:
            localStorage.setItem('token', '');
            return { token: '' };
        default: return state;
    }
}
export default loginReducer;