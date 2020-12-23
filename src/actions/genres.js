import * as actions from './actionTypes';
import axios from 'axios';
const apiEndPoint = process.env.REACT_APP_API_URL + 'genres';
export const getAllGenres = () => (dispatch, getState) => {   
    axios.get(apiEndPoint)
        .then(response => dispatch({ type: actions.GET_ALL_GENRES, payload: response.data }))
        .catch(err=>console.log(err.message))
}
export const deleteGenre = (id, history) => (dispatch, getState) => {
    console.log(getState())
    axios.delete(apiEndPoint+'/' + id, {
        headers: {
            "x-auth-token":getState().loginReducer.token
        }
    })
        .then(response => dispatch({ type: actions.DELETE_GENRE, payload: response.data }))
        .catch(err => history.push('/error'));
}

export const saveGenre = (genre, history) => (dispatch, getState) => {
    axios.post(apiEndPoint, genre, {
        headers: {
            "x-auth-token": getState().loginReducer.token
        }
    })
        .then(response => dispatch({ type: actions.SAVE_GENRE, payload: response.data }))
        .catch(() => history.push('/error'));
}

export const updateGenre = (genre, history) => (dispatch, getState) => {
    axios.put(apiEndPoint+'/'+genre._id, genre, {
        headers: {
            "x-auth-token": getState().loginReducer.token
        }
    })
        .then(response => dispatch({ type: actions.UPDATE_GENRE, payload: response.data }))
        .catch(() => history.push('/error'));
}