import * as actions from './actionTypes';
import axios from 'axios';
const pageSize = 5;
const currentPage = 1;
const title = '';
const genreName = '';
const path = 'title';
const order = 1;
const apiEndPoint = process.env.REACT_APP_API_URL + 'movies';
export const getAllMovies = (pageSize, currentPage, genreName, title, path, order, history) => (dispatch, getState) => {    
    axios.get(apiEndPoint+'?pageSize=' + pageSize + '&currentPage=' + currentPage
            +'&genreName='+genreName+'&title='+title+'&path='+path+'&order='+order)
        .then(response => dispatch({ type: actions.GET_ALL_MOVIES, payload: response.data }))
        .catch((err) => {
            console.log(err.message);
            history.push('/error')
        });
}
export const deleteMovie = (movie, history) => (dispatch, getState) => {
    axios.delete(apiEndPoint+'/' + movie._id, {
        headers: {
            "x-auth-token": getState().loginReducer.token
        }
    })
        .then(response => {
        return axios.get(apiEndPoint+'?pageSize=' + pageSize + '&currentPage='
            + currentPage + '&genreName=' + genreName + '&title=' + title + '&path=' + path + '&order=' + order)
        })
        .then(response => dispatch({ type: actions.GET_ALL_MOVIES, payload: response.data }))
        .catch(err => history.push('/error'));
} 
export const toggleLike = (movie,history) =>(dispatch,getState)=>{
    axios.patch(apiEndPoint+'/'+movie._id, movie, {
        headers: {
            "x-auth-token": getState().loginReducer.token
        }
    })
        .then(response => dispatch({ type: actions.TOGGLE_LIKE, payload: response.data }))
        .catch((err) => {
            console.log(err.message);
            history.push('/error')
        } );
}
export const searchMovie = input => ({
    type: actions.SEARCH_MOVIE,
    payload: {
        input
    }
})
export const saveMovie = (movie,history) =>(dispatch,getState)=>{
    axios.post(apiEndPoint, movie, {
        headers: {
            "x-auth-token": getState().loginReducer.token
        }
    })
        .then(response => {
            return axios.get(apiEndPoint+'?pageSize=' + pageSize + '&currentPage='
                + currentPage + '&genreName=' + genreName + '&title=' + title + '&path=' + path + '&order=' + order)
        })
        .then(response => dispatch({ type: actions.GET_ALL_MOVIES, payload: response.data }))
        .catch((err) => {
            console.log(err.message);
            history.push('/error')
        } );
}
export const updateMovie = (movie,history) =>(dispatch,getState)=>{
    axios.put(apiEndPoint+'/'+movie._id, movie, {
        headers: {
            "x-auth-token": getState().loginReducer.token
        }
    })
        .then(response => dispatch({ type: actions.UPDATE_MOVIE, payload: response.data }))
        .catch((err) => {            
            history.push('/error')
        } );
}
export const getMoviesCount = (genreName,title,history) => (dispatch) => {
    axios.get(apiEndPoint+'/count?genreName='+genreName+'&title='+title)
        .then(response => dispatch({ type: actions.GET_MOVIES_COUNT, payload: response.data }))
        .catch(() => history.push('/error'));
}