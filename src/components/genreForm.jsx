import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { connect } from 'react-redux';
import { saveGenre,updateGenre } from '../actions/genres';
class GenreForm extends Form {
    state = { 
        data: {
            name:''
        },
        errors:{}
    }
    schema = {
        _id:Joi.string(),
        name: Joi.string().required().min(5)
    }
    doSubmit = () => {
        console.log('in dosubmit');
        const { name } = this.state.data;
        const genre = {};
        genre.name = name;
        if (this.state.data._id) {
            genre._id = this.state.data._id;
            this.props.updateGenre(genre, this.props.history);
        } else {
            this.props.saveGenre(genre,this.props.history);                
        }          
        this.props.history.push('/genres');
    }
    componentDidMount() {
        const genreId = this.props.match.params.id;
        if (genreId === 'new') return;
        const genre = this.props.genres.find(g => g._id === genreId);
        if (!genre) this.props.history.replace('/not-found');
        this.setState({data:this.mapToViewGenre(genre)})
    }
    mapToViewGenre = genre => {
        return {
            name: genre.name,
            _id:genre._id
        }
    }
    render() { 
        return (
            <React.Fragment>
                <h1>Genre Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('name', 'Name')}
                    {this.renderButton('Save')}
                </form>
            </React.Fragment>
        );
    }
}
const mapStateToProps = state => ({
    genres:state.genreReducer.genres
})
const mapDispatchToProps = dispatch => ({
    saveGenre: (genre, history) => dispatch(saveGenre(genre, history)),
    updateGenre: (genre, history) => dispatch(updateGenre(genre, history)),
})
export default connect(mapStateToProps,mapDispatchToProps)(GenreForm);