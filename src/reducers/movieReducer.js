import * as actions from '../actions/actionTypes';

let movieReducer = (state = { movies: [],totalMovies:0}, action) => {
    switch (action.type) {
        case actions.GET_ALL_MOVIES:
            return { ...state,movies: [...action.payload] }   
        case actions.GET_MOVIES_COUNT:
            return {...state,totalMovies:action.payload.totalMovies}
        case actions.DELETE_MOVIE:
            return { movies: state.movies.filter(movie => movie._id !== action.payload._id) }
        case actions.TOGGLE_LIKE:           
            return { movies: state.movies.map(m => m._id === action.payload._id ? action.payload : m) };
        case actions.SEARCH_MOVIE:
            return { movies: state.movies.filter(movie => movie.title.toUpperCase().indexOf(action.payload.input.value.toUpperCase()) !== -1) }            
        case actions.SAVE_MOVIE:           
            return { movies: [...state.movies, { ...action.payload }] }   
        case actions.UPDATE_MOVIE:
            return { movies: state.movies.map(m => m._id === action.payload._id ? action.payload : m) };
        default:            
            return state;            
    }
}
export default movieReducer;