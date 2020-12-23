import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteGenre, getAllGenres } from '../actions/genres';
class Genres extends Component {
    state = {}
    handleDelete = (genre) => {
        this.props.deleteGenre(genre._id,this.props.history);
    }
    componentDidMount() {
        this.props.getAllGenres();
    }
    render() { 
        return(
        <div className="row">
            <div className="col-3">
                <Link className="btn btn-primary btn-sm" style={{marginBottom:20,marginTop:20}} to="/genres/new">Add Genre</Link>
            </div>
            <div className="col">
                    {this.props.genres.length === 0 ? <p style={{marginBottom:20,marginTop:20}}>There are no genres in the database.</p> :
                        <React.Fragment>
                            <p style={{marginBottom:20,marginTop:20}}>Showing {this.props.genres.length} genres from database</p>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.genres.map(g =>
                                        <tr key={g._id}>
                                            <td><Link to={`/genres/${g._id}`}>{g.name}</Link></td>
                                            <td><button className="btn-sm btn-danger" onClick={() => this.handleDelete(g)}>Delete</button></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </React.Fragment>};
                </div>
        </div>
    )}
}
 
const mapStateToProps = state => ({
    genres:state.genreReducer.genres
})
const mapDispatchToProps = dispatch => ({
    deleteGenre: (id,history) => dispatch(deleteGenre(id,history)),
    getAllGenres:()=>dispatch(getAllGenres())
})
export default connect(mapStateToProps,mapDispatchToProps)(Genres);