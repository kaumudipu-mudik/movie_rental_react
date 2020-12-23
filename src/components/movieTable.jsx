import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Like from './common/like';
import TableHeader from './common/tableHeader';

class MovieTable extends Component {
    state = {}
    columns = [
        { path: 'title', label: 'Title' },
        { path: 'genre.name', label: 'Genre' },
        { path: 'numberInStock', label: 'Stock' },
        { path: 'dailyRentalRate', label: 'Rate' },
        { key: 'like' },
        {key:'delete'}
    ]
    render() { 
        return ( 
            <table className="table">
                <TableHeader columns={this.columns} onSort={this.props.onSort}
                    sortColumn={this.props.sortColumn} />
                <tbody>
                    {this.props.movies.map(movie =>
                        <tr key={movie._id}>
                            <td><Link to={`/movies/${movie._id}`}>{movie.title}</Link></td>
                            <td>{movie.genre.name}</td>
                            <td>{movie.numberInStock}</td>
                            <td>{movie.dailyRentalRate}</td>
                            <td><Like liked={movie.liked} onLike={() => this.props.onLike(movie)} /></td>
                            <td><button className="btn-danger btn-sm"
                                onClick={() => this.props.onDelete(movie)}
                            >Delete</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
         );
    }
}
 
export default MovieTable;