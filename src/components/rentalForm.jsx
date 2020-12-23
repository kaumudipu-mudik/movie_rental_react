import React from 'react';
import { getAllCustomers } from '../actions/customers';
import { getAllMovies } from '../actions/movies';
import { connect } from 'react-redux';
import Joi from 'joi-browser';
import { saveRental, updateRental } from '../actions/rentals';
import Form from './common/form';

class RentalForm extends Form {
    state = {
        data: {
            customerId: '',
            movieId:''
        },
        errors:{}
    }
    schema = {
        movieId: Joi.string().required(),
        customerId: Joi.string().required(),
        _id: Joi.string(),
    }
    componentDidMount() {        
        this.props.getAllMovies('', '', '', '', '', '', this.props.history);
        this.props.getAllCustomers();
        const rentalId = this.props.match.params.id;
        if (rentalId === 'new') return;
        const rental = this.props.rentals.find(r=>r._id===rentalId);
        if (!rental) return this.props.history.replace('/not-found');
        this.setState({data:this.mapToViewModel(rental)})
    }
    mapToViewModel = (rental) => {
        return {
            _id:rental._id,
            movieId: rental.movie._id,
            customerId: rental.customer._id            
        }
    }
    doSubmit = () => {
        console.log('data', this.state.data);         
        if (this.state.data._id) {
            this.props.updateRental(this.state.data, this.props.history);
        } else {
            this.props.saveRental(this.state.data,this.props.history);  
        }              
        this.props.history.push('/rentals');
    }
    render() {         
        return ( 
            <React.Fragment>
                <h1>Rental Form</h1>
                <form onSubmit={this.handleSubmit}>                    
                    {this.renderSelectBox('movieId','Movie',this.props.movies,'title')}
                    {this.renderSelectBox('customerId','Customer',this.props.customers)}
                    {this.renderButton('Save')}
                </form>
            </React.Fragment>
         );
    }
}
const mapStateToProps = state => ({
    customers: state.customerReducer.customers,
    movies: state.movieReducer.movies,
    rentals:state.rentalReducer.rentals
})
const mapDispatchToProps = dispatch => ({
    saveRental: (rental, history) => dispatch(saveRental(rental, history)),
    updateRental: (rental,history) => dispatch(updateRental(rental,history)),
    getAllMovies: (pageSize, currentPage, genreName, title, path, order, history) => dispatch(getAllMovies(pageSize, currentPage, genreName, title, path, order, history)),
    getAllCustomers:()=>dispatch(getAllCustomers())
})
export default connect(mapStateToProps,mapDispatchToProps)(RentalForm);