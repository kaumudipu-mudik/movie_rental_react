import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { registerUser } from '../actions/registerUser';
import { connect } from 'react-redux';

class RegisterForm extends Form {
    state = { 
        data: {
            email: '',
            password: '',
            name: '',
            isAdmin:false
        },
        errors: {}
    }
    schema = {
        name:Joi.string().required().min(5).max(50),
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().required().min(5).max(1024),
        isAdmin:Joi.boolean()
    }
    doSubmit = () => {
        this.props.registerUser(this.state.data, this.props.history);
        this.props.history.push('/login');
    }
    render() { 
        return ( 
            <React.Fragment>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit }>
                    {this.renderInput('name', 'Name')}
                    {this.renderInput('email', 'Email')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderCheckBox('isAdmin','Admin')}
                    {this.renderButton('Register')}
                </form>
            </React.Fragment>
         );
    }
}
const mapDispatchToProps = dispatch => ({
    registerUser:(user,history)=>dispatch(registerUser(user,history))
})
export default connect(null,mapDispatchToProps)(RegisterForm);