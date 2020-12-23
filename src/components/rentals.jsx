import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getAllRentals,deleteRental,returnRental } from '../actions/rentals';
import { connect } from 'react-redux';

class Rentals extends Component {
    state = {}
    componentDidMount() {
        this.props.getAllRentals();
    }
    handleDelete = (rental) => {
        this.props.deleteRental(rental, this.props.history);
    }
    handleReturn = (rental) => {
        this.props.returnRental(rental, this.props.history);
    }
    getFormattedDate(dateStr) {
        const date = new Date(dateStr);
        return (
          date.getDate() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getFullYear() +
          " " +
          date.getHours() +
          ":" +
          date.getMinutes()
        );
      }
    render() { 
        return (
            <div className="row">
                <div className="col-3">
                    <Link to="/rentals/new" style={{marginBottom:20,marginTop:20}}className="btn btn-sm btn-primary">Add rentals</Link>
                </div>
                <div className="col">
                    {this.props.rentals.length === 0 ?
                        <p>There are no rentals in the database.</p>
                        : <React.Fragment>
                            <p>Showing {this.props.rentals.length} from database.</p>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Movie</th>
                                        <th>Customer</th>
                                        <th>Rental Fee</th>
                                        <th>Date Rented</th>
                                        <th>Date Returned</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.rentals.map(rental =>
                                        <tr key={rental._id}>
                                            <td><Link to={`/rentals/${rental._id}`}>{rental.movie.title}</Link></td>
                                            <td>{rental.customer.name}</td>
                                            <td>{rental.rentalFee}</td>
                                            <td>{this.getFormattedDate(rental.dateOut)}</td>
                                            <td>{rental.dateIn ? this.getFormattedDate(rental.dateIn) : ''}</td>
                                            <td><button className="btn-sm btn-danger" onClick={() => this.handleDelete(rental)}>Delete</button></td>
                                            <td><button className="btn-sm btn-primary" disabled={ rental.dateIn?true:false} onClick={()=>this.handleReturn(rental)}>Return</button></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </React.Fragment>
                    }
                </div>
            </div>
            
        );
    }
}
const mapStateToProps = state => ({
    rentals:state.rentalReducer.rentals
})
const mapDispatchToProps = dispatch => ({
    getAllRentals: (history) => dispatch(getAllRentals(history)),
    deleteRental: (rental, history) => dispatch(deleteRental(rental, history)),
    returnRental:(rental, history) => dispatch(returnRental(rental, history)),
})
export default connect(mapStateToProps,mapDispatchToProps)(Rentals);