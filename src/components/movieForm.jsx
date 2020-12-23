import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { getAllGenres } from '../actions/genres';
import { saveMovie,updateMovie} from '../actions/movies';
import { connect } from 'react-redux';

class MovieForm extends Form {
    state = {
        data: {
            title: '',
            genreId: '',
            dailyRentalRate: 0,
            numberInStock:0
        },
        genres:[],
        errors:{}
    }
    schema = {
        _id:Joi.string(),
        title:Joi.string().required().min(5).max(255),
        numberInStock:Joi.number().required().min(0).max(255),
        dailyRentalRate:Joi.number().min(0).max(255).required(),
        genreId: Joi.string().required()        
    }
    componentDidMount() {        
        this.props.getAllGenres();
        const movieId = this.props.match.params.id;
        if (movieId === 'new') return;
        const movie = this.props.movies.find(m=>m._id===movieId);
        if (!movie) return this.props.history.replace('/not-found');
        this.setState({data:this.mapToViewModel(movie)})
    }
    mapToViewModel = (movie) => {
        return {
            _id:movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            dailyRentalRate: movie.dailyRentalRate,
            numberInStock:movie.numberInStock
        }
    }
    doSubmit = () => {        
        if (this.state.data._id) {
            this.props.updateMovie(this.state.data, this.props.history);
        } else {
            this.props.saveMovie(this.state.data,this.props.history);  
        }              
        this.props.history.push('/movies');
    }
    render() {         
        return (
            <React.Fragment>
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('title', 'Title')}
                    {this.renderSelectBox('genreId','Genre',this.props.genres)}
                    {this.renderInput('numberInStock', 'Stock', 'number')}
                    {this.renderInput('dailyRentalRate', 'Rate', 'number')}
                    {this.renderButton('Save')}
                </form>
            </React.Fragment>
                
        );
    }
}
const mapStateToProps = state => ({
    genres: state.genreReducer.genres,
    movies:state.movieReducer.movies
})
const mapDispatchToProps = dispatch => ({
    saveMovie: (movie, history) => dispatch(saveMovie(movie, history)),
    updateMovie: (movie,history) => dispatch(updateMovie(movie,history)),
    getAllGenres:()=>dispatch(getAllGenres())
})
export default connect(mapStateToProps,mapDispatchToProps)(MovieForm);