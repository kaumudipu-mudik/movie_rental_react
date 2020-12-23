import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getAllMovies, deleteMovie, toggleLike, searchMovie, getMoviesCount } from '../actions/movies';
import { getAllGenres } from '../actions/genres';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import { connect } from 'react-redux';
import MovieTable from './movieTable';

class Movies extends Component {     
    state = {
        pageSize: 5,
        currentPage: 1,
        genreName: '',
        title: '',
        sortColumn: {
            path: 'title',
            order:1
        }
    }
    handleDelete = (movie) => {
        this.props.deleteMovie(movie,this.props.history);
    }
    handleLike = (movie) => {      
        this.props.toggleLike(movie,this.props.history);
    }    
    handleChange = ({ currentTarget: input }) => {
        this.setState({ title: input.value });
        if (this.state.genreName && this.state.genreName === 'All Genres') this.state.genreName = '';
        this.props.getMoviesCount(this.state.genreName, input.value, this.props.history);
        this.props.getAllMovies(this.state.pageSize, this.state.currentPage, this.state.genreName,
            input.value,this.state.sortColumn.path,this.state.sortColumn.order, this.props.history);
    }
    handlePageChange = page => {
        this.setState({ currentPage: page });        
        if (this.state.genreName && this.state.genreName === 'All Genres') this.state.genreName = '';        
        this.props.getAllMovies(this.state.pageSize, page, this.state.genreName, this.state.title,
        this.state.sortColumn.path,this.state.sortColumn.order,this.props.history);
    }
    handleGenreSelection = genreName => {
        this.setState({ genreName });
        if (genreName && genreName === 'All Genres') genreName = '';
        this.props.getMoviesCount(genreName,this.state.title,this.props.history);
        this.props.getAllMovies(this.state.pageSize, this.state.currentPage, genreName, this.state.title,
            this.state.sortColumn.path,this.state.sortColumn.order,this.props.history);
    }
    handleSort = sortColumn => {
        console.log(sortColumn);
        this.setState({ sortColumn });
        this.props.getAllMovies(this.state.pageSize, this.state.currentPage, this.state.genreName,
            this.state.title,sortColumn.path,sortColumn.order, this.props.history);
    }
    componentDidMount() {
        this.props.getMoviesCount(this.state.genreName,this.state.title,this.props.history);
        if (this.state.genreName && this.state.genreName === 'All Genres') this.state.genreName = '';
        this.props.getAllMovies(this.state.pageSize, this.state.currentPage, this.state.genreName,
            this.state.title,this.state.sortColumn.path,this.state.sortColumn.order, this.props.history);
        this.props.getAllGenres(this.props.history);
    }
    render() {   
        const { currentPage, pageSize, totalMovies } = this.state;
        return <div className="row">
            <div className="col-3">
                <Link to="/movies/new" className="btn btn-sm btn-primary" style={{ marginTop: 20, marginBottom: 20 }}>Add Movie</Link>
                <input type="text" onChange={this.handleChange} style={{marginBottom:20}}></input>
                <ListGroup itemList={[{ _id: "", name: "All Genres" }, ...this.props.genres]}
                    onItemSelection={this.handleGenreSelection}
                    selectedItem={this.state.genreName}/>
            </div>
            <div className="col">
                {this.props.movies.length === 0 ? <p style={{marginTop:20,marginBottom:20}}>There are no movies in the database</p>
                    : (
                        <React.Fragment >
                            <p style={{marginTop:20,marginBottom:20}}>Showing {this.props.movies.length} movies from the database.</p>
                            <MovieTable movies={this.props.movies} onLike={this.handleLike}
                                onDelete={this.handleDelete}
                                sortColumn={this.state.sortColumn}
                                onSort={this.handleSort}/>
                            <Pagination currentPage={currentPage}
                                pageSize={pageSize}
                                itemsCount={this.props.totalMovies}
                                onPageChange ={this.handlePageChange}
                            />
                        </React.Fragment>
                    )}
            </div>
        </div>
        
    }
}
const mapStateToProps = state => ({
    movies: state.movieReducer.movies,
    totalMovies: state.movieReducer.totalMovies,
    genres:state.genreReducer.genres
})
const mapDispatchToProps = dispatch => ({
    getAllMovies: (pageSize, currentPage,genreName,title,path,order,history) => dispatch(getAllMovies(pageSize, currentPage, genreName,title,path,order,history)),
    getAllGenres:(history)=>dispatch(getAllGenres(history)),
    getMoviesCount: (genreName,history) => dispatch(getMoviesCount(genreName,history)),
    deleteMovie: (movie,history) => dispatch(deleteMovie(movie,history)),
    toggleLike: (movie,history) => dispatch(toggleLike(movie,history)),
    searchMovie: input => dispatch(searchMovie(input))    
})
export default connect(mapStateToProps,mapDispatchToProps)(Movies);