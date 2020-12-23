import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import CheckBox from './checkbox';
import SelectBox from './select';

class Form extends Component {    
    validate = () => {        
        const options = { abortEarly: false };        
        const errors = {};
        const { error } = Joi.validate(this.state.data, this.schema, options);          
        if (!error) return null;
        for (let item of error.details) {
            errors[item.path] = item.message;
        }       
        return errors;
    }
    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate(this.state.data);        
        this.setState({ errors: errors || {} });
        if (errors) return;        
        this.doSubmit();
    }
    validateInput = input => {       
        const { name, value } = input;
        const obj = {};
        obj[name] = value;
        const schema = {
            [name]:this.schema[name]
        }
        const {error} = Joi.validate(obj, schema);
        return error ? error.details[0].message : '';        
    }
    handleChange = ({ currentTarget: input }) => {        
        const { name, value } = input;                
        const errorMessage = this.validateInput(input);
        const errors = {...this.state.errors};
        if (!errorMessage) delete errors[name];
        errors[name] = errorMessage;
        let data = { ...this.state.data };        
        data[name] = value;
        if (input.type === "checkbox") {
            data[name] = input.checked;
        }
        this.setState({ data, errors });        
    }   
    renderButton = (label) => {
        return <button className="btn btn-primary" disabled={this.validate()}>{label}</button>
    }
    renderInput = (name,label,type='text') => {
        const { data, errors } = this.state; 
        return <Input name={name} label={label} type={type} value={data[name]} onChange={this.handleChange} error={errors[name]}/>
    }
    renderCheckBox = (name, label) => {
        const { data, errors } = this.state; 
        return <CheckBox name={name} label={label} value={data[name]} onChange={this.handleChange} error={errors[name]}/>
    }
    renderSelectBox = (name, label, options,displayName='name') => {
        const { data, errors } = this.state; 
        return <SelectBox name={name} label={label} displayName={displayName} value={data[name]} onChange={this.handleChange} error={errors[name]} options={options}/>
    }
    
}
 
export default Form;