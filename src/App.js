import React,{Component} from 'react';
import './App.css';
import Movies from './components/movies';
import Customers from './components/customers';
import NavBar from './components/navbar';
import Rentals from './components/rentals';
import { Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './components/notFound';
import MovieForm from './components/movieForm';
import GenreForm from './components/genreForm';
import CustomerForm from './components/customerForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import RentalForm from './components/rentalForm';
import Genres from './components/genres';
import Error from './components/common/error';
import { loadLogin, logoutUser } from './actions/login';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';


class App extends Component {
  state = {}
 
  componentWillMount() {
    this.props.loadLogin();
  }
  handleLogout = () => {
    this.props.logoutUser();
    this.props.history.push('/login');
  }
  render() { 
    return ( <React.Fragment>
      <NavBar />
      <div className="row">
        <div className="col">
          <main className="container">
          <Switch>
            <Route path="/movies/:id" component={MovieForm}/>
            <Route path="/movies" component={Movies} />
            <Route path="/customers/:id" component={CustomerForm}/>
            <Route path="/customers" component={Customers} />
            <Route path="/rentals/:id" component={RentalForm}/>
            <Route path="/rentals" component={Rentals} />
            <Route path="/genres/:id" component={GenreForm}/>
            <Route path="/genres" component={Genres}/>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/error" component={Error}/>
            <Route path="/not-found" component={NotFound}/>
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found"/>
          </Switch> 
        </main>
        </div>
        <div className="col-1">
          <button className={this.props.token ? "btn btn-sm btn-secondary" : "hidden"} onClick={this.handleLogout} style={{marginTop:20}}>Logout</button>
        </div>
      </div>
      
    </React.Fragment> );
  }
}

const mapStateToProps = state => ({
  token:state.loginReducer.token
})

const mapDispatchToProps = dispatch => ({
  loadLogin: () => dispatch(loadLogin()),
  logoutUser:()=>dispatch(logoutUser())
})
export default compose(withRouter,connect(mapStateToProps,mapDispatchToProps))(App);