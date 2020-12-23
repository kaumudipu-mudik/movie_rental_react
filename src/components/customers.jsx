import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getAllCustomers,deleteCustomer } from '../actions/customers';
import { connect } from 'react-redux';

class Customers extends Component {
    state = {}
    componentDidMount() {
        this.props.getAllCustomers();
    }
    handleDelete = (customer) => {
        this.props.deleteCustomer(customer._id, this.props.history);
    }
    render() { 
        return (
            <div className="row">
                <div className="col-3">
                    <Link to="/customers/new" style={{marginBottom:20,marginTop:20}}className="btn btn-sm btn-primary">Add Customer</Link>
                </div>
                <div className="col">
                    {this.props.customers.length === 0 ?
                        <p>There are no customers in the database.</p>
                        : <React.Fragment>
                            <p>Showing {this.props.customers.length} from database.</p>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Phone</th>
                                        <th>Gold</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.customers.map(customer =>
                                        <tr key={customer._id}>
                                            <td><Link to={`/customers/${customer._id}`}>{customer.name}</Link></td>
                                            <td>{customer.phone}</td>
                                            <td>{customer.isGold===true ? 'Yes' : 'No'}</td>
                                            <td><button className="btn-sm btn-danger" onClick={()=>this.handleDelete(customer)}>Delete</button></td>
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
    customers:state.customerReducer.customers
})
const mapDispatchToProps = dispatch => ({
    getAllCustomers: (history) => dispatch(getAllCustomers(history)),
    deleteCustomer:(id,history)=>dispatch(deleteCustomer(id,history))    
})
export default connect(mapStateToProps,mapDispatchToProps)(Customers);