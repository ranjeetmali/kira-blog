import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min'
import 'bootstrap/dist/js/bootstrap.min';
import '../style/mystyle.css'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import About from "./About";
import CategoryList from "./category/List";
import CategoryCreate from "./category/Create";
import CategoryEdit from "./category/Edit";
import PostList from "./post/List";
import PostShow from "./post/Show";
import PostCreate from "./post/Create";
import PostEdit from "./post/Edit";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Register from "./Register";
import PrivateRoute from "./util/PrivateRoute";
import {authSuccess} from "../action/AuthAction";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import Profile from "./Profile";
import PostView from "./PostView";
import ReactDOM from 'react-dom';
import {createStore} from "redux";
import RootReducer from "../reducer/RootReducer";
import {Provider} from "react-redux";
import {requestGetUser} from "../api/api";
import NotFound from "./NotFound";
import {connect} from "react-redux";

const store = createStore(RootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

if (localStorage.getItem('token') != null) {
    store.dispatch(authSuccess(true));
    requestGetUser().then(response => {
        store.dispatch(authSuccess(response.data));
    }).catch(error => {
        console.log(error);
    });
}

class Root extends Component {
    render() {
        return (
            <BrowserRouter basename={base_url}>
                <div>
                    <ToastContainer/>
                    <Header/>
                    <Route exact path='/' render={() => <header className="bg-primary py-5 mb-5">
                        <div className="container h-100">
                            <div className="row h-100 align-items-center text-center">
                                <div className="col-lg-12">
                                    <h1 className="display-4 text-white mt-5 mb-2">Welcome To <strong>K<span
                                        className='text-warning'>!</span>ra</strong> Blogs</h1>
                                    <p className="lead mb-5 text-white-50">Can you <strong
                                        className='text-warning'>think ?</strong> Join us for more think.</p>
                                </div>
                            </div>
                        </div>
                    </header>}/>

                    <div className='container-fluid'>
                        <Switch>
                            <Route exact path='/' component={Home}/>

                            <Route exact path='/post/:postId/public' component={PostView}/>

                            <PrivateRoute exact path='/dashboard' component={Dashboard}
                                          isAuthenticated={this.props.isAuthenticated}/>

                            <PrivateRoute exact path='/profile' component={Profile}
                                          isAuthenticated={this.props.isAuthenticated}/>

                            <PrivateRoute exact path='/category' component={CategoryList}
                                          isAuthenticated={this.props.isAuthenticated}/>
                            <PrivateRoute exact path='/category/create' component={CategoryCreate}
                                          isAuthenticated={this.props.isAuthenticated}/>
                            <PrivateRoute exact path='/category/:categoryId/edit' component={CategoryEdit}
                                          isAuthenticated={this.props.isAuthenticated}/>

                            <PrivateRoute exact path='/blog' component={PostList}
                                          isAuthenticated={this.props.isAuthenticated}/>
                            <PrivateRoute exact path='/blog/create' component={PostCreate}
                                          isAuthenticated={this.props.isAuthenticated}/>
                            <PrivateRoute exact path='/blog/:postId/edit' component={PostEdit}
                                          isAuthenticated={this.props.isAuthenticated}/>
                            <PrivateRoute exact path='/blog/:postId' component={PostShow}
                                          isAuthenticated={this.props.isAuthenticated}/>

                            <Route exact path='/about' component={About}/>
                            <Route exact path='/login' component={Login}/>
                            <Route exact path='/register' component={Register}/>

                            <Route exact path='*' component={NotFound}/>
                        </Switch>
                    </div>

                    <footer className="footer bg-dark">
                        <div className="container">
                            <p className="m-0 text-center text-white">Copyright &copy; <strong>K<span
                                className='text-warning'>!</span>ra</strong> Blogs 2019</p>
                        </div>
                    </footer>
                </div>
            </BrowserRouter>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.isAuthenticated,
    };
}

const MainComp = connect(mapStateToProps, null)(Root);
export default MainComp;

if (document.getElementById('index')) {
    ReactDOM.render(<Provider store={store}><MainComp/></Provider>, document.getElementById('index'));
}
