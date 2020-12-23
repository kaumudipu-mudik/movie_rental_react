import * as actions from './actionTypes';
import axios from 'axios';
const apiEndPoint = process.env.REACT_APP_API_URL + 'rentals';
export const getAllRentals = (history) => (dispatch) => {
    axios.get(apiEndPoint)
        .then(response => dispatch({ type: actions.GET_ALL_RENTALS, payload: response.data }))
        .catch((err) => {
            console.log(err.message);
            history.push('/error')
        });
}
export const deleteRental = (rental, history) => (dispatch, getState) => {
    axios.delete(apiEndPoint+'/' + rental._id, {
        headers: {
            "x-auth-token": getState().loginReducer.token
        }
    })
        .then(response => dispatch({ type: actions.DELETE_RENTAL, payload: response.data }))
        .catch(err => history.push('/error'));
} 
export const saveRental = (rental,history) =>(dispatch,getState)=>{
    axios.post(apiEndPoint, rental, {
        headers: {
            "x-auth-token": getState().loginReducer.token
        }
    })
        .then(response => dispatch({ type: actions.SAVE_RENTAL, payload: response.data }))
        .catch((err) => {
            console.log(err.message);
            history.push('/error')
        } );
}
export const updateRental = (rental,history) =>(dispatch,getState)=>{
    axios.put(apiEndPoint+'/'+rental._id, rental, {
        headers: {
            "x-auth-token": getState().loginReducer.token
        }
    })
        .then(response => dispatch({ type: actions.UPDATE_RENTAL, payload: response.data }))
        .catch((err) => {
            console.log(err.message);
            history.push('/error')
        } );
}
export const returnRental = (rental,history) =>(dispatch,getState)=>{
    axios.patch(apiEndPoint+'/'+rental._id, rental, {
        headers: {
            "x-auth-token": getState().loginReducer.token
        }
    })
        .then(response => dispatch({ type: actions.RETURN_RENTAL, payload: response.data }))
        .catch((err) => {
            console.log(err.message);
            history.push('/error')
        } );
}