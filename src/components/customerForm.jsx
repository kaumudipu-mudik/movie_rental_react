import React from 'react';
import Form from './common/form';
import { saveCustomer, updateCustomer } from '../actions/customers';
import Joi from 'joi-browser';
import { connect } from 'react-redux';
class CustomerForm extends Form {
    state = { 
        data: {
            name: '',
            phone: '',
            isGold: false
        },
        errors:{}
    }
    schema = {
        _id:Joi.string(),
        name: Joi.string().required().min(5).max(10),        
        phone:Joi.string().required().min(5).max(10),
        isGold:Joi.boolean()
    } 
    componentDidMount() {
        if (this.props.match.params.id === 'new') return;
        const customer = this.props.customers.find(c => c._id === this.props.match.params.id);
        if (!customer) return this.props.history.replace('/not-found');
        this.setState({data:this.mapToViewCustomer(customer)})
    }
    mapToViewCustomer = (customer) => ({
        name: customer.name,
        phone: customer.phone,
        isGold: customer.isGold,        
        _id:customer._id
    })
    doSubmit = () => {
        console.log('doSubmit',this.state.data);
        const customer = {
            name: this.state.data.name,
            phone: this.state.data.phone,
            isGold: this.state.data.isGold
        }
        if (this.state.data._id) {
            customer._id = this.state.data._id;
            this.props.updateCustomer(customer,this.props.history)
        } else {
            this.props.saveCustomer(customer, this.props.history);            
        }
        this.props.history.push('/customers');
    }
    render() { 
        return (
            <React.Fragment>
                <h1>Customer Form </h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('name', 'Name')}
                    {this.renderInput('phone', 'Phone')}
                    {this.renderCheckBox('isGold','Gold')}
                    {this.renderButton('Save')}
                </form>
            </React.Fragment>
            
        )
    }
}
const mapStateToProps = state => ({
    customers:state.customerReducer.customers
})
const mapDispatchToProps = dispatch => ({
    updateCustomer: (customer,history) => dispatch(updateCustomer(customer,history)),
    saveCustomer:(customer,history)=>dispatch(saveCustomer(customer,history))    
})
export default connect(mapStateToProps,mapDispatchToProps)(CustomerForm);