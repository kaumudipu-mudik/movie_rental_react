import axios from 'axios';
import * as actions from './actionTypes';
const apiEndPoint = process.env.REACT_APP_API_URL + 'customers';
export const getAllCustomers = (history) => (dispatch) => {
    axios.get(apiEndPoint)
        .then(response => dispatch({ type: actions.GET_ALL_CUSTOMERS, payload: response.data }))
        .catch(()=>history.push('/error'))
}
export const deleteCustomer = (id,history) => (dispatch,getState) => {
    axios.delete(apiEndPoint+'/' + id, {
        headers: {
            "x-auth-token":getState().loginReducer.token
        }
    })
        .then(response => dispatch({ type: actions.DELETE_CUSTOMER, payload: response.data }))
        .catch(()=>history.push('/error'))
}
export const saveCustomer = (customer,history) => (dispatch,getState) => {
    axios.post(apiEndPoint,customer, {
        headers: {
            "x-auth-token":getState().loginReducer.token
        }
    })
        .then(response => dispatch({ type: actions.SAVE_CUSTOMER, payload: response.data }))
        .catch(()=>history.push('/error'))
}
export const updateCustomer = (customer,history) => (dispatch,getState) => {
    axios.put(apiEndPoint+'/' + customer._id, customer,{
        headers: {
            "x-auth-token":getState().loginReducer.token
        }
    })
        .then(response => dispatch({ type: actions.UPDATE_CUSTOMER, payload: response.data }))
        .catch(()=>history.push('/error'))
}