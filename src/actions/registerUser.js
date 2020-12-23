import * as actions from './actionTypes';
import axios from 'axios';
const apiEndPoint = process.env.REACT_APP_API_URL + 'users';
export const registerUser = (user, history) => (dispatch, getState) => {
    axios.post(apiEndPoint, user)
        .then(response => dispatch({ type: actions.REGISTER_USER, payload: response.data }))
        .catch(() => history.push('/error'));
}