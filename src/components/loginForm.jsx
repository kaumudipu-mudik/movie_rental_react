import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { loginUser } from '../actions/login';
import { connect } from 'react-redux';

class LoginForm extends Form {
    state = {
        data: {            
            password: '',
            email: ''
        },
        errors :{}
    }
    schema = {
        email: Joi.string().required().email(),
        password: Joi.string().required()
    } 
    doSubmit = () => {
        this.props.loginUser(this.state.data, this.props.history);
        this.props.history.push('/movies');
    }
    render() {              
        return (
            <React.Fragment>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit }>
                    {this.renderInput('email','Email')}
                    {this.renderInput('password','Password','password')}
                    {this.renderButton('Submit')}
                </form>
            </React.Fragment>
        );
    }
}
const mapDispatchToProps = dispatch => ({
    loginUser:(user,history)=>dispatch(loginUser(user,history))
})
export default connect(null,mapDispatchToProps)(LoginForm);