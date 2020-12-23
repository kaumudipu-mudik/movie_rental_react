import { combineReducers } from "redux";
import movieReducer from './movieReducer';
import genreReducer from './genreReducer';
import loginReducer from './loginReducer';
import customerReducer from './customerReducer';
import rentalReducer from './rentalReducer';
import registerUserReducer from './registerUserReducer';

export default combineReducers({
    movieReducer,
    genreReducer,
    loginReducer,
    customerReducer,
    rentalReducer,
    registerUserReducer
})