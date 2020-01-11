import React, {Component} from 'react';
import {requestGetUser, requestLogin} from "../api/api";
import {connect} from "react-redux";
import {authSuccess} from "../action/AuthAction";
import {toast} from "react-toastify";

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            inputErrors: {
                emailError: "",
                passwordError: ""
            }
        };
    }

    componentDidMount() {
        requestGetUser().then((response) => {
            this.props.history.push("/dashboard");
        }).catch((error) => {
            let authError = error.response;
            console.log(authError);
        });
    }

    InputHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    SubmitHandler = (event) => {
        event.preventDefault();
        requestLogin({
            "email": this.state.email,
            "password": this.state.password,
        }).then((response) => {
            localStorage.setItem("token", response.data.token);
            this.setState({
                email: "",
                password: "",
                inputErrors: {
                    emailError: "",
                    passwordError: ""
                }
            });
            this.props.authSuccess();
            toast.success("Successfully login");
            this.props.history.push("/dashboard");
        }).catch((error) => {
            let errors = error.response.data.error;
            this.setState({
                inputErrors: {
                    emailError: errors.email,
                    passwordError: errors.password,
                }
            });

        });
    };

    render() {
        return (<div className='row mt-4'>
            <div className='col-12'>
                <div className="card w-50 m-auto">
                    <div className="card-header">
                        <h4 className='card-title'>
                            Login
                        </h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.SubmitHandler}>
                            <div className='row'>
                                <div className='col-12'>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" className="form-control"
                                               placeholder="Enter email" value={this.state.email}
                                               name="email" onChange={this.InputHandler}/>
                                        <small
                                            className='text-danger'>{this.state.inputErrors.emailError}</small>
                                    </div>
                                </div>
                                <div className='col-12'>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" className="form-control"
                                               placeholder="Enter password" value={this.state.password}
                                               name="password" onChange={this.InputHandler}/>
                                        <small
                                            className='text-danger'>{this.state.inputErrors.passwordError}</small>
                                    </div>
                                </div>
                                <div className='col-12'>
                                    <button type="submit" className="btn btn-primary btn-block">Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authSuccess: () => {
            dispatch(authSuccess());
        }
    }
};

export default connect(null, mapDispatchToProps)(Login);