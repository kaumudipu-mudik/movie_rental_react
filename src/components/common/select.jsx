import React from 'react';
const SelectBox = (props) => {
    const { name, label, onChange, value, options, error,displayName } = props;
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select name={name} id={name} onChange={onChange} value={value} className="form-control">
                <option value=''></option>
                {options.map(o => <option key={o._id} value={o._id}>{o[displayName]}</option>)}
            </select>
            {error && <div className="alert alert-danger">{error}</div>}
        </div> );
}
 
export default SelectBox;