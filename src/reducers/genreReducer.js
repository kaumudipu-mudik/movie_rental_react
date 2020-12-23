import * as actions from '../actions/actionTypes';


let genreReducer = (state = { genres: []}, action) => {
    switch (action.type) {
        case actions.GET_ALL_GENRES:            
            return { genres:[...action.payload]}
        case actions.DELETE_GENRE:
            return { genres: state.genres.filter(g => g._id !== action.payload._id) }
        case actions.SAVE_GENRE:
            return {genres:[...state.genres,{...action.payload}]}
        case actions.UPDATE_GENRE:
            return {genres:state.genres.map(g=>g._id===action.payload._id?action.payload:g)}        
        default: return state;
    }
}  
export default genreReducer;