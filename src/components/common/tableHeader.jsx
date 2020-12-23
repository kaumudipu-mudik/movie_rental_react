import React, { Component } from 'react';
class TableHeader extends Component {
    state = {}
    raiseSort = path => {        
        let sortColumn = { ...this.props.sortColumn };
        if (sortColumn.path === path) sortColumn.order = sortColumn.order === 1 ? -1 : 1;
        else {
            sortColumn.path = path;
            sortColumn.order = 1;
        }
        this.props.onSort(sortColumn);
    }
    renderSortIcon = column => {
        if (this.props.sortColumn.path !== column.path) return null;
        return this.props.sortColumn.order === 1 ?
            <i className="fa fa-sort-asc" aria-hidden="true"></i>
            : <i className="fa fa-sort-desc" aria-hidden="true"></i>
    }
    render() { 
        return ( 
            <thead style={{cursor:'pointer'}}>
                    <tr>
                        {this.props.columns.map(column =>
                            <th key={column.path || column.key} onClick={()=>this.raiseSort(column.path)}>
                                {column.label}{this.renderSortIcon(column)}
                            </th>)}
                    </tr>
            </thead>
         );
    }
}
 
export default TableHeader;