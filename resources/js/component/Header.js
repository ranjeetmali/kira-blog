import React, {Component} from "react";
import {Link, NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {authFailed} from "../action/AuthAction";
import {requestGetUser, requestUserLogout} from "../api/api";
import {toast} from "react-toastify";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: ""
        };
    }

    componentDidMount() {

        requestGetUser().then(response => {
            let user = response.data;
            this.setState({
                name: user.name,
                email: user.email
            });
        }).catch(error => {
            console.log("HD");
            console.log(error);
        });
    }

    Logout = () => {
        requestUserLogout().then((response) => {
            this.props.logout();
            toast.info("Successfully logout");
            this.props.history.push("/");
        }).catch((error) => {
            console.log(error);
        });
    };

    render() {

        return <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to='/'><strong>K<span className='text-warning'>!</span>ra</strong></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                        aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"> </span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink activeClassName='active' className="nav-link" to='/' exact>
                                Home
                                <span className="sr-only">(current)</span>
                            </NavLink>
                        </li>
                        {this.props.isAuthenticated &&
                        <React.Fragment>
                            <li className="nav-item">
                                <NavLink activeClassName='active' className="nav-link"
                                         to='/dashboard'>Dashboard</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink activeClassName='active' className="nav-link"
                                         to='/category'>Categories</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink activeClassName='active' className="nav-link" to='/blog'>Blogs</NavLink>
                            </li>
                        </React.Fragment>
                        }
                        <li className="nav-item">
                            <NavLink activeClassName='active' className="nav-link" to='/about'>About</NavLink>
                        </li>
                    </ul>
                    <div className="collapse navbar-collapse" id="navbarResponsive">

                        <ul className="navbar-nav ml-auto">
                            {!this.props.isAuthenticated ?
                                <React.Fragment>
                                    <li className="nav-item">
                                        <NavLink activeClassName='active' className="nav-link"
                                                 to='/login'>Login</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink activeClassName='active' className="nav-link"
                                                 to='/register'>Register</NavLink>
                                    </li>
                                </React.Fragment>
                                :
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to="#" id="navbardrop"
                                          data-toggle="dropdown">
                                        {this.state.name}
                                    </Link>
                                    <div className="dropdown-menu">
                                        <Link className="dropdown-item" to='/profile'>Profile</Link>
                                        <button className="dropdown-item" onClick={this.Logout}>Logout
                                        </button>
                                    </div>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.AuthReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            localStorage.removeItem('token');
            dispatch(authFailed())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
