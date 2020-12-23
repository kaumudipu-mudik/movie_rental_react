import React from 'react';
const CheckBox = (props) => {
    const { name, label, value, onChange, error } = props;
    console.log(value);
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>&nbsp;
            <input type="checkbox" name={name} id={name} onChange={onChange} value={value?true:false} checked={value?true:false}  />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    )    
}
 
export default CheckBox;