import axios from 'axios';
import * as actions from './actionTypes';
const apiEndPoint = process.env.REACT_APP_API_URL + 'login';
export const loginUser = (user, history) => dispatch => {
    axios.post(apiEndPoint, user)
        .then(response => {
            localStorage.setItem("token", response.data);
            dispatch({ type: actions.LOGIN_USER, payload: response.data })
        })
        .catch(err => history.push('/error'));
}
export const loadLogin = () => ({
    type: actions.LOGIN_USER,
    payload: localStorage.getItem("token")
})
export const logoutUser = () => ({
    type:actions.LOGOUT_USER
})
