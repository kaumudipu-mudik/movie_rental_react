import React from 'react';
import _ from 'lodash';
const Pagination = (props) => {
    const { currentPage, pageSize, itemsCount, onPageChange } = props;
    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount+1);   
    return (
        <ul className="pagination">  
            {pages.map(p => <li key={p} className={p === currentPage ? "page-item active" : "page-item"}>
                <button onClick={() => onPageChange(p)} className="page-link" href="#">{p}</button></li>)}    
        </ul>);
}
 
export default Pagination;