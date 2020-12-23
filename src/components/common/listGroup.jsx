import React from 'react';
const ListGroup = (props) => {
    const { itemList, valueProperty,textProperty,onItemSelection, selectedItem } = props;
    return (
        <ul className="list-group">
            {itemList.map(item => <li key={item[valueProperty]} style={{ cursor: 'pointer' }}
                className={selectedItem === item[textProperty] ? "list-group-item active" : "list-group-item"}
                onClick={() => onItemSelection(item[textProperty])}>{item[textProperty]}</li>)}            
        </ul> );
}
ListGroup.defaultProps = {
    valueProperty: "_id",
    textProperty:"name"
}
export default ListGroup;